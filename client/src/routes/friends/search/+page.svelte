<script lang="ts">
    import Input from "../../../lib/components/Input.svelte";
    import DropDown from "../../../lib/components/DropDown.svelte";
    import FriendItem from "../../../lib/components/FriendItem.svelte";
    import FriendsHeader from "../../../lib/components/Friends/FriendsHeader.svelte";
    import SearchFriends from "../../../lib/utils/SearchFriends";
    import type { IGroup, IProfile } from "../../../lib/types";
    import type { PageData } from "../$types";
    export let data: PageData;
    
    const searchFrineds = new SearchFriends(data.profiles);
    const groups = data.groups.map((group: IGroup) => {
        return group.name;
    });
    let theme = data.session.theme;
    let filteredProfiles: IProfile[] | string = [];

    let searchProfiles = searchFrineds.getAllProfiles();
    let profilesWithFriends = searchProfiles.filter((profile) => {
        if (profile.user?.login != data.session.login) {
            data.friends.filter((friend) => {
                if (friend.friend_id == profile.user_id && friend.status) 
                    profile.friendStatus = friend.groupstatus;
            })
            return profile;
        }
    })
    $: if (value != "Группа") {
        if (!searchedFriends.length) {
            filteredProfiles = profilesWithFriends.filter((profile) => {
                if (profile.group?.name == value)
                    return profile
            })
        } else if (typeof searchedFriends === 'string') {
            filteredProfiles = searchedFriends
        } else {
            filteredProfiles = searchedFriends.filter((profile) => {
                if (profile.group?.name == value)
                    return profile
            })
        }
        if (!filteredProfiles.length)
            filteredProfiles = "Результатов не найдено";
    }
  
    let searchedFriends: IProfile[] = [];
    let value = "Группа";
</script>

<svelte:head>
    <title>Поиск друзей</title>
    <meta name="description" content="SearchFriends" />
</svelte:head>


<section class="search-friends">
    <FriendsHeader
        activeSearch={true}
    />
    <section class="tags">
        <div class="searching">
            <DropDown
                {groups}
                bind:value
            />
            <Input
                bind:theme
                searchArray={profilesWithFriends}
                bind:searchedArray={searchedFriends}
                isStatic={true}
                showInput={true}
            />
        </div>
    </section>
    <section class="friends-list">
        {#if !filteredProfiles.length && !searchedFriends.length}
            {#each profilesWithFriends as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                        {profile}
                    />
                {/if}
            {/each}
        {:else if (typeof filteredProfiles === 'string')}
            <div class="not-found">{filteredProfiles}</div>
        {:else if filteredProfiles.length}
            {#each filteredProfiles as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                        {profile}
                    />
                {/if}
            {/each}
        {:else if (typeof searchedFriends === 'string')}
            <div class="not-found">{searchedFriends}</div>
        {:else if searchedFriends.length}
            {#each searchedFriends as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                        {profile}
                    />
                {/if}
            {/each}
        {/if}
    </section>
</section>



<style>
    .search-friends {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        height: 100%;
        min-height: 95vh;
    }
    .search-friends section {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }    
    .tags .searching{
        display: flex;
        flex-direction: row;
    }
    .friends-list {        
        display: flex;
        flex-direction: column;
        height: 72vh;
        overflow-y: auto;
    }
    .not-found {
        flex: 1 1 auto;
        align-items: center;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 100px;
        font-size: 18px;
        font-weight: 700;
    }
</style>