import { io } from "socket.io-client";
import type { IMessage, IRoom, ISocketService } from "../types";

/**
 * `Functional client socket`
 */
export default class SocketService implements ISocketService {
    public socket;
    public room: IRoom;
    private typing: boolean = false;
    private timeout: undefined | ReturnType<typeof setTimeout> = undefined;
  
    /**
     * Socket inizialization
     * @param id Host name for `Socket.io`
     * @param room Chat room
     */
    constructor(id: string, room: IRoom) {
        this.socket = io(id);
        this.room = room;
    }

    /**
     * Sends a message via `Socket.io`
     * @param {IMessage} message 
     */
    public emitMessage(message: IMessage): void {
        this.socket.emit("createMessage", {
            user_id: message.user_id,
            text: message.text.trim(),
            time: new Date(),
            room: this.room,
            room_id: this.room.id,
            is_read: message.is_read
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
    public join(first_name: string | undefined, joined: boolean = false): boolean {
        this.socket.emit("join", { name: first_name }, () => {
            joined = true;
            this.socket.emit("joinRoom", this.room);
        });
        return joined;
    }

    /**
     * Disconect socket client
     */
    public disconect() {
        this.socket.emit("disconect");
    }

    private timeoutStopTyping() {
        this.typing = false;
        this.socket.emit('typing', { isTyping: false });
    }   

    public emitTyping() {
        if (!this.typing) {
            this.typing = true;
            this.socket.emit('typing', { isTyping: true });
            this.timeout = setTimeout(() => this.timeoutStopTyping(), 2000);
        } else {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.timeoutStopTyping(), 2000);
        }
    }

    public changeReactions(reaction: Object, message_id: number) {
        this.socket.emit('addReaction', { reaction, message_id })
    } 
};