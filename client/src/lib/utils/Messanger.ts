import { AppAPI } from "../../api/api";
import type { IChatPreview, IMessage, IMessanger } from "../types";

export default class Messanger implements IMessanger {
    public user_id: number;
    public selectedMessages = [];
    private chats: IChatPreview[] = [];
    private api = new AppAPI('');

    /**
     * Constructor
     * @param user_id ПUser_id профиля текущего пользователя
     */
    constructor (user_id: number) {
        this.user_id = user_id;
    }

    /**
     * Получение всех чатов и их последних сообщений в отфоматированном виде
     * @param login novsu login of user
     * @returns Массив чатов
     */
    public async getChats(login: string): Promise<IChatPreview[]> {
        const response = await this.api.getRoomsInfo(this.user_id); 
        
        this.chats = response.room;

        for (let i = 0; i < this.chats.length; i++) {
            const chat_name = this.chats[i].name.split('_');
            
            if (chat_name.length > 1) {
                if (chat_name[0] == chat_name[1]) {
                    this.chats[i].id = "@" + chat_name[0];
                    this.chats[i].name = "Избранное";
                } else {
                    this.chats[i].id = chat_name[0] == login ? `@${chat_name[1]}` : `@${chat_name[0]}`;
                    
                    this.chats[i].name = this.chats[i].profiles[0].user!.login == login 
                        ? `${this.chats[i].profiles[1].first_name} ${this.chats[i].profiles[1].last_name}` 
                        : `${this.chats[i].profiles[0].first_name} ${this.chats[i].profiles[0].last_name}`;
                }
            } else {
                this.chats[i].id = this.chats[i].name;
            }
            this.chats[i].messages = await this.conversionMessage(this.chats[i].messages[0])
        }

        return this.chats;
    }

    /**
     * Форматирование последнего сообщения
     * @param lastMessage последнее сообщение
     * @returns форматированное сообщение
     */
    public async conversionMessage(lastMessage: IMessage): Promise<IMessage[]> {
        if (lastMessage) {
            if (lastMessage.text.length > 37)
                lastMessage.text = lastMessage.text.slice(0, 35) + "...";
            
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


    public selectMessage() {
        
    }
}