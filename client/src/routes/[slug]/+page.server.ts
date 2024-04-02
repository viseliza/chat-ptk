import { error } from "@sveltejs/kit";
import { AppAPI } from "../../api/api";
import { Replacement, Schedule } from "../../lib/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const api = new AppAPI('');
    const profile = await api.getProfileByLogin(params.slug);
    
    if (profile.statusCode == 404) 
        throw error(404, "Пользователь не найден!")

	const replacement = new Replacement("30.10.2023");
	const schedule = new Schedule(profile.group.name);
    
    return { 
        profile,
        schedule: await schedule.getTheDailySchedule(new Date().getDay() - 1),
        replacement: replacement.getReplacement("1992"),
    }
}