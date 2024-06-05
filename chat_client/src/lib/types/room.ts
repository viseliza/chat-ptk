import { Message } from "../../models/Message";
import { Profile } from "../../models/Profile";

export interface IRoom {
    id:   number;
    name: string;
    messages?: Message[];
    profiles?: Profile[];
}