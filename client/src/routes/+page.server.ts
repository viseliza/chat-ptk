import { Replacement, Schedule } from '../lib/utils';
import type { PageServerLoad } from './$types';
import fs from 'node:fs';

export const load: PageServerLoad = async ({ locals }) => {
	const replacement = new Replacement("30.10.2023");
	const schedule = new Schedule("1992");
	
	// if (!fs.existsSync(path)) await Replacement.downloadFile(group.href, path);
	
	return {
		schedule: schedule.getTheWeeklySchedule(),
		replacement: replacement.getReplacement("1992")
	}
}
