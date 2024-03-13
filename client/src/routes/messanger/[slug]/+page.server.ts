import { AppAPI } from "../../../api/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const api = new AppAPI('');
    const room = params.slug;
    const profiles = await api.getRoomInfo(room);
    return {
        profiles, 
        room: await api.getRoom(room)
    };
}
