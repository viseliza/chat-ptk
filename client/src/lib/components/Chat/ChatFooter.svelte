<script lang="ts">
    import smiles from "/images/smiles.svg";
    import play from "/images/navigation.svg";
    import attachment from "/images/attachment.svg";
    import smiles_dark from "/images/smiles_dark.svg";
    import play_dark from "/images/navigation_dark.svg";
    import attachment_dark from "/images/attachment_dark.svg";
    import type Chat from "../../utils/Chat";
    import Emojies from "./Emojies.svelte";

    export let user_id: number;
    export let theme: string;
    export let typing: string;
    export let chat: Chat;

    let is_read = false;
    let isActiveSmiles = false;
    let text: string;
    let textarea: HTMLTextAreaElement;

    if (chat.count_of_profiles == 1)
        is_read = true;

    const sendMessage = () => { 
        chat.sendMessage({
            user_id,
            text,
            time: new Date().toString(),
            is_read
        });
        text = '';
    };

    function on_key_down(event: { key: string }) {
        if (event.key == "Enter") 
            sendMessage();
    }

    const handleEmojie = (event: { detail: { emojie: number } }) => {
        text = chat.addEmojieToMessage(text, textarea.selectionStart, event);
    }

</script>


<div class="chat_footer">
    {#if typing}
        <section class="typing">{typing}</section>
    {/if}
    <button title="Прикрепить файл">
        <img id="icon" class="nav_icon" src={theme == 'white' ? attachment : attachment_dark} alt="" />
    </button>
    <div class="search">
        <textarea
        on:keypress={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        }}
        placeholder="Введите сообщение..."
        bind:this={textarea}
        bind:value={text}
        on:input={() => chat.emitTyping()}
    />
    
    <Emojies
        on:emojie={handleEmojie}
        bind:isActiveSmiles={isActiveSmiles}
    />

    <button id="emojies_button" on:click={() => isActiveSmiles = !isActiveSmiles} class="search-block_{isActiveSmiles}">
        <img id="emojies_button" class="nav_icon" src={theme == 'white' ? smiles : smiles_dark} alt="">
    </button>
    </div>


    <button
        title="Отправить"
        type="submit"
        on:click={() => sendMessage()}
        on:keydown={on_key_down}
    >
        
        <img id="icon" class="nav_icon" src={theme == 'white' ? play : play_dark} alt="" />
        
    </button>
</div>

<style>
    .chat_footer {
        z-index: 2;
        position: relative;
        height: 65px;
        border-radius: 0 0 15px 15px;
        background-color: var(--body-color);
        display: flex;
        flex-direction: row;
        padding: 0 10px;
    }
    .chat_footer .nav_icon {
        width: 28px;
        height: 28px;
        margin: auto 10px;
    }
    .chat_footer button {
        display: flex;
        background-color: transparent;
        border: none;
        margin: 10px 0;
    }
    .chat_footer button:hover {
        cursor: pointer;
    }
    .chat_footer button img {
        width: 28px;
        height: 28px;
        margin: auto 10px;
    }
    .search-block_false {
        box-shadow: none;
    }
    .search-block_true img {
        border-radius: 50%;
        box-shadow: var(--message-back) 0px 5px 15px;
    }
    textarea {
        margin: 10px;
        flex: 1 1 auto;
        background-color: transparent;
        border-radius: 5px;
        border: none;
        padding: 12px 15px;
        font-size: 16px;
        color: var(--text-color);
        font-weight: 500;
        outline: none;
        resize: none;
    }
    textarea::placeholder {
        color: var(--button-background);
    }
    .typing {
        position: fixed;
        bottom: 90px;
        font-weight: 500;
    }
    .search {
        margin: 0; 
        position: relative; 
        width: 100%;
        display: flex;
    }

</style>