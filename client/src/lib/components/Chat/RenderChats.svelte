<script lang="ts">
    import type { IMessage } from "../../types";
    import type Chat from "../../utils/Chat";
    import Message from "./Message.svelte";

    export let user_id: number;
    export let messagesPreloader: boolean;
    export let chat: Chat;
    export let messages: IMessage[];
</script>

{#if messages.length != 0 && typeof messages !== 'string'}
    {#each messages as message, index}
        {#if index == 0 || (index > 0 && chat.isNextDate(message.time, messages[index - 1].time))}
            <section class="date">
                <span>{new Date(message.time).toLocaleDateString()}</span>
            </section>
        {/if}
        {#if index == 0}
            <Message isMe={message.user_id == user_id} {message} />
        {:else}
            <Message
                isLessThan5Minute={chat.isLessThan5Minute(
                    message.time,
                    messages[index - 1].time,
                )}
                isPrevious={message.user_id == messages[index - 1].user_id}
                isMe={message.user_id == user_id}
                {message}
            />
        {/if}
    {/each}
{:else if !messages.length && !messagesPreloader}
    <span
        style="display: flex; justify-content: center; align-items: center; flex: 1 1 auto;"
    >
        Кажется, здесь ничего нет...
    </span>
{:else if  typeof messages === 'string'}
<div class="chats" style="margin: 30px; display: flex; justify-content: center; align-items: center; height: 70vh; font-size: 16px;">
    <span>{messages}</span>
</div>
{/if}

<style>
    .date {
        margin: 25px 0 15px 0;
        display: block;
        min-height: 20px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        box-shadow: none;
    }
    .date:nth-child(1) {
        margin: 10px 0;
    }

    .date > span {
        position: relative;
        display: inline-block;
    }
	
    .date > span:before,
    .date > span:after {
        content: "";
        position: absolute;
        top: 50%;
        width: 9999px;
        height: 1px;
        background: var(--button-background);
    }

    .date > span:before {
        right: 100%;
        margin-right: 15px;
    }

    .date > span:after {
        left: 100%;
        margin-left: 15px;
    }
</style>
