<script lang="ts">
    import type { PageData } from "./$types";
    import Chats from "../../lib/components/Chats.svelte";
    import type { IChatPreview } from "../../lib/types";
    import Input from "../../lib/components/Input.svelte";
    import search from "/images/search.svg";
    import search_dark from "/images/search_dark.svg";
    export let data: PageData;

    $: theme = data.session.theme;

    const chats = data.chats;
    let searchedChats: IChatPreview[] | string = [];
    let showInput: boolean = false;
</script>

<svelte:head>
    <title>Сообщения</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <div class="title_messanger">
        <Input 
            bind:showInput
            bind:theme
            searchArray={chats}
            bind:searchedArray={searchedChats}
        >
            <span class="title">Чаты</span>

            <button on:click={() => {showInput = !showInput}}>
                {#if theme == "black"}
                    <img class="nav_icon" src={search_dark} alt="">
                {:else}
                    <img class="nav_icon" src={search} alt="">
                {/if}
            </button>
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
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .title_messanger {
        border-radius: 10px 10px 0 0;
        height: 55px;
        display: flex;
        align-items: center;
        background-color: var(--body-color);
        justify-content: space-between;
    }   
    .title {
        font-size: 24px;
        font-weight: 700;
        padding-left: 30px;
        text-align: left;
        opacity: 0;
        transition: 0.5s;
        animation: show 0.5s 1;
        animation-fill-mode: forwards;
    }    
    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    button {
        background-color: transparent;
        border: none;
        margin-right: 30px;
    }
    button:hover {
        cursor: pointer;
    }
</style>
