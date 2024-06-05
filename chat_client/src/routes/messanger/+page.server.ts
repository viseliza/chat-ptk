import type { PageServerLoad } from "./$types";
import Messanger from "../../lib/utils/Messanger";

export const load: PageServerLoad = async ({ locals }) => {
    const messanger = new Messanger(locals.session.user_id);
    const session = locals.session;
    const chats = await messanger.getChats(locals.session.login);
    
    return { 
        chats,
        session 
    }
}
