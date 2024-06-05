import { error } from "@sveltejs/kit";
import { AppAPI } from "../../api/api";
import { Replacement } from "../../lib/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
    const api = new AppAPI('');
    const profile = await api.getProfileByLogin(params.slug);
    const group = await api.getGroup(profile.user_id);
    let isFriend;

    if (profile.statusCode == 404) 
        throw error(404, "Пользователь не найден!")

    if (profile.user_id != locals.session.user_id)
        isFriend = await api.getFriend(locals.session.user_id, profile.user_id);

	const replacement = new Replacement("30.10.2023");
	const schedule = profile.group.schedule;
    delete schedule.id;
    delete schedule.group_id;
    
    const currentDay = new Date().getDay(); 
    
    return { 
        group,
        isFriend,
        login: params.slug,
        profile,
        schedule: schedule[Object.keys(schedule)[currentDay == 0 ? 0 : currentDay - 1]],
        replacement: replacement.getReplacement(profile.group.name),
    }
}