import type { PageServerLoad } from "./$types";
import { Messanger } from "../../lib/utils";

export const load: PageServerLoad = async ({ locals }) => {
    const messanger = new Messanger(locals.user);
    
    const chats = await messanger.getChats();

    return { chats }
}
