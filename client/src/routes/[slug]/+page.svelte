<script lang="ts">
    import placeholder from '/images/50x50.svg';
    import message from '/images/message.svg';
    import message_dark from '/images/message_dark.svg';
    import type { PageData } from './$types';
    import Replacement from '../../lib/components/Replacement.svelte';
    import Schedule from '../../lib/components/Schedule.svelte';

    export let data: PageData;

    let role = data.session.role;
    $: user_id = data.session.user_id
    $: schedule = data.schedule;
    $: profile = data.profile
    $: replacement = data.replacement.split('\n\n');


    async function subscribe() {
        if (data.isFriend.friendStatus == "subscribeTo")
            return 0;
        const result = await fetch("https://viseliza.site/api/friend/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ me_id: user_id, friend_id: profile.user_id })
        });
        const respone = await result.json();
        data.isFriend = respone;
    }

    async function unsubscribe() {
        const result = await fetch("https://viseliza.site/api/friend", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ me_id: user_id, friend_id: profile.user_id })
        });
        data.isFriend.status = "";
    }
</script>

<svelte:head>
    <title>Профиль</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <div class="header">
        <div class="left">

            <img src={placeholder} alt="">
            <div style="font-size: 16px;">
                <p style="margin-bottom: 5px;">{profile.first_name}</p>
                <hr>
                <p style="margin-top: 5px;">{profile.last_name}</p>
            </div>
        </div>
        <div class="right">
            {#if profile.user_id == user_id}
                <button>Редактировать профиль</button>
            {:else}
                {#if data.isFriend.statusCode || !data.isFriend.status}
                    <button on:click={() => subscribe()}>Добавить в друзья</button>
                {:else if (data.isFriend.status == "subscribeTo")}
                    <button on:click={() => unsubscribe()}>Заявка отправлена</button>
                {:else}
                    <button>Удалить из друзей</button>
                {/if}
                <a class="message" href="/messanger/@{data.login}">
                    {#if data.session.theme == "white"}
                        <img class="nav_icon" src={message} alt="">
                    {:else}
                        <img class="nav_icon" src={message_dark} alt="">
                    {/if}
                </a>
            {/if}
        </div>
    </div>
    
    <div class="content">
        <div class="item">
            {#if user_id == profile.user_id}
            <p>Почта:</p> 
            <div class="input_group">
                <input type="text" placeholder="Name"/>
                <label for="name" class="form__label">
                    {#if !profile.email}
                        your@email.com
                    {:else}
                        {profile.email}
                    {/if}
                </label>
            </div>
            {/if}
        </div>
        <div class="item">
            <p>Группа: {profile.group.name}</p>
        </div>
    </div>

    <div class="title">
        Расписание на сегодня
    </div>

    <div class="schedule">
        <Schedule 
            theme={data.session.theme} 
            scheduleList = {schedule} 
            isHome={false}
            {role}
        />
    </div>

    <div class="title">
        Замены на сегодня
    </div>

    <Replacement replacement = {replacement} isHome={true}/>
    
</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        height: 100%;
        min-height: 95vh;
    }
    .header {
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }
    .header img {
        height: 75px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .header .left {
        display: flex;
        align-items: center;
        background-color: var(--sidebar-color);
    }
    .header .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .header .right {
        display: flex;
        justify-content: center;
    }
    .header .right button {
        text-decoration: none;
        font-size: 12px;
        text-align: center;
        background-color: var(--message-back);
        border-radius: 10px;
        border: 0;
        border-style: none;
        color: var(--text-color);
        padding: 8px;
        font-weight: 600;
        height: 35px;
        transition: background .5s;
    }
    .header .right button:hover {
        background-color: var(--message-back-shadow);
        cursor: pointer;
    }
    .header .right .message {
        padding: 7px;
        height: 35px;
        margin: 0 5px;
        width: 35px;
        border-style: none;
        background-color: transparent;
        border-radius: 10px;
        border: 1px solid var(--text-color);
    }
    .header .right .message img {
        height: 100%;
        width: 100%;
    }
    div p {
        font-weight: 700;
    }
    .content {
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    .content p {
        margin: 10px 0;
    }
    .item {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .input_group {
        padding: 15px;
        position: relative;
        width: 50%;
    }
    .input_group input {
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        color: #fff;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;

        &::placeholder {
            color: transparent;
        }
        &:placeholder-shown ~ .form__label {
            cursor: text;
            top: 20px;
        }
    }
    .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: #9b9b9b;
    }  
    .input_group input:focus {
        ~ .form__label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            font-size: 1rem;
            color: #11998e;
            font-weight:700;   
        }
        padding-bottom: 6px;  
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, #11998e, #38ef7d);
        border-image-slice: 1;
    } 

    .schedule {
        padding-top: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    .title {
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 20px;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 700;
    }
    .replacement {
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    } 
</style>