<script lang="ts">
    import type { PageData } from "../$types";
    import FriendsHeader from "../../lib/components/Friends/FriendsHeader.svelte";
    import FriendItem from "../../lib/components/FriendItem.svelte";
    import Input from "../../lib/components/Input.svelte";
    import user_add from "/images/user-add.svg";
    import user_add_dark from "/images/user-add_dark.svg";
    import type { Profile } from "../../models/Profile";
    export let data: PageData;

    let theme = data.session.theme;
    let friends: Profile[] = data.profiles;
    let searchedFriends: Profile[] = [];
</script>

<svelte:head>
    <title>Друзья</title>
    <meta name="description" content="Friends" />
</svelte:head>

<section class="friends">
    <FriendsHeader 
        activeMyFriends={true}
    />
    <section class="friends-search">
        <Input
            bind:theme
            searchArray={friends}
            bind:searchedArray={searchedFriends}
            showInput={true}
            isStatic={true}
        />
    </section>
    <section class="friends-list">
        {#if friends.length}
            {#each friends as friend}
            <FriendItem
                {theme}
                user_id={data.session.user_id}
                profile={friend}
            />
            {/each}
        {:else}
            <div>
                <img src={theme == 'white' ? user_add : user_add_dark} alt="user-add">
                <span class="friends-title">Ваш список друзей пуст</span>
                <span>Вы можете найти новых друзей используя поиск!<br>Новые друзья будут появляться здесь</span>
            </div>
        {/if}
    </section>
</section>

<style>
    .friends {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        height: 100%;
        min-height: 95vh;
    }
    .friends section {
        padding: 20px 30px;
        display: flex;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }
    .friends-list {
        height: 72vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow-y: auto;
    }

    .friends-list div {
        flex: 1 1 auto;
        align-items: center;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 100px;
    }
    .friends-list img {
        width: 50px;
        height: 50px;
    }
    .friends-list div span {
        font-size: 16px;
        font-weight: 500;
    }

    .friends-list .friends-title {
        font-size: 18px;
        padding: 5px 0;
        font-weight: 700;
    }

    .friends-search {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .friends-search span {
        white-space: nowrap;
        margin-right: 15px;
    }
</style>

