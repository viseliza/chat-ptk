<script lang="ts">
    import type { IChatPreview } from "../types";
    import placeholder from "/images/50x50.svg";
    import read from "/images/read.svg";
    import message_search from '/images/message_search.svg';
    import message_search_dark from '/images/message_search_dark.svg';

    export let chats: IChatPreview[];
    export let theme: string;
</script>

<div class="chats">
    {#if chats.length}
        {#each chats as chat}
            <a href="messanger/{chat.id}"
                ><div class="chat">
                    <div class="left">
                        <img src={placeholder} alt="" />
                        <div class="info">
                            <span style="font-weight: 700;">{chat.name}</span>
                            <span>
                                {#if chat.messages[0]}
                                    {chat.messages[0].text}
                                {:else}
                                    тут ничего нет...
                                {/if}
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        {#if chat.messages[0]}
                            {#if !chat.messages[0].is_read}
                            <span>{chat.messages[0].time}</span>
                            <img src={read} alt="" />
                            {:else}
                            <span style="margin-bottom: 20px">{chat.messages[0].time}</span>
                            {/if}
                        {/if}
                    </div>
                </div></a
            >
        {/each}
    {:else}
        <div class="chats-none">
            <img class="nav_icon" src={theme == 'white' ? message_search : message_search_dark} alt="">
            <span>Ваш список переписок пуст</span> 
            <span style="font-size: 16px; font-weight: 500; width: 430px; text-align: center">Вы можете найти друзей на вкладке найти друзей, Вы можете общаться со своими друзьями в этом разделе!</span> 
        </div>
    {/if}
</div>

<style>
    a {
        text-decoration: none;
    }
    .chats {
        margin: 30px 10px;
    }
    .chat {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin: 10px 20px;
        height: 80px;
        background-color: var(--primary-color-light);
        border-radius: 15px;
        transition: linear 0.2s;
    }
    .chat:hover {
        background-color: var(--primary-head);
    }
    .left,
    .right {
        display: flex;
        text-align: left;
    }
    .left img {
        width: 50px;
        height: 50px;
        margin: 15px;
        border-radius: 50%;
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 7px 0;
    }
    .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin: 10px 20px;
    }
    .right img {
        height: 10px;
        width: 10px;
    }
    .chats-none {
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
    }
    .chats-none img {
        width: 50px;
        height: 50px;
        margin-bottom: 5px;
    }
</style>
