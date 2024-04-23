<script lang="ts">
    import placeholder from "/images/50x50.svg";
    import user_add from "/images/user-add.svg";
    import user_add_dark from "/images/user-add_dark.svg";
    import user_remove from "/images/user-remove.svg";
    import user_remove_dark from "/images/user-remove_dark.svg";
    import user_tick from "/images/user-tick.svg";
    import user_tick_dark from "/images/user-tick_dark.svg";
    import message from "/images/message.svg";
    import message_dark from "/images/message_dark.svg";
    import clock from "/images/clock.svg";
    import clock_dark from "/images/clock_dark.svg";
    import type { IProfile } from "../types";

    export let theme: string;
    export let user_id: number;
    export let profile: IProfile;
    
    async function subscribe() {
        if (profile.friendStatus == "subscribeTo")
            return 0;
        const result = await fetch("https://viseliza.site/api/friend/", {
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
        const result = await fetch("https://viseliza.site/api/friend", {
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
                <img class="nav_icon" src={theme == 'white' ? user_add : user_add_dark} alt="">
            {:else if (profile.friendStatus == "subscribeTo")}
                <div class="friend-time">
                    <button on:click={() => unsubscribe()}>Отменить заявку</button>
                    <img class="nav_icon" src={theme == 'white' ? clock : clock_dark} alt="">
                </div>
            {:else if (profile.friendStatus == "friends")}
                <a href="/messanger/@{profile.user?.login}"><img class="nav_icon" src={theme == 'white' ? message : message_dark} alt=""></a>
            {:else if (profile.friendStatus == "subscribeOnMe")}
                <button on:click={() => unsubscribe()} class="button-remove"><img class="nav_icon" src={theme == 'white' ? user_remove : user_add_dark} alt=""></button>
                <button on:click={() => subscribe()} class="button-tick"><img class="nav_icon" src={theme == 'white' ? user_tick : user_tick_dark} alt=""></button>
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
        box-shadow: var(--box-shadow) 0px 7px 29px 0px;
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
        padding: 3px 5px;
        border-radius: 7px;
        opacity: 0.5;
        border: none;
        box-shadow: var(--box-shadow) 0px 5px 15px;
        transition: opacity .5s;
    }
    .button-remove {
        background-color: #f00;
    }
    .button-tick {
        background-color: #008000;
    }
    .button-remove:hover {
        cursor: pointer;
        opacity: 1;
    }
    .button-tick:hover {
        cursor: pointer;
        opacity: 1;
    }
</style>