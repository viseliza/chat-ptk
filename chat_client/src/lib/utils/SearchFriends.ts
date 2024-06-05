import type { IProfile } from "../types";

export default class SearchFriends {
    private profiles: IProfile[];

    constructor(profiles: IProfile[]) {
        this.profiles = profiles;
    }

    public getProfilesInGroup(group: string): IProfile[] {
        return this.profiles.filter((profile) => profile.group!.name == group)
    }

    public getAllProfiles(): IProfile[] {
        return this.profiles;
    }
}
