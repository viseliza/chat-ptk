import { AppAPI } from "../../api/api";
import type { PageServerLoad } from "./$types";
import { getSchedule } from '$lib/ts/schedule';
import { getReplacemnt } from "$lib/ts/replacement";
// import fs from 'node:fs';

export const load: PageServerLoad = async ({ params }) => {
    const api = new AppAPI('');
    const profile = await api.getProfileByLogin(params.slug);
    const group = await api.getGroupByID(profile.group_id);
	const path = `src/lib/docs/1911 1981 1991 1992.xlsx`;
	const schedule: string = await getSchedule(group, path, new Date().getDay() - 1);
	const replacement: string = await getReplacemnt(group ,"src/lib/docs/30.10.2023.doc");
    
    return { 
        profile,
        schedule: schedule.split("\n"),
        replacement,
        group
    }
}