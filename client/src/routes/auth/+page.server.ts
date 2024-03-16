import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as jwt from 'jsonwebtoken';
import { AppAPI } from '../../api/api';
import type { User } from '../../models/User';
import isExistUser from '../../lib/utils/isExistUser';

const JWT_ACCESS_TOKEN = "d7a428bc721a2e90e5dce093933c5199aa7adadc11c04cdabceb282897d4a2bf";

export function load({ locals }) {
	if (locals.user)
		throw redirect(302, '/')
}

export const actions: Actions = {
	default: async (event: any) => {
		const formData = Object.fromEntries(await event.request.formData());
	
		// Verify that we have an login and a password
		if (!formData.login || !formData.password) {
			return fail(400, {
				error: 'Вы не ввели логин или пароль'
			});
		}
		const user: User = formData as { login: string; password: string };
		
		if (!await isExistUser(user.login, user.password))
			return fail(400, { error: 'Неравильный логин или пароль. Попробуйте еще раз' });
		
		// Inizialate frontend API
		const api = new AppAPI('');
		// Take full name from response
		const fio = await isExistUser(user.login, user.password) as { firstName: string; lastName: string; midName: string, email: string, personId: string }
		// Profile data
		const profile = await api.checkUser(user, fio.firstName, fio.lastName, fio.midName);
		// Generate jwt token for profile
		const token = jwt.sign(profile, JWT_ACCESS_TOKEN, {
			expiresIn: '1d'
		});
		// Set cookie
		event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day	
		 });
	
		// Redirect to the home page
		throw redirect(302, '/');
	}
};
