import { AppAPI } from "../../api/api";
import { IChatPreview, IMessage, IMessanger, IProfile } from "../types";
import { Profile } from "../../models/Profile";

export class Messanger implements IMessanger {
    public profile: IProfile;
    private api = new AppAPI('');

    /**
     * Constructor
     * @param profile Профиль текущего пользователя
     */
    constructor (profile: IProfile) {
        this.profile = new Profile(profile);
    }

    /**
     * Получение всех чатов и их последних сообщений в отфоматированном виде
     * @returns Массив чатов
     */
    public async getChats(): Promise<IChatPreview[]> {
        const response = await this.api.getRoomsInfo(this.profile.user_id); 
        
        let chats: Array<IChatPreview> = response.room;
        
        for (let i = 0; i < chats.length; i++) {
            chats[i].messages = await this.conversionMessage(chats[i].messages[0])
        }

        return chats;
    }

    /**
     * Форматирование последнего сообщения
     * @param lastMessage последнее сообщение
     * @returns форматированное сообщение
     */
    public async conversionMessage(lastMessage: IMessage): Promise<IMessage[]> {
        if (lastMessage) {
            if (lastMessage.text.length > 50)
                lastMessage.text = lastMessage.text.slice(0, 50) + "...";
            
            lastMessage.time = this.conversionTime(new Date(lastMessage.time));
        }   
        // const response = await this.api.getProfile(lastMessage.user_id);
        // TODO: сделать вывод отправителя по user_id

        return [lastMessage];
    }

    /**
     * Форматироване даты и времени последнего сообщения
     * @param date Дата отправки сообщения
     * @returns Форматированная дата
     */
    private conversionTime(date: Date): string {
        let today = new Date();
        if ( date.toLocaleDateString() == today.toLocaleDateString() )
            return date.toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric"});
        else if ( date.getFullYear() == today.getFullYear() &&
                    date.getMonth() == today.getMonth() && date.getDate() + 1 == today.getDate() ) 
            return "вчера"
        else 
            return date.toLocaleDateString();
        
    }
}