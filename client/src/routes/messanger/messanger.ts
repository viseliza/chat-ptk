import { AppAPI } from "../../api/api";
import { Profile, type IProfile } from "../../models/Profile";


interface IMessanger {
    getChats: () => void;
    getLastMessages: () => void;
    getRoomInfo: () => void;
}

// export class Messanger implements IMessanger {
export class Messanger {
    public profile: IProfile;
    public api = new AppAPI('');

    constructor (profile: IProfile) {
        this.profile = new Profile(profile);
    }


    public async getLastMessage() {
        const response = await this.api.getLastMessage(this.profile.user_id); 

        const messages = response.room.messages;
        console.log(messages)
    }
}