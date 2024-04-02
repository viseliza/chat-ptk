import { Group } from "../../models/Group";
import { Room } from "../../models/Room";
import { User } from "../../models/User";

enum Role {
    STUDENT,
    TEACHER
}

enum Theme {
    white,
    black
}

export interface IProfile {
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    father_name?: string;
    theme: Theme;
    role: Role;
    user_id: number;
    group_id: number;
    user?: User;
    group?: Group;
    rooms?: Room[];
}