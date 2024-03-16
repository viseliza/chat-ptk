import { Profile } from "../../models/Profile";

export interface IUser {
    id: number;
    login: string;
    password: string;
    profile: Profile;
}