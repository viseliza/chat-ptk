import { io } from "socket.io-client";
import type { IMessage, IRoom } from "../types";

export class DataTransfer {
    public socket;
    private room: IRoom;

    constructor (id: string, room: IRoom) {
        this.socket = io(id);
        this.room = room;
    }

    public sendMessage(message: IMessage): void {
        if (message.text.trim()) {
            this.socket.emit("createMessage", {
                    user_id: message.user_id,
                    text: message.text.trim(),
                    time: new Date(),
                    room: this.room.name,
                    room_id: message.room_id,
                }, () => {
                    message.text = "";
                }
            );
        }
    }

    public getMessages(row: number, messages: Array<IMessage>): Array<IMessage> {
        row += 100;
        this.socket.emit("takeMessages", { room_id: this.room.id, row }, (response: any) => {
            response.length ? messages = [...messages, response] : row -= 100;
        });

        return messages;
    }

    public join(user_id: number, joined: boolean) {
        this.socket.emit("join", { name: user_id }, () => {
            joined = true;
            this.socket.emit("joinRoom", this.room.name);
        });
        return joined;
    }
}