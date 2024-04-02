<script lang="ts">
    import type { IChatPreview } from "../types";
    import placeholder from "$lib/images/50x50.svg";
    import read from "$lib/images/read.svg";

    export let chats: IChatPreview[];
</script>

<div class="chats">
    {#if chats}
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
        <div>Кажестя тут ничего нет...</div>
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
</style>
