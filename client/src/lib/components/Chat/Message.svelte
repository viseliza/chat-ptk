<script lang="ts">
    import type { IMessage } from "../../types";
    import Reaction from "./Reaction.svelte";
    import placeholder from "/images/50x50.svg";

    export let isLessThan5Minute: boolean = false;
    export let isPrevious: boolean = false;
    export let message: IMessage;
    export let isMe: boolean;
    export let selectedMessagesCount: number;
    
    let reactions: number[] = [];
    let reactionsCount: number[] = [];
    let lastReactionIndex = 0;
    let isSelected = false;
    let isSelectedReaction: boolean;
    if (message.reactions) {
        Object.keys(message.reactions).forEach((key) => {
            // if(isMe && key == message.user_id)
            console.log(key, message.reactions[key])
        })
    }
    console.log(message)
    

    const formattedTime = () => {
        return new Date(message.time).toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric"
        })
    }

    const select = () => {
        isSelected = !isSelected;
        selectedMessagesCount += isSelected ? + 1 : - 1;
    }

    const handleReaction = async (event: { detail: { reaction: number } }) => {
        let reaction = event.detail.reaction;
        let isIndexReaction = reactions.indexOf(reaction);
        if (isIndexReaction != -1) {
            reactionsCount[isIndexReaction] += 1;
        } else {
            reactions[lastReactionIndex] = reaction;
            reactionsCount[lastReactionIndex] = 1;
            lastReactionIndex++;
            await fetch("https://viseliza.site/api/replacement/", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    date: this.date.toLocaleDateString("ru"),
                    text: await this.parseReplacement()
                })
            })
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    on:contextmenu={select} 
    class="message message_{isMe} 
    message_less_{isLessThan5Minute}_{isPrevious} 
    message_is_read_{isMe}_{message.is_read}"
>

    <div class="message-content">
        {#if isMe}
            <Reaction
                on:reaction={handleReaction}
                {isMe}
            />
        {/if}
        {#if !isMe && (!isLessThan5Minute || !isPrevious)}
            <div class="data">
                <a href="#">Иванов Владислав</a>
            </div>
        {/if}
        <div class="content content_{isMe}">
            {#each message.text.split("\n") as string}
                <span class="text">{string}</span>
            {/each}
            <div class="bottom">
                {#if isMe}
                    <div class="reactions">
                        {#each reactions as reaction, index}
                            <div class="reaction">
                                <div class="emojie">
                                    {String.fromCodePoint(reaction)}
                                </div>
                                {#if reactionsCount[index] != 1}
                                    <div class="reaction_count">
                                        {reactionsCount[index]}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
                <span class="time time_{isMe}">
                    {formattedTime()}
                </span>
                {#if !isMe}
                    <div class="reactions">
                        
                    </div>
                {/if}
            </div>
        </div>
    {#if !isMe}
        <Reaction
            on:reaction={handleReaction}
            {isMe}
        />
    {/if}
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
    .time_false {
        align-self: flex-start;
    }

    .time {
        font-size: 12px; 
        align-self: flex-end; 
        margin-top: 2px;
    }
   
    .message-content {
        display: flex;
        position: relative;
        flex-direction: column;
    }
    .data {
        font-size: 14px;
        margin: 0 10px 5px 10px;
        font-weight: 500;
    }
    .bottom {
        display: flex;
        justify-content: space-between;
    }
    .reactions {
        display: flex;
        font-size: 14px;
        margin-top: 6px;
    }
    .reactions .reaction {
        display: flex;
        padding: 5px 10px;
        background-color: var(--box-shadow);
        border-radius: 15px;
        margin-right: 10px;
    }
</style>
