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

    let reactionsObject: any[] = [];
    let reactionsResultObject: any[] = [];
    let isSelected = false;
    let isHoveredMouse = false;
    let isTempHoveredMouse = false;
    const sender = chat.profiles.filter(profile => profile.user!.id == message.user_id);

    chat.socket.on("getNewReaction", (data) => {    
        reactionsObject = data.reaction;
        formatedReactionsObject(data.message_id);
    });


    const formatedReactionsObject = (message_id = message.id) => {
        if (message_id == message.id) {
            reactionsResultObject = [];
            reactionsObject.forEach((reactionObject) => {
                const existReaction = reactionsResultObject.map(reactionObjectRow => reactionObjectRow.reaction).indexOf(reactionObject.reaction);
                const isMeSelectedThisReaction = reactionsObject.map(row => {
                    if (row.reaction == reactionObject.reaction)
                        return row.user_id == user_id ? true : false
                }).indexOf(true);
                let lastReactionsResultIndex = reactionsResultObject.length;
                if (existReaction == -1) {
                    reactionsResultObject[lastReactionsResultIndex] = { reaction: reactionObject.reaction, count: 1, isSelectedByMe: !!(isMeSelectedThisReaction != -1)};
                    lastReactionsResultIndex++;
                } else 
                    reactionsResultObject[existReaction].count += 1;
            });
        }

        reactionsResultObject.sort(function(a, b) {
            if (a.isSelectedByMe == true)
                return -1;
            if (b.isSelectedByMe == true)
                return 1;
            return 0;
        });
    }


    reactionsObject = message.reactions ?? [];
    formatedReactionsObject();


    const formattedTime = () => {
        return new Date(message.time).toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
        });
    };

    const select = () => {
        isSelected = !isSelected;
        selectedMessagesCount += isSelected ? +1 : -1;
    };


    const handleReaction = async (event: { detail: { reaction: number } }) => {
        const isAlreadySelected = reactionsObject.map(row => row.user_id).indexOf(user_id);
        let deleted: { user_id: number, reaction: number }[] = [];

        if (isAlreadySelected != -1)
            deleted = reactionsObject.splice(isAlreadySelected, 1);
        
        if (isAlreadySelected == -1 || (deleted[0].reaction && deleted[0].reaction != event.detail.reaction)) 
            reactionsObject.push({ user_id, reaction: event.detail.reaction });
        
        formatedReactionsObject();
        chat.changeReactions(reactionsObject, message.id);
    }

    const handlerOnMouseEnter = async () => {
        isTempHoveredMouse = true;
        setTimeout(() => {
            if (isTempHoveredMouse)
                isHoveredMouse = true;
        }, 700);
    }    
    
    const handlerOnMouseLeave = async () => {
        isTempHoveredMouse = false;
        isHoveredMouse = false;
    }

    const handlerReactionClick = (eventParent: { target: any; }) => {
        let reaction = eventParent.target;
        if (reaction.className.includes('reaction reaction_')) 
            reaction = reaction.outerText;
        else if (reaction.className.includes('emojie')) 
            reaction = reaction.innerText;
        
        const event: any = { detail: { reaction: reaction.codePointAt(0) } };
        handleReaction(event);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:contextmenu={select}
    class="message message_{isMe} 
    message_less_{isLessThan5Minute}_{isPrevious} 
    message_is_read_{isMe}_{message.is_read}"
>
    <div 
        on:mouseenter={handlerOnMouseEnter}
        on:mouseleave={handlerOnMouseLeave}
        class="message-content"
    >
        {#if isMe && isHoveredMouse}
            <Reaction 
                on:reaction={handleReaction} 
                {isMe} 
            />
        {/if}
        {#if !isMe && (!isLessThan5Minute || !isPrevious)}
            <div class="data">
                <a href="@{sender[0].user?.login}">{sender[0].last_name} {sender[0].first_name}</a>
            </div>
        {/if}
        <div class="content content_{isMe}">
            {#each message.text.split("\n") as string}
                <span class="text">{string}</span>
            {/each}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="bottom">
                {#if isMe}
                    <div class="reactions reactions_{reactionsObject.length > 0}">
                        {#each reactionsResultObject as reactionObject}
                            <div 
                                class="reaction reaction_{reactionObject.isSelectedByMe}" 
                                on:click={handlerReactionClick}
                            >
                                <div class="emojie">
                                    {String.fromCodePoint(reactionObject.reaction)}
                                </div>
                                {#if reactionObject.count != 1}
                                    <div class="reaction_count">
                                        {reactionObject.count}
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
                    <div class="reactions reactions_{reactionsObject.length > 0}">
                        {#each reactionsResultObject as reactionObject}
                            <div 
                            on:click={handlerReactionClick}
                            class="reaction reaction_{reactionObject.isSelectedByMe}"
                            >
                                <div class="emojie">
                                    {String.fromCodePoint(reactionObject.reaction)}
                                </div>
                                {#if reactionObject.count != 1}
                                    <div class="reaction_count">
                                        {reactionObject.count}
                                    </div>
                                {/if}
                            </div>

                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        {#if !isMe && isHoveredMouse}
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
        font-size: 12px;
        align-self: flex-end;
        margin-left: 2px;
        margin-right: 15px;
    }

    .time_true {
        font-size: 12px;
        align-self: flex-end;
        margin-top: 2px;
        margin-left: 10px;
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
        display: flex;
    }
    .reactions .reactions_false {
        display: none;
    }
    .reaction  {
        display: flex;
        padding: 5px 10px;
        box-shadow: var(--box-shadow) 0px 8px 24px;
        border: 1px solid var(--reaction-back);
        border-radius: 15px;
        margin-right: 5px;
        justify-content: center;
        align-items: center;
        transition: background-color 0.5s ease;
    }
    .reactions .reaction:hover {
        cursor: pointer;
        background-color: var(--reaction-back-shadow);
    }
    .reactions .reaction_true {
        background-color: var(--reaction-back);
    }
    .reactions_true .reaction_count {
        margin-left: 5px;
    }
</style>
