import { io } from "socket.io-client";
import type { IMessage, IRoom, ISocketChat } from "../types";

/**
 * `Functional client socket`
 */
export class SocketChat implements ISocketChat {
    public socket;
    private room: IRoom;
  
    /**
     * Socket inizialization
     * @param id Host name for `Socket.io`
     * @param room Chat room
     */
    constructor(id: string, room: IRoom) {
        this.socket = io(id);
        this.room = room;

        this.socket.emit("takeMessages", { room_id: this.room.id, row: 0 });
    }

    /**
     * Sends a message via `Socket.io`
     * @param {IMessage} message 
     */
    public sendMessage(message: IMessage): void {
        this.socket.emit("createMessage", {
            user_id: message.user_id,
            text: message.text.trim(),
            time: new Date(),
            room: this.room,
            room_id: this.room.id
        });
    }

    /**
     * Returns a new messages array with an additional 100 messages
     * @param {number} row  current number of messages
     * @returns An array with the next 100 messages
     */
    public getNextMessages(row: number = 0) {
        this.socket.emit("takeMessages", { room_id: this.room.id, row });
    }

    /**
     * Joins a user to a room
     * @param {number}  user_id id of user
     * @param {boolean} joined current join status
     * @returns join status
     */
    public join(user_id: number, joined: boolean): boolean {
        this.socket.emit("join", { name: user_id }, () => {
            joined = true;
            this.socket.emit("joinRoom", this.room.name);
        });
        return joined;
    }

    /**
     * Disconect socket client
     */
    public disconect() {
        this.socket.emit("disconect");
    }
};