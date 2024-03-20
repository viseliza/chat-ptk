import { ceil } from "mathjs";
import { IMessage, IProfile, IRoom, IChatPropertys, IChat } from "../types";
import { SocketChat } from "../utils";

export class Chat implements IChat {
    public count_of_profiles: number;
    public profiles: IProfile[];
    public room: IRoom;
    public socket;
    private messages: Array<IMessage> = [];

    /**
     * Chat inizialization
     * @param {IChatPropertys} chat 
     */
    constructor(chat: IChatPropertys) 
                                        {
        this.count_of_profiles = chat._count.profiles;
        this.room = { id: chat.id, name: chat.name };
        this.profiles = chat.profiles;
        this.socket = new SocketChat("http://localhost:18001", this.room);
    }

    /**
     * Sending a message via io socket
     * @param message Message send by the user
     */
    public sendMessage(message: IMessage) {
        if (message.text.trim()) {
            if (message.text.length > 1024) {
                let start_position = 0;
                let end_postion = 0;
                let text = message.text;
                for (let i = 0; i < ceil(text.length / 1024); i++) {
                    end_postion += text.length - start_position - 1024 > 0 ? 1024 : text.length - start_position;
                    message.text = text.slice(start_position, end_postion);
                    start_position += 1024;
                    this.socket.sendMessage(message);
                }
            } else 
                this.socket.sendMessage(message);
        }
    }

    public editMessage() {}

    public deleteMessage() {}

    public sendFile() {}

    public getRoomInfo() {}

    public getChatName() {}

    public changeChatLogo() {}

    public scrollDown(node: Element) {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' })
    }

    public searchMessage() {}

    public searchPerson() {}
}