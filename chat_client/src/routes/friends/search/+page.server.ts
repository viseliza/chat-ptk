import { AppAPI } from "../../../api/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const api = new AppAPI("");
    const profiles = await api.getAllProfiles();
    const groups = await api.getAllGroups();
    const friends = await api.getAllFriends(locals.session.user_id);

    return {
        friends,
        session: locals.session,
        profiles,
        groups
    }
}