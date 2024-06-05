import { redirect } from "@sveltejs/kit";

export function load({ locals, route, cookies }) {
    let theme = cookies.get('theme') ?? "white";
    
    if (!cookies.get('theme'))
        cookies.set('theme', 'white');

    locals.session = locals.session ? { 
        user_id: locals.session.user_id,
        login: locals.session.login,
        theme,
        role: locals.session.role
    } : {
        user_id: undefined,
        login: undefined,
        theme,
        role: undefined
    };
    
    if (!locals.session.user_id && route.id != "/auth") 
        throw redirect(302, "/auth");
    return { session: locals.session }
}