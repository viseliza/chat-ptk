import { Profile, type IProfile } from "../models/Profile";
import { Replacement } from "./replacement";
import { Schedule } from "./schedule";

interface IHomePage {
}

export class HomePage implements IHomePage {
    public readonly replacement = new Replacement('29.02.2024');
    public readonly schedule = new Schedule("1992");
    public profile: IProfile;

    constructor(profile: IProfile) {
        this.profile = new Profile(profile);
        
        // TODO: Если роль TEACHER, сделать вывод всех расписаний групп
    }
}