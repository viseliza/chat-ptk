<script lang="ts">
    import arrow_left from "/images/arrow-left.svg";
    import arrow_left_dark from "/images/arrow-left_dark.svg";
    import type { PageData } from "../$types";
    import DropDown from "../../../lib/components/DropDown.svelte";
    import FriendItem from "../../../lib/components/FriendItem.svelte";
    import Input from "../../../lib/components/Input.svelte";
    import type { IProfile } from "../../../lib/types";
    import SearchFriends from "../../../lib/utils/SearchFriends";
    export let data: PageData;
    
    const searchFrineds = new SearchFriends(data.profiles);
    const groups = data.groups.map(group => {
        return group.name;
    });
    let theme = data.session.theme;
    let filteredProfiles: IProfile[] = [];

    let searchProfiles = searchFrineds.getAllProfiles();
    let profilesWithFriends = searchProfiles.filter((profile) => {
        if (profile.user_id != data.session.user_id) {
            data.friends.filter((friend) => {
                if (friend.friend_id == profile.user_id && friend.status) 
                    profile.friendStatus = friend.status;
            })
            return profile;
        }
    })

    $: if (value != "Группа") {
        filteredProfiles = profilesWithFriends.filter((profile) => {
            if (profile.group?.name == value)
                return profile
        })
    }
    let myProfile = searchProfiles.filter((profile) => profile.user?.login == data.session.login)[0];
    
    let searchedFriends: IProfile[] = [];
    let value = "Группа";
</script>

<svelte:head>
    <title>Поиск друзей</title>
    <meta name="description" content="SearchFriends" />
</svelte:head>


<section class="search-friends">
    <section>
        <div class="back">
            <a class="back" href="./" style="text-decoration: none;">
                {#if theme == "white"}
                    <img class="nav_icon" src={arrow_left} alt="" />
                {:else}
                    <img class="nav_icon" src={arrow_left_dark} alt="" />
                {/if}
                <span>Назад</span>
            </a>
        </div>
    </section>
    <section class="tags">
        <div class="searching">
            <Input
                bind:theme
                searchArray={searchProfiles}
                searchedArray={searchedFriends}
                isStatic={true}
                showInput={true}
            />
        </div>
        <div>
            <DropDown
                {groups}
                bind:value
            />
        </div>
    </section>
    <section class="friends-list">
        {#if !filteredProfiles.length}
            {#each profilesWithFriends as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                        {profile}
                    />
                {/if}
            {/each}
        {:else}
            {#each filteredProfiles as profile}
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
    .back {
        width: 100px;
    }
    .back {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .back img{
        margin-right: 5px;
    }
    .tags .searching{
        display: flex;
        flex-direction: row;
    }
    .friends-list {        
        display: flex;
        flex-direction: column;
        height: 70vh;
        overflow-y: auto;
    }
</style>