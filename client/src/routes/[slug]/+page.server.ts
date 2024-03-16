import { AppAPI } from "../../api/api";
import { Replacement, Schedule } from "../../lib/utils";
import type { PageServerLoad } from "./$types";
// import fs from 'node:fs';

export const load: PageServerLoad = async ({ params }) => {
    const api = new AppAPI('');
    const profile = await api.getProfileByLogin(params.slug);
    const group = await api.getGroupByID(profile.group_id);

	const replacement = new Replacement("30.10.2023");
	const schedule = new Schedule("1992");
    
    return { 
        profile,
        schedule: await schedule.getTheDailySchedule(new Date().getDay() - 1),
        replacement: replacement.getReplacement("1992"),
        group
    }
}