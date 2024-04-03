
import { AppAPI } from "../../api/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const api = new AppAPI("");
    const friends = (await api.getAllFriends(locals.session.user_id));
    let ids: number[] = [];
    
    friends.forEach((friend: any) => {
        if (friend.me_id) {
            if (friend.me_id != locals.session.user_id) 
                ids = [...ids, friend.me_id]
            else if (friend.friend != locals.session.user_id)
                ids = [...ids, friend.friend_id]
        }
    })

    let profiles = await api.profilesFriends(ids);
    
    profiles.forEach((profile: any) => {
        profile.friendStatus = "friends";
    });


    return {
        friends,
        session: locals.session,
        profiles
    }
}