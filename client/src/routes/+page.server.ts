import { getReplacemnt } from '../lib/ts/replacement';
import { getSchedule } from '../lib/ts/schedule';
import type { PageServerLoad } from './$types';
import fs from 'node:fs';
import { HomePage } from './homePage';

export const load: PageServerLoad = async ({ locals }) => {
	const homePage = new HomePage(locals.user);
	// SELECT GROUP
	// const url = `https://3000-viseliza-messangerts-5xdi4l2llw2.ws-eu105.gitpod.io/group/1992`;
	// const response = await fetch(url);
	// return await response.json();

	const group: string = "1992";
	const file_name: string = "1911 1981 1991 1992";
	const path = `src/lib/docs/${file_name}.xlsx`;

	// if (!fs.existsSync(path)) await Replacement.downloadFile(group.href, path);

	const schedule: string = await getSchedule(group, path);
	const replacement: string = await getReplacemnt(undefined ,"src/lib/docs/30.10.2023.doc");
	return {
		schedule,
		replacement
	}
}
