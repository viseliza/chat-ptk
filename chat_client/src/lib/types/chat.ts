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
    sendMessage: (message: IMessage) => void;
    editMessage: () => void;
    deleteMessage: () => void;
    sendFile: () => void;
    getRoomInfo: () => void;
    getChatName: () => void;
    changeChatLogo: () => void;
    // scrollDown: (node: Element) => void;
    searchMessage: () => void;
    searchPerson: (where: string) => Profile[];
}

export interface ISocketService {
    emitMessage: (message: IMessage) => void;
    getNextMessages: (row: number, messages: IMessage[]) => void;
    join: (first_name: string, joined: boolean) => boolean;
}