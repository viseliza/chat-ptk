import { Profile } from "../../models/Profile";

export interface _count {
    profiles: number
}

export interface IChat {
    id: number;
    name: string;
    profiles: Profile[];
    _count: _count;
}