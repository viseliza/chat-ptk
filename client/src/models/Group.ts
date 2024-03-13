import type { Profile } from "./Profile";

export interface IGroup {
    id:   number;
    name: string;
    href: string;
    profiles: Profile[];
}

/** Модель группы
 * @param {number} param.id
 * @param {string} param.name
 * @param {string} params.href
 * @param {Profile[]} params.profiles
 */
export class Group implements IGroup {
    id:   number;
    name: string;
    href: string;
    profiles: Profile[];

    constructor(opts: IGroup){
        this.id   = opts.id;
        this.name = opts.name;
        this.href = opts.href;
        this.profiles = opts.profiles;
    }
}