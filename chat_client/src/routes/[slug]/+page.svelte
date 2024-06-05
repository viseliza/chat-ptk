<script lang="ts">
    import placeholder from '/images/50x50.svg';
    import message from '/images/message.svg';
    import message_dark from '/images/message_dark.svg';
    import update from '/images/update.svg';
    import update_dark from '/images/update_dark.svg';
    import apply from '/images/apply.svg';
    import apply_dark from '/images/apply_dark.svg';
    import type { PageData } from './$types';
    import Replacement from '../../lib/components/Replacement.svelte';
    import Schedule from '../../lib/components/Schedule.svelte';

    export let data: PageData;

    let role = data.session.role;
    $: user_id = data.session.user_id
    $: schedule = data.schedule;
    $: profile = data.profile
    $: replacement = data.replacement.split('\n\n');
    $: group = data.group;

    let isUpdateStatus = false;
    let valueStatus: string = "";

    async function subscribe() {
        if (data.isFriend.friendStatus == "subscribeTo")
            return 0;
        const result = await fetch("https://chat-ptk.viseliza.site/api/friend/", {
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
        const result = await fetch("https://chat-ptk.viseliza.site/api/friend", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ me_id: user_id, friend_id: profile.user_id })
        });
        data.isFriend.status = "";
    }

    const handlerClickUpdateStatus = async () => {
        const respone = await fetch(`https://chat-ptk.viseliza.site/api/profile/${user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                status: valueStatus    
            })
        })
        profile.status = valueStatus;
        isUpdateStatus = !isUpdateStatus;
    }
</script>

<svelte:head>
    <title>Профиль</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="profile">
    <section class="header">
        <div class="left">

            <img src={placeholder} alt="">
            <div style="font-size: 16px;">
                <p style="margin-bottom: 5px;">{profile.first_name}</p>
                <hr>
                <p style="margin-top: 5px;">{profile.last_name}</p>
            </div>
        </div>
        <div class="right">
            {#if profile.user_id != user_id}
                {#if data.isFriend.statusCode || !data.isFriend.status}
                    <button on:click={() => subscribe()}>Добавить в друзья</button>
                {:else if (data.isFriend.status == "subscribeTo")}
                    <button on:click={() => unsubscribe()}>Заявка отправлена</button>
                {:else}
                    <button on:click={() => unsubscribe()}>Удалить из друзей</button>
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
    </section>
    
    {#if (profile.user_id != user_id && profile.status) || (profile.user_id == user_id)}
        <section class="status">
            {#if !isUpdateStatus}
                <span class="span_{profile.status ? true : false}">
                    {profile.status ? profile.status : 'Статус не установлен'}
                </span>
                {#if user_id == profile.user_id}
                    <button on:click={() => isUpdateStatus = !isUpdateStatus} class="changeStatus">
                        <img class="nav_icon" src={data.session.theme == "white" ? update : update_dark} alt="">
                    </button>
                {/if}
            {:else if isUpdateStatus && profile.user_id == user_id}
                <textarea class="inputStatus" maxlength="106" bind:value={valueStatus} on:input={() => valueStatus = valueStatus.replace(/\n/g, '')}/>
                <button on:click={handlerClickUpdateStatus} class="changeStatus">
                    <img class="nav_icon" src={data.session.theme == "white" ? apply : apply_dark} alt="">
                </button>
            {/if}
        </section>
    {/if}
    
    <section class="content">
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
            <p>Группа: {group.name}</p>
        </div>
    </section>

    <section class="title">
        Расписание на сегодня
    </section>

    <section class="schedule">
        <Schedule 
            theme={data.session.theme} 
            scheduleList = {schedule} 
            isHome={false}
            {role}
        />
    </section>

    <section class="title">
        Замены на сегодня
    </section>

    <Replacement replacement = {replacement} isHome={true}/>
    
</div>

<style lang="scss">
    /*********  PROFILE  *********/
    .profile {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        height: 100%;
        min-height: 95vh;
    }

    section {
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 20px;
        display: flex;
        margin-bottom: 20px;
    }
    
    /*********  HEADER  *********/
    .header {
        justify-content: space-between;
        align-items: center;
        padding: 30px;
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
    
    
    /*********  CONTENT  *********/
    .content {
        flex-direction: column;
        justify-content: space-around;
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

    /*********  SCHEDULE  *********/
    .schedule {
        padding: 0;
        padding-top: 20px;
        flex-direction: column;
        justify-content: space-around;
    }
    .title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .replacement {
        flex-direction: column;
        justify-content: space-around;
    }
    
    /*********  STATUS  *********/
    .status {
        position: relative;
    }
    .status span {
        font-weight: 600;
        word-break: break-all;
        padding: 12px 15px;
        border-radius: 5px;
    }
    .status span.span_true {
        box-shadow: var(--box-shadow) 0px 8px 24px;
        min-width: 100%;
    }
    .status span.span_false {
        box-shadow: none;
        padding: 0;
    }
    .status .inputStatus {
        flex: 1 1 auto;
        background-color: transparent;
        border: none;
        padding: 12px 15px;
        font-size: 16px;
        color: var(--text-color);
        box-shadow: var(--box-shadow) 0px 8px 24px;
        border-radius: 5px;
        font-weight: 600;
        outline: none;
        resize: none;
    }
    .status .changeStatus {
        box-shadow: var(--box-shadow) 0px 8px 24px;
        border: 2px solid var(--message-back-shadow);
        background: var(--message-back-shadow);
        border-radius: 50%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: -10px;
        bottom: -10px;
        transition: border .3s, background .3s;
    }
    .status .changeStatus:hover {
        cursor: pointer;
        border: 2px solid var(--message-back);
        background: var(--message-back);
    }
    .status .changeStatus:active {
        box-shadow: var(--box-shadow) 0px 8px 40px;
        border: 2px solid var(--message-back);
        background: var(--message-back);
    }
    .status .changeStatus img {
        width: 24px;
        height: 24px;
    }
</style>