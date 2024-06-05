import type { Profile } from "../../models/Profile";
import { IMessage } from "./message";

export interface IChatPreview {
    id: string;
    name: string;
    messages: IMessage[];
    profiles: Profile[];
}

export interface IMessanger {
    getChats: (login: string) => Promise<IChatPreview[]>;
    conversionMessage: (chat: IMessage) => Promise<IMessage[]>;
}