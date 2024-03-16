import { AppAPI } from "../../../api/api";
import { Chat } from "../../../lib/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const api = new AppAPI('');
    const room = params.slug;
    const profiles = await api.getRoomInfo(room);
    const chat = new Chat(profiles[0]);
   
    return {
        profiles, 
        room: await api.getRoom(room)
    };
}
