
import { AppAPI } from "../../../api/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const api = new AppAPI("");
    const friendsByMe = await api.getAllFriendsByMe(locals.session.user_id);
    const friendsForMe = await api.getAllFriendsForMe(locals.session.user_id);
    let profilesByMe = [];
    let profilesForMe = [];
    let idsByMe: number[] = [];
    let idsForMe: number[] = [];
    
    friendsByMe.forEach((friend: any) => {
        if (friend.friend_id)
            idsByMe = [...idsByMe, friend.friend_id];
    });

    if (idsByMe) {
        profilesByMe = await api.profilesFriends(idsByMe);
        profilesByMe.forEach((profile: any) => {
            profile.friendStatus = "subscribeTo";
        });
    
    }
    

    friendsForMe.forEach((friends: any) => {
        if (friends.me_id)
            idsForMe = [...idsForMe, friends.me_id];
    });

    if (idsForMe) {
        profilesForMe = await api.profilesFriends(idsForMe);
        profilesForMe.forEach((profile: any) => {
            profile.friendStatus = "subscribeOnMe";
        });
    
    }

    return {
        session: locals.session,
        profilesByMe,
        profilesForMe
    }
}