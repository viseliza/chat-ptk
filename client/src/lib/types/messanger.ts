import { Message } from "../../models/Message";

export interface IChatPreview {
    name: string;
    messages: Message[];
}

export interface IMessanger {
    getChats: () => Promise<IChatPreview[]>;
    conversionMessage: (chat: Message) => Promise<Message[]>;
}