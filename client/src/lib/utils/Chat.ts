import { IMessage, IProfile, IRoom, IChat } from "../types";
import { Socket } from "./DataTransfer";

export class Chat {
    public count_of_profiles: number;
    public profiles: IProfile[];
    public room: IRoom;
    private messages: Array<IMessage> = [];
    private socket;

    constructor(chat: IChat) {
        this.count_of_profiles = chat._count.profiles;
        this.room = { id: chat.id, name: chat.name };
        this.profiles = chat.profiles;
        this.socket = new Socket("http://localhost:18001", this.room);
    }
}