import { Room } from "./room.entity";

export class Message {
    user_id: string;
    text: string;
    time: string;
    is_read: boolean;
    room: Room;
    room_id: number;
}