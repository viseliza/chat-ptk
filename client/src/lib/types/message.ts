import { Room } from "../../models/Room";

export interface IMessage {
    id?: number;
    user_id: number;
    text: string;
    time: string;
    is_read?: boolean;
    room_id?: number;
    room?: Room;
    reactions?: Object;
}