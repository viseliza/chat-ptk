<script lang="ts">
    import type { IMessage } from "../../types";
    import placeholder from "/images/50x50.svg";

    export let isLessThan5Minute: boolean = false;
    export let isPrevious: boolean = false;
    export let message: IMessage;
    export let isMe: boolean;
    let scroll: Element;

    const formattedTime = () => {
        return new Date(message.time).toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric"
        })
    }
</script>

<div bind:this={scroll} class="message message_{isMe} message_less_{isLessThan5Minute}_{isPrevious} message_is_read_{isMe}_{message.is_read}">
    <div class="content content_{isMe}">
        {#each message.text.split("\n") as string}
            <span class="text">{string}</span>
        {/each}
        <span style="font-size: 12px; align-self: flex-end; margin-top: 2px;">
            {formattedTime()}
        </span>
    </div>
    {#if !isPrevious || !isLessThan5Minute}
        <div class="icon icon_{isMe}">
            <img class="avatar" src={placeholder} alt="" />
        </div>
    {/if}
</div>

<style>
    .message {
        display: flex;
        flex-direction: row;
        padding: 10px 20px;
        width: 100%;
        align-self: flex-start;
    }
    .message_false.message_less_true_true {
        padding-top: 0;
        padding-left: 60px;
    }
    .message_true.message_less_true_true {
        padding-top: 0; 
        padding-right: 60px;
        border-radius: 0;
    }
    .content {
        word-wrap: break-word;
        min-width: 90px;
        max-width: 400px;
        margin: 0 10px;
        padding: 10px 15px;
        border-radius: 10px;
        background-color: var(--primary-color);
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .avatar {
        border-radius: 50%;
    }
    .icon img {
        width: 40px;
    }
    .icon_false {
        order: -1;
    }
    .text {
        word-wrap: break-word;
    }
    .message_true {
        justify-content: flex-end;
    }
    .content_true {
        background-color: var(--message-back);
    }
    .message_is_read_true_false {
        background-color: var(--message-back-shadow);
        border-radius: 5px 5px 0 0;
    }
</style>
