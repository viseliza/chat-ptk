<script lang="ts">
    import type { IMessage } from "../../types";
    import type Chat from "../../utils/Chat";
    import Reaction from "./Reaction.svelte";
    import placeholder from "/images/50x50.svg";

    export let isLessThan5Minute: boolean = false;
    export let selectedMessagesCount: number;
    export let isPrevious: boolean = false;
    export let message: IMessage;
    export let user_id: number;
    export let isMe: boolean;
    export let chat: Chat;

    let reactions: number[] = [];
    let reactionsCount: number[] = [];
    let reactionsResultObject: any[] = [];
    let lastReactionIndex = 0;
    let isSelected = false;
    let isSelectedReaction: boolean = false;

    chat.socket.on('getNewReaction', (data) => {
        console.log(data)
    })

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

    const pushEmojieOnArrays = (indexReaction: number, reaction: number) => {
        if (indexReaction == -1) {
            reactions[lastReactionIndex] = reaction;
            reactionsCount[lastReactionIndex] = 1;
            lastReactionIndex++;
        } else
            reactionsCount[indexReaction] += 1;
        
        reactionsResultObject.push({ user_id, reaction });
        chat.addReaction(reactionsResultObject, message.id);
    }


    const handleReaction = async (event: { detail: { reaction: number } }) => {
        let reaction = event.detail.reaction;
        let indexReaction = reactions.indexOf(reaction);
        
        if (!reactionsResultObject.length) {
            pushEmojieOnArrays(indexReaction, reaction);
        } else { 
            let isDeleted = false;
            isSelectedReaction = false;
            reactionsResultObject.filter((reactionObject) => {
                if (reactionObject.user_id == user_id && !isSelectedReaction) {
                    let prevIndexReaction = reactions.indexOf(reactionObject.reaction);
                    reactionObject.reaction = reaction;
                    isSelectedReaction = true;
                    lastReactionIndex--;
                    reactionsResultObject.splice(prevIndexReaction, 1);

                    if (reactionsCount[prevIndexReaction] == 1) {
                        reactionsCount.splice(prevIndexReaction, 1);
                        let deleted = reactions.splice(prevIndexReaction, 1);
                        if (deleted[0] == reaction) {
                            // isSelectedReaction = false;
                            isDeleted = true;
                            if (!reactions.length) 
                                reactions = [];
                            if (!reactionsResultObject.length)
                                reactionsResultObject = [];
                        }
                    } else
                        reactionsCount[prevIndexReaction] -= 1;

                    if (!isDeleted)
                        pushEmojieOnArrays(indexReaction, reaction);
                }
            });
            
            if(!isSelectedReaction && !isDeleted)
                pushEmojieOnArrays(indexReaction, reaction);

            // console.log(reaction)
            // console.log(reactionsResultObject)
        }
        // const response = await fetch(`https://viseliza.site/api/messages/${message.id}`, {
        //     method: "PATCH",
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({
        //         text: "123",
        //         is_read: message.is_read,
        //         reactions: reactionsResultObject
        //     })
        // })
        // console.log(await response.json())
    }

    $: console.log(reactions)
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
                    <div class="reactions reactions_{reactions.length > 0}">
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
                    <div class="reactions reactions_{reactions.length > 0}">
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
        font-size: 15px;
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
    .reactions .reactions_true {
        display: block;
    }
    .reactions .reactions_false {
        display: none;
    }
    .reactions_true .reaction {
        display: flex;
        padding: 5px 10px;
        background-color: var(--primary-color-light);
        border-radius: 15px;
        margin-right: 10px;
        justify-content: center;
        align-items: center;
    }
    .reactions_true .reaction_count {
        margin-left: 5px;
    }
</style>
