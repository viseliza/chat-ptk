import { IGroup } from "../lib/types";

/** Модель группы
 * @param {number} param.id
 * @param {string} param.name
 * @param {string} params.href
 */
export class Group implements IGroup {
    id:   number;
    name: string;
    href: string;

    constructor(opts: IGroup){
        this.id   = opts.id;
        this.name = opts.name;
        this.href = opts.href;
    }
}