import { Profile } from "../../models/Profile";
import { IMessage } from "./message";

export interface IChatPropertys {
    id: number;
    name: string;
    profiles: Profile[];
    _count: {
        profiles: number
    };
}

export interface IChat {
    editMessage: () => void;
    deleteMessage: () => void;
    sendFile: () => void;
    getRoomInfo: () => void;
    getChatName: () => void;
    changeChatLogo: () => void;
    scrollDown: (node: Element) => void;
    searchMessage: () => void;
    searchPerson: () => void;
}

export interface ISocketChat {
    sendMessage: (message: IMessage) => void;
    getNextMessages: (row: number, messages: IMessage[]) => void;
    join: (user_id: number, joined: boolean) => boolean;
}