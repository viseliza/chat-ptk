import type { Group } from "./Group";
import type { Room } from "./Room";
import { IProfile } from "../lib/types";

enum Theme {
    white,
    black
}

enum Role {
    STUDENT,
    TEACHER
}


/** Модель профиля
 * @param {number} param.id
 * @param {string | null} params.email
 * @param {string | null} param.first_name
 * @param {string | null} param.last_name
 * @param {string | null} param.father_name
 * @param {Theme} param.theme
 * @param {Role} param.role
 * @param {number} param.user_id
 * @param {number} param.group_id
 * @param {Group} param.group
 * @param {Room[]} param.rooms
 */
export class Profile implements IProfile {
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    father_name?: string;
    theme: Theme;
    role: Role;
    user_id: number;
    group_id: number;
    rooms: Room[];
    group: Group;

    constructor(opts: IProfile) {
        this.id = opts.id;
        this.email = opts.email;
        this.first_name = opts.first_name;
        this.last_name = opts.last_name;
        this.father_name = opts.father_name;
        this.theme = opts.theme;
        this.role = opts.role;
        this.user_id = opts.user_id;
        this.group_id = opts.group_id;
        this.rooms = opts.rooms;
        this.group = opts.group;
    }
}