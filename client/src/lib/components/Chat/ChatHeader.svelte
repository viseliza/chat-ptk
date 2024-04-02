<script lang="ts">
    import arrow_left from "$lib/images/arrow-left.svg";
    import arrow_left_dark from "$lib/images/arrow-left_dark.svg";
    import placeholder from "$lib/images/50x50.svg";
    import ModalChatHeader from "./ModalChatHeader.svelte";
    import Points from "../../../lib/components/Chat/Points.svelte";
    import type Chat from "../../utils/Chat";
    import Input from "../Input.svelte";
    import type { Message } from "../../../models/Message";
    
    export let login: string;
    export let theme: string;
    export let chat: Chat;
    export let showInput: boolean;
    export let searchedMessages: Message[] = [];

    let room_name: string;
    let name = chat.room.name.split('_');
    let href: string;

    if (name.length > 1) {
        if (name[0] == name[1]) {
            room_name = "Избранное";
            href = login;
        }
        else {
            if (chat.profiles[0].user?.login == login) {
                room_name = `${chat.profiles[1].first_name} ${chat.profiles[1].last_name}`;
                href = chat.profiles[1].user!.login;
            } else {
                room_name = `${chat.profiles[0].first_name} ${chat.profiles[0].last_name}`;
                href = chat.profiles[0].user!.login;
            }
        }
    } else {
        room_name = chat.room.name;
    }


    let showModal = false;
</script>

<div class="chat_header">
    <Input
        bind:showInput
        bind:theme
        searchArray={chat.messages}
        bind:searchedArray={searchedMessages}
    >
    <div class="back">
        <a on:click={() => {chat.disconect()}} class="back" href="./" style="text-decoration: none;">
            {#if theme == "white"}
                <img class="nav_icon" src={arrow_left} alt="" />
            {:else}
                <img class="nav_icon" src={arrow_left_dark} alt="" />
            {/if}
            <span>Назад</span>
        </a>
    </div>
    <div class="title_box">
        <span class="title">{room_name}</span>
        {#if name.length == 1}
            <span class="count">колличество участников: {chat.count_of_profiles}</span>
        {/if}
    </div>
    <div class="info">
        <Points 
            {theme}
            bind:showInput
        />
        {#if name.length == 1}
            <button title="Показать информацию" class="model_button" on:click={() => {showModal = true}}>
                <img style="width: 100%; height: 100%" id="icon" class="avatar" src={placeholder} alt="">
            </button>
        {:else}
            <a href="/{href}" class="model_button">
                <img style="width: 100%; height: 100%" id="icon" class="avatar" src={placeholder} alt="">
            </a>
        {/if}

        <ModalChatHeader 
            bind:showModal 
            chat={chat}
            room_name={room_name} 
        />
    
    </div>
</Input>
</div>

<style lang="scss">
     .chat_header {
        border-radius: 15px 15px 0 0;
        height: 55px;
        background-color: var(--primary-head);
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .title_box {
        display: inline-flex;
        flex-direction: column;
        text-align: center;
        flex: 1 1 auto;
        margin: auto;
    }
    .title {
        font-size: 16px;
        font-weight: 700;
    }
    .count {
        font-size: 14px;
        color: var(--button-background);
    }
    .back,
    .info {
        width: 100px;
    }
    .back {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 15px;
        justify-content: space-around;
    }
    .info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 10px 15px 10px 0;
        align-items: center;
    }
    .avatar {
        border-radius: 50%;
    }
    .model_button {
        background-color: transparent; 
        border: none; 
        width:35px; 
        height:35px;
    }
    .model_button:hover {
        cursor: pointer;
    }    
</style>