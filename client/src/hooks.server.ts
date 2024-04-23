import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

interface Profile {
	id?: number;
	email?: string;
	first_name?: string;
	last_name?: string;
	father_name?: string;
	theme?: Theme;
	role?: Role;
	user_id?: number;
	group_id: number;
	login?: string;
	group?: string;
	rooms?: Array<Object>
}

enum Role {
	STUDENT,
	TEACHER
}

enum Theme {
	white,
	black
}

const JWT_ACCESS_TOKEN = "d7a428bc721a2e90e5dce093933c5199aa7adadc11c04cdabceb282897d4a2bf";

export const handle: Handle = async ({ event, resolve }) => {
	const { headers } = event.request;

	const cookies = parse(headers.get("cookie") ?? "");
	
	if (cookies.AuthorizationToken) {
		// Remove Bearer prefix
		const token = cookies.AuthorizationToken.split(" ")[1];

		try {
			const jwtUser = jwt.verify(token, JWT_ACCESS_TOKEN);

			if (typeof jwtUser === "string") {
				throw new Error("Something went wrong");
			}
			
			const theme = cookies.theme;

			event.locals.session = {
				user_id: jwtUser.user_id,
				login: jwtUser.login,
				theme: theme || jwtUser.theme,
				role: jwtUser.role
			};
		} catch (error) {
			console.error(error);
		}
	}
	return await resolve(event);
};