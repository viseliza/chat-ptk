<script lang="ts">
    import type { PageData } from "./$types";
    import Chats from "../../lib/components/Chats.svelte";
    import type { IChatPreview } from "../../lib/types";
    import Input from "../../lib/components/Input.svelte";
    export let data: PageData;

    $: theme = data.session.theme;

    const chats = data.chats;
    let searchedChats: IChatPreview[] | string = [];
</script>

<svelte:head>
    <title>Сообщения</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <div class="title_messanger">
        <Input 
            searchArray={chats}
            bind:searchedArray={searchedChats}
            isMessager={true}
        >
        </Input>       
    </div>
    {#if !searchedChats.length}
        <Chats {theme} chats={chats}/>
    {:else if (typeof searchedChats === 'string')}
        <div class="chats" style="margin: 30px; display: flex; justify-content: center; align-items: center; height: 70vh; font-size: 20px; font-weight:700;">
            <span>{searchedChats}</span>
        </div>
    {:else}
        <Chats {theme} chats={searchedChats}/>
    {/if}
</section>

<style>
    section {
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        background-color: var(--sidebar-color);
        height: 100%;
        min-height: 94.5vh;
        border-radius: 10px;
        box-shadow: var(--box-shadow) 0px 8px 24px;
    }
    .title_messanger {
        border-radius: 10px 10px 0 0;
        height: 55px;
        display: flex;
        align-items: center;
        background-color: var(--body-color);
        justify-content: space-between;
    }   
    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
