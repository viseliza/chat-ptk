import { error } from "@sveltejs/kit";
import { AppAPI } from "../../../api/api";
import { IChatPropertys } from "../../../lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
    const api = new AppAPI('');
    let roomUsers = [];
    let room = params.slug;
    
    if (room[0] == '@') {
        roomUsers.push(room.slice(1, room.length));
        roomUsers.push(locals.session.login);
        roomUsers.sort();
        room = `${roomUsers[0]}_${roomUsers[1]}`
    }
  
    const chatPropertys: IChatPropertys[] = await api.getRoomInfo(room);
    if (!chatPropertys[0]) {
        throw error(404, 'Пользователь не найден!');
    }

    return {
        session: locals.session,
        chatPropertys
    };
}
