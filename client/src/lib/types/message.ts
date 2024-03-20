import { Room } from "../../models/Room";

export interface IMessage {
    id?: number;
    user_id: number;
    text: string;
    time: string;
    isRead: boolean;
    room_id: number;
    room?: Room;
}