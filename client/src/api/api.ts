import { request } from 'undici';
import { AppError } from './errors.js';
import type { User } from '../models/User.js';
import { Group } from '../models/Group.js';
import type { Profile } from '../models/Profile.js';
import { Room } from '../models/Room.js';
import { Message } from '../models/Message.js';

export class AppAPI {
    static API = new URL('http://localhost:18001/');

    #token;
    #defaultParams;

    /**
     * 
     * @param {string} token 
     * @param {{}} defaultParams 
     */
    constructor(token: string, defaultParams = {}) {
        this.#token = token;
        this.#defaultParams = defaultParams ?? {};
    }

    async callApi(method: string, params = {}, call = "POST") {
        // const q = new URLSearchParams({
        //     token: this.#token,
        //     ...this.#defaultParams,
        //     ...params
        // });

        let response;
        let url;

        if (params.body) {
            url = `${AppAPI.API.origin}/${method}`;
            
            response =  await fetch(url, {
                method: call,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(params.body)
            });
        } else {
            url = `${AppAPI.API.origin}/${method}/${params.name}`;
            response = await fetch(url)
        }
        
        const json = await response.json();
        
        // if ('status' in json && json.status === 'ok') {
        if (json) {
            delete json.status;
            delete json.msg;
            delete json.code;
            // Возвращаем ответ
            return json;
        }

        // console.log({url, json});
        // проверяем на ошибки
        AppError.check(json);

        throw new AppError(json.msg, json.code);
    }

    /** Получить список магазинов
     * 
     * @returns {Promise<Shop[]>}
     */
    async getShops() {
        const { shops } = await this.callApi('list/shops');
        return shops.map((s) => new Shop(s));
    }


    /** Получить группу по названию
     * @param {string} group_name
     * @returns {Promise<Group>}
     */
    async getGroup(group_name: string) {
        return await this.callApi('group', { name: group_name });
    }

    /** Получить название группы по id
     * @param {string} group_name
     * @returns {Promise<Group>}
     */
    async getGroupByID(id: number) {
        return await this.callApi('groupName', { name: id });
    }

    /** Получение последнего сообщения из чата
     * @param {string} user_id
     * @returns {Promise<Message[]>}
     */
    async getLastMessage(user_id: number) {
        return await this.callApi('profile', { name: user_id });
    }

    /** Получить профиль по user_id
     * @param {number} user_id
     * @returns {Promise<Profile>}
     */
    async getProfile(user_id: number): Promise<Profile> {
        return await this.callApi('profiles', { name: user_id });
    }

    /** Получить профиль по login
     * @param {string} login
     * @returns {Promise<Profile>}
     */
    async getProfileByLogin(login: string) {
        return await this.callApi('profileByLogin', { name: login });
    }

    /** Получение комнаты по названию
     * @param {string} name
     * @returns {Promise<Room>}
     */
    async getRoom(name: string) {
        return this.callApi('room', { name })
    }

    /** Получение колличества пользователей в комнате
     * @param {string} name
     * @returns {number}
     */
    async getRoomInfo(name: string) {
        return await this.callApi('getRoomInfo', { name })
    }


    /** Проверка пользователя
     * @param {User} data
     * @param {string | undefined} first_name
     * @param {string | undefined} last_name
     * @param {string | undefined} father_name
     * @returns {User}
     */
    async checkUser(data: User, first_name?: string, last_name?: string, father_name?: string) {
        let user;
        try {
            user = await this.getProfileByLogin(data.login);
        } catch {
            user = await this.callApi("auth", { body: { login: data.login, password: data.password, first_name, last_name, father_name } });
        }
        return user;
    }

    /** Обновление профиля
     * @param {string} theme
     * @returns {Promise<Profile>} 
     */
    async patchProfile(theme: string) {
        return await this.callApi('profile', { body: { theme } }, "PATCH")
    }

    /** Получить список категорий
     * 
     * @param {number} shopId 
     * @param {number} [offset] 
     * @returns {Promise<Category[]>}
     */
    async getCategories(shopId, offset = 0) {
        const { categories } = await this.callApi('list/categories', {
            shop_id: shopId,
            offset,
        });
        return categories.map((c) => new Category(c));
    }

    /** Получить список позиций
     * 
     * @param {number} shopId 
     * @param {number} categoryId 
     * @param {number} offset 
     * @returns {Promise<Product[]>}
     */
    async getProducts(shopId, categoryId, offset = 0) {
        const { catalog } = await this.callApi('list/catalog', {
            shop_id: shopId,
            category_id: categoryId,
            offset,
        });
        return catalog.map((c => new Product(c)));

    }

    /** Загрузка товара
     *
     * @param {number} shopId
     * @param {number} productId
     * @param {'single' | 'multy'} mode
     * @param {string[]} body
     * @returns {Promise<{count: number, available: number}>}
     */
    async upload(shopId, productId, mode, body = []) {
        const { count, left: available } = await this.callApi('upload_goods', {
            shop_id: shopId,
            catalog_id: productId,
            mode,
            body: body.join('\n'),
        });

        return {
            count,
            available
        }
    }

    /** Скачать товар
      *
      * @param {number} shopId
      * @param {number} productId
      * @param {number=} offset
      * @returns {Promise<{count: number, items: string[]}>}
      */
    async download(shopId, productId, offset = 0) {
        const { count, goods: items } = await this.callApi('list/goods', {
            shop_id: shopId,
            catalog_id: productId,
            offset,
        });

        return {
            count,
            items
        }
    }

    /** Удаление товара с бота
     *
     * @param {number} shopId
     * @param {number} productId
     * @param {number} count
     * @returns {Promise<{count: number, items: string[]}>}
     */
    async unload(shopId, productId, count = 999999) {
        const { goods: items } = await this.callApi('unload', {
            shop_id: shopId,
            id: productId,
            count,
        });

        return {
            count: items.length ?? 0,
            items
        }
    }

    /** Скрыть категорию
   *
   * @param {number} shopId
   * @param {number} categoryId
   * @returns {Promise<{}>}
   */
    async hideCategory(shopId, categoryId) {
        return await this.callApi(`hide/category`, {
            shop_id: shopId,
            category_id: categoryId,
        });
    }

    /** Показать категорию
   *
   * @param {number} shopId
   * @param {number} categoryId
   * @returns {Promise<{}>}
   */
    async showCategory(shopId, categoryId) {
        return await this.callApi(`show/category`, {
            shop_id: shopId,
            category_id: categoryId,
        });
    }

    /** Скрыть товар
   *
   * @param {number} shopId
   * @param {number} productId
   * @returns {Promise<{}>}
   */
    async hideProduct(shopId, productId) {
        return await this.callApi(`hide/catalog`, {
            shop_id: shopId,
            catalog_id: productId,
        });
    }

    /** Показать товар
    *
    * @param {number} shopId
    * @param {number} productId
    * @returns {Promise<{}>}
    */
    async showProduct(shopId, productId) {
        return await this.callApi(`show/catalog`, {
            shop_id: shopId,
            catalog_id: productId,
        });
    }
}