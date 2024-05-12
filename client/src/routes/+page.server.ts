import { AppAPI } from '../api/api';
import { Replacement } from '../lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const api = new AppAPI('');
	if (locals.session.role !== "ADMIN") {
		const group = await api.getGroup(locals.session.user_id);
		
		const replacement = new Replacement("30.10.2023");
		const schedule = await api.getSchedule(group.name);
		
		return {
			schedule: schedule.scheduleList,
			replacement: replacement.getReplacement()
		}
	}
	

}
