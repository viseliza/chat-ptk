import type { Profile } from "../../models/Profile";
import type { IMessage, IProfile, IRoom, IChatPropertys, IChat } from "../types";
import SocketService from "../utils/SocketService";

export default class Chat extends SocketService implements IChat {
    public count_of_profiles: number;
    public profiles: IProfile[];
    public room: IRoom;
    public messages: Array<IMessage> = [];

    /**
     * Chat inizialization
     * @param {IChatPropertys} chat 
     */
    constructor(chat: IChatPropertys) {
        super("https://viseliza.site", { id: chat.id, name: chat.name })
        this.count_of_profiles = chat._count.profiles;
        this.room = { id: chat.id, name: chat.name };
        this.profiles = chat.profiles;
    }

    /**
     * Sending a message via io socket
     * @param message Message send by the user
     */
    public sendMessage(message: IMessage) {
        if (message.text.trim()) {
            if (message.text.length > 1024) {
                let start_position = 0;
                let end_postion = 0;
                let text = message.text;
                for (let i = 0; i < Math.ceil(text.length / 1024); i++) {
                    end_postion += text.length - start_position - 1024 > 0 ? 1024 : text.length - start_position;
                    message.text = text.slice(start_position, end_postion);
                    start_position += 1024;
                    this.emitMessage(message);
                }
            } else 
                this.emitMessage(message);
        }
    }

    public editMessage() {}

    public deleteMessage() {}

    public sendFile() {}

    public getRoomInfo() {}

    public getChatName() {}

    public changeChatLogo() {}

    public static scrollDown(node: Element, y = node.scrollHeight) {
        node.scroll({ top: y, behavior: 'smooth' })
    }

    /**
     * 
     * @param time current message date
     * @param previos_time pervios date
     * @returns 
     */
    public isLessThan5Minute(time: string, previos_time: string) {
        const previos_date_time = new Date(previos_time);
        const date_time = new Date(time);
        previos_date_time.setMinutes(previos_date_time.getMinutes() + 5);
        return date_time.getTime() < previos_date_time.getTime();
    }

    public isNextDate(firstDateString: string, secondDateString: string) {
        const fDate = new Date(firstDateString);
        const sDate = new Date(secondDateString);
        return `${fDate.toLocaleDateString()}` != `${sDate.toLocaleDateString()}`; 
    }

    public searchMessage() {}

    /**
     *  Search profiles by mathcing the filter
     * @param where filter
     * @returns profiles mathcing the filter
     */
    public searchPerson(where: string): Profile[] {
        let whereSplit = where.split(" ");
        let count = 0;
        let result: IProfile[] = [];
        this.profiles.forEach((profile: IProfile) => {
            for (const [key, value] of Object.entries(profile)) {
                if (typeof value === 'object' && value.login.includes(where)) {
                    result = [...result, profile];
                    return 0;
                } else if (typeof value === 'string') {
                    if (whereSplit.length > 1) {
                        for (let i = 0; i < whereSplit.length; i++) {
                            if (value.includes(whereSplit[i])) {
                                count += 1;
                                if (count == whereSplit.length) {
                                    result = [...result, profile]
                                }
                            }
                        }
                    }
                    if (value.includes(where)) {
                        result = [...result, profile];
                        return 0;
                    }
                }
              }
        });
        return result;
    }

    public readingMessages(lastReadMessage: number, user_id: number, scroll: Element): number {
        const messages = document.getElementsByClassName('message');
        let count = 0;
        for (let i = 0; i < messages.length; i++) {
            if (!this.messages[i].is_read) {
                const rect = messages[i].getBoundingClientRect();
                
                if (this.messages[i].user_id != user_id && !this.messages[i].is_read) {
                    count += 1;
                    if (!lastReadMessage) 
                        return rect['y'] - 80;
                    
                } else if (this.messages[i].user_id == user_id && this.messages[i].is_read) {
                    // (messages[i] as HTMLElement).style.backgroundColor = "rgb(50, 50, 255, 0)";
                }
                if (rect['y'] < (scroll.clientHeight + rect['height']) && this.messages[i].user_id != user_id && !this.messages[i].is_read) {
                    this.messages[i].is_read = true;
                    (messages[i] as HTMLElement).style.backgroundColor = "transparent";
                    this.socket.emit('readMessage', { message: this.messages[i]} );
                }
                
            }
        }
        if (!lastReadMessage)
            return scroll.scrollHeight;
        return count;
    }

    /**
     * Добавление эмоции в текст сообщения
     * @param text текст сообщения
     * @param index индекс каретки
     * @param event выбранная эмоция
     */
    public addEmojieToMessage(text: string, index: number, event: { detail: { emojie: number } }): string {
        if (!text || !text.length) {
            text = String.fromCodePoint(event.detail.emojie);
        } else {
            if (index == text.length)
                text += String.fromCodePoint(event.detail.emojie);
            else {
                let textArray = Array.from(text);
                textArray.splice(index, 1, `${text[index]}${String.fromCodePoint(event.detail.emojie)}`)
                text = textArray.join('');
            }
        }
        return text;
    }
}