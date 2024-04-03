<script lang="ts">
    import placeholder from "$lib/images/50x50.svg";
    import user_add from "../../lib/images/user-add.svg";
    import user_add_dark from "../../lib/images/user-add_dark.svg";
    import user_remove from "../../lib/images/user-remove.svg";
    import user_remove_dark from "../../lib/images/user-remove_dark.svg";
    import user_tick from "../../lib/images/user-tick.svg";
    import user_tick_dark from "../../lib/images/user-tick_dark.svg";
    import message from "../../lib/images/message.svg";
    import message_dark from "../../lib/images/message_dark.svg";
    import clock from "../../lib/images/clock.svg";
    import clock_dark from "../../lib/images/clock_dark.svg";
    import type { IProfile } from "../types";

    export let theme: string;
    export let user_id: number;
    export let profile: IProfile;

    async function subscribe() {
        if (profile.friendStatus == "subscribeTo")
            return 0;
        const result = await fetch("http://localhost:18001/friend/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ me_id: user_id, friend_id: profile.user_id })
        });
        const respone = await result.json();
        profile.friendStatus = respone.status;
    }

    async function unsubscribe() {
        const result = await fetch("http://localhost:18001/friend", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ me_id: user_id, friend_id: profile.user_id })
        });
        profile.friendStatus = "";
    }

</script>

<section class="friend-item">
    <section class="left">
        <section class="icon">
            <a href="/{profile.user?.login}">
                <img src={placeholder} alt="">
            </a>
        </section>
        <section class="info">
            <a href="/{profile.user?.login}"><span class="name">{profile.first_name} {profile.last_name}</span></a>
            <span class="group">группа: {profile.group?.name}</span>
        </section>
    </section>
    <section class="right">
        <button class="button" on:click={() =>  subscribe()}>
            {#if !profile.friendStatus}
                {#if theme == "white"}
                    <img class="nav_icon" src={user_add} alt="">
                {:else}
                    <img class="nav_icon" src={user_add_dark} alt="">
                {/if}
            {:else if (profile.friendStatus == "subscribeTo")}
                {#if theme == "white"}
                <div class="friend-time">
                    <button on:click={() => unsubscribe()}>Отменить заявку</button>
                    <img class="nav_icon" src={clock} alt="">
                </div>
                {:else}
                    <div class="friend-time">
                        <button on:click={() => unsubscribe()}>Отменить заявку</button>
                        <img class="nav_icon" src={clock_dark} alt="">
                    </div>
                {/if}
            {:else if (profile.friendStatus == "friends")}
                {#if theme == "white"}
                    <a href="/messanger/@{profile.user?.login}"><img class="nav_icon" src={message} alt=""></a>
                {:else}
                    <a href="/messanger/@{profile.user?.login}"><img class="nav_icon" src={message_dark} alt=""></a>
                {/if}
            {:else if (profile.friendStatus == "subscribeOnMe")}
                {#if theme == "white"}
                    <button on:click={() => unsubscribe()} class="button-remove"><img class="nav_icon" src={user_remove} alt=""></button>
                    <button on:click={() => subscribe()} class="button-tick"><img class="nav_icon" src={user_tick} alt=""></button>
                {:else}
                    <button on:click={() => unsubscribe()} class="button-remove"><img class="nav_icon" src={user_remove_dark} alt=""></button>
                    <button on:click={() => subscribe()} class="button-tick"><img class="nav_icon" src={user_tick_dark} alt=""></button>
                {/if}
            {/if}
        </button>
    </section>
</section>

<style>
    .friend-item {
        display: flex;
        justify-content: space-between;
        padding: 20px 30px;
        border-radius: 10px;
        background-color: var(--sidebar-color);
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        margin: 10px 0;
    }
    .friend-item .left {
        display: flex;
        align-items: center;
    }
    .friend-item .left .icon {
        margin-right: 15px;
    }
    .friend-item .left .icon img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }
    .friend-item .left .info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 14px;
    }
    .friend-item .left .info .name {
        font-weight: 600;
    }
    .friend-item .left .info .group {
        color: var(--text-color-opacity);
        font-size: 14px;
    }
    .friend-item .right {
        display: flex;
        justify-content: center;
    }   
    .friend-time {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: var(--primary-head);
        font-size: 14px;
        border-radius: 10px;
        padding: 10px;
    }
    .friend-time button {
        margin-right: 10px;
        border-style: none;
    }
    .friend-time button:hover {
        cursor: pointer;
        background-color: var(--primary-head);
    }
    .button {
        background-color: transparent;
        border-style: none;
    }
    .button-remove,
    .button-tick {
        background-color: transparent;
        padding: 3px 5px;
        border-radius: 10px;
        border: 2px solid var(--primary-head);
        transition: background .3s;
    }
    .button-remove:hover {
        cursor: pointer;
        background-color: rgba(255, 0, 0, 0.50);
    }
    .button-tick:hover {
        cursor: pointer;
        background-color: rgba(0, 128, 0, 0.50);
    }
</style>