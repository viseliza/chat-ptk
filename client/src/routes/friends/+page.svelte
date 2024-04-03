<script lang="ts">
    import type { PageData } from "../$types";
    import FriendItem from "../../lib/components/FriendItem.svelte";
    import Input from "../../lib/components/Input.svelte";
    import user_add from "../../lib/images/user-add.svg";
    import user_add_dark from "../../lib/images/user-add_dark.svg";
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
    <section class="friends-header">
        <div class="friends-left">
            <div class="myFriends">
                <span>Мои друзья: <strong>{friends.length}</strong></span>
            </div>
            <a class="request" href="/friends/request">Мои заявки</a>
        </div>
        
        <a href="/friends/search">Найти друзей</a>
    </section>
    <section class="friends-search">
        <span>Поиск друзей: </span>
        <Input
            {theme}
            searchArray={friends}
            searchedArray={searchedFriends}
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
                {#if theme === "white"}
                    <img src={user_add} alt="user-add">
                {:else}
                    <img src={user_add_dark} alt="user-add">
                {/if}
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
    .friends-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .friends-header a {
        display: inline-flex;
        align-items: center;
        background-color: var(--sidebar-color);
        border-radius: 10px;
        border-style: none;
        box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
        color: var(--text-color);
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        height: 48px;
        justify-content: center;
        letter-spacing: .25px;
        max-width: 100%;
        padding: 2px 20px;
        transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms, color 0.2s linear;
        touch-action: manipulation;
        will-change: transform,opacity;
    }

    .friends-header a:hover {
        text-decoration: none;
        color: #174ea6;
    }

    .friends-header a:active {
        box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
        outline: none;
    }
    .friends-left {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .request {
        margin-left: 15px;
    }

    .friends-list {
        min-height: 72vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
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
    .myFriends {
        padding: 15px;
        height: 48px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
</style>

