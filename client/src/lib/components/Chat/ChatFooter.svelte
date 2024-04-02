<script lang="ts">
    import attachment from "$lib/images/attachment.svg";
    import attachment_dark from "$lib/images/attachment_dark.svg";
    import play from "$lib/images/navigation.svg";
    import play_dark from "$lib/images/navigation_dark.svg";
    import type Chat from "../../utils/Chat";

    export let user_id: number;
    export let theme: string;
    export let typing: string;
    export let chat: Chat;

    let is_read = false;
    let text: string;

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
</script>

<div class="chat_footer">
    {#if typing}
        <section class="typing">{typing}</section>
    {/if}
    <button title="Прикрепить файл">
        {#if theme == "white"}
            <img id="icon" class="nav_icon" src={attachment} alt="" />
        {:else}
            <img id="icon" class="nav_icon" src={attachment_dark} alt="" />
        {/if}
    </button>
    <textarea
        on:keypress={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        }}
        placeholder="Введите сообщение..."
        bind:value={text}
        on:input={() => chat.emitTyping()}
    />
    <button
        title="Отправить"
        type="submit"
        on:click={() => sendMessage()}
        on:keydown={on_key_down}
    >
        {#if theme == "white"}
            <img id="icon" class="nav_icon" src={play} alt="" />
        {:else}
            <img id="icon" class="nav_icon" src={play_dark} alt="" />
        {/if}
    </button>
</div>

<style>
    .chat_footer {
        z-index: 2;
        height: 65px;
        border-radius: 0 0 15px 15px;
        background-color: var(--primary-head);
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
        height: 24px;
        width: 24px;
    }
    textarea {
        margin: 10px;
        flex: 1 1 auto;
        background-color: transparent;
        border-radius: 5px;
        border: none;
        padding: 12px 15px;
        font-size: 14px;
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
</style>