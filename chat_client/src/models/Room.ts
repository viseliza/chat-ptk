import type { Message } from "./Message";
import type { Profile } from "./Profile";
import { IRoom } from "../lib/types";

/** Модель комнаты (чата)
 * @param {number} param.id
 * @param {string} param.name
 * @param {Message[]} param.messages
 * @param {Profile[]} param.profiles
 */
export class Room implements IRoom {
    id:   number;
    name: string;
    messages?: Message[];
    profiles?: Profile[];

    constructor(opts: IRoom){
        this.id =   opts.id;
        this.name = opts.name;
        this.messages = opts.messages;
        this.profiles = opts.profiles;
    }
}