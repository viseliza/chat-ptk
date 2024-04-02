import { AppAPI } from '../api/api';
import { Replacement, Schedule } from '../lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const api = new AppAPI('');
	const group = await api.getGroup(locals.session.user_id);
	
	const replacement = new Replacement("30.10.2023");
	const schedule = new Schedule(group.name);
	
	return {
		schedule: schedule.getTheWeeklySchedule(),
		replacement: replacement.getReplacement(group.name)
	}
}
