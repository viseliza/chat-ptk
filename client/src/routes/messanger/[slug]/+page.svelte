<script lang="ts">
    import type { PageData } from "./$types";
    import type { IMessage, IProfile } from "../../../lib/types";
    import { onMount, tick } from "svelte";
    import Chat from "../../../lib/utils/Chat";
    import ArrowDown from "../../../lib/components/Chat/ArrowDown.svelte";
    import ChatHeader from "../../../lib/components/Chat/ChatHeader.svelte";
    import ChatFooter from "../../../lib/components/Chat/ChatFooter.svelte";
    import RenderChats from "../../../lib/components/Chat/RenderChats.svelte";
    export let data: PageData;
        
    const chat = new Chat(data.chatPropertys[0]);
    
    let row = 0;
    let user_id = data.session.user_id;
	let scroll: Element;
    let isShow = false;
    let profile = chat.profiles.filter((profile: IProfile) => profile.user?.login == data.session.login)[0];
    let typing = "";
    let lastReadMessage: number;
    let unreadMessages = 0;
    let messagesPreloader = true;
    let searchedMessages: IMessage[] = [];
    let showInput = false;
    
    $: theme = data.session.theme;
    
    onMount(()=> {
        scroll.addEventListener('scroll', function() {
            if (chat.messages.length && scroll.scrollTop == 0) {
                console.log("scroll")
                row += 100;
                chat.getNextMessages(row);
            }
        })
    })


    chat.socket.on("connect", () => {

        chat.join(profile.first_name);

        chat.getNextMessages(row);
        
		chat.socket.on("getMessages", async (response: IMessage[]) => {
            messagesPreloader = false;

			chat.messages = [...chat.messages, ...response];
            
            await tick();
            
            if (!response.length) 
                row -= 100;
            if(scroll && !lastReadMessage) {
                let y = chat.readingMessages(lastReadMessage, user_id, scroll);
                Chat.scrollDown(scroll, y);
            }
        })

        chat.socket.on("message", async (message: IMessage) => {
            chat.messages = [...chat.messages, message];
            if (scroll && (message.user_id == user_id || scroll.scrollHeight - 500 > scroll.scrollTop)) {
                await tick();
                Chat.scrollDown(scroll);
            } 
        });

        chat.socket.on('typing', ({ name, isTyping }) => {
            if (isTyping) 
                typing = `${name} is typing...`
            else 
                typing = "";
        });
    });

    const scrollY = () => {
        isShow = scroll.scrollTop < scroll.scrollHeight - 1500 ? true : false;
        
        if (!lastReadMessage) 
            lastReadMessage = chat.readingMessages(lastReadMessage, user_id, scroll);
        else 
            unreadMessages = chat.readingMessages(lastReadMessage, user_id, scroll);
    }

</script>

<svelte:head>
    <title>Чат</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <ChatHeader 
        login={data.session.login}
        bind:theme
        {chat}
        bind:showInput
        bind:searchedMessages
    />
    
    <div class="chat_messages" bind:this={scroll} on:scroll={scrollY}>
        {#if messagesPreloader}
        <div class="container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        {/if}
        <RenderChats
            {chat}
            {user_id}
            {messagesPreloader}
            messages={searchedMessages.length ? searchedMessages : chat.messages}
        />
        <ArrowDown 
            element={scroll} 
            {isShow}
            countUnreadedMessages={unreadMessages}
        />
    </div>
    
    <ChatFooter 
        {user_id} 
        {theme} 
        {chat} 
        {typing}
    />

</section>

<style lang="less">
    section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        background-color: var(--sidebar-color);
        height: 100%;
        min-height: 95vh;
        border-radius: 15px;
        box-shadow: 0 0 20px var(--box-shadow);
    }

    .chat_messages {
        flex: 1 1 auto;
    }

    .chat_messages {
        display: flex;
        flex-direction: column;
        max-height: 82vh;
        overflow-y: auto;
    }

    .container {
        flex: 1 1 auto;
        align-self: stretch;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dot {
        @animation-speed: 1000ms;
        @dot-size: 10px;
        width: @dot-size;
        height: @dot-size;
        background-color: var(--button-background);
        border: (@dot-size / 5) solid var(--button-background);
        border-radius: 50%;
        float: left;
        margin: 0 (@dot-size / 2);
        transform: scale(0);
        .animation();
        &:nth-child(2) {
            .animation(@animation-speed * 0.3);
        }
        &:nth-child(3) {
            .animation(@animation-speed * 0.6);
        }
    }

    .animation(@delay: 0ms) {
        animation: fx @animation-speed ease infinite @delay;
    }

    @keyframes fx {
        50% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>