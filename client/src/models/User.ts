import type { Profile } from "./Profile";
import { IUser } from "../lib/types/user";

/** Модель пользователя NovSU
 * @param {number} param.id
 * @param {string} param.login
 * @param {string} params.password
 * @param {Profile} params.profile
 */
export class User implements IUser{
    id?: number;
    login: string;
    password: string;
    profile?: Profile;

    constructor(opts: IUser){
        this.id = opts?.id;
        this.login = opts.login;
        this.password = opts.password;
        this.profile = opts?.profile;
    }
}