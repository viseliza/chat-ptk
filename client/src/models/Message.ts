import type { Room } from "./Room";
import { IMessage } from "../lib/types";

/** Модель сообщения
* @param {number} param.id
* @param {number} param.user_id
* @param {string} params.text
* @param {string} param.time
* @param {boolean} param.isRead
* @param {number} param.room_id
* @param {Room} param.room
*/
export class Message implements IMessage {
    id: number;
    user_id: number;
    text: string;
    time: string;
    isRead: boolean;
    room_id: number;
    room?: Room;

    constructor(opts: IMessage) {
        this.id = opts.id;
        this.user_id = opts.user_id;
        this.text = opts.text;
        this.time = opts.time;
        this.isRead = opts.isRead;
        this.room_id = opts.room_id;
        this.room = opts.room;
    }
}