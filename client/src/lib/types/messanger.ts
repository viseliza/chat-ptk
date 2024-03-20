import { IMessage } from "./message";

export interface IChatPreview {
    name: string;
    messages: IMessage[];
}

export interface IMessanger {
    getChats: () => Promise<IChatPreview[]>;
    conversionMessage: (chat: IMessage) => Promise<IMessage[]>;
}