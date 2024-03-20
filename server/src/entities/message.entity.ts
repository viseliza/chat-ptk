import { Room } from "./room.entity";

export class Message {
    user_id: string;
    text: string;
    time: string;
    room: Room;
    room_id: number;
}