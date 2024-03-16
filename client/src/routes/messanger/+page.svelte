<script lang="ts">
    import type { PageData } from "./$types";
    import Chats from "../../lib/components/Chats.svelte";
    
    export let data: PageData;
    const chats = data.chats;
</script>

<svelte:head>
    <title>Сообщения</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <div class="title_messanger">
        <span class="title">Чаты</span>
    </div>
    <Chats chats={chats}/>
</section>

<style>
    section {
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        background-color: var(--sidebar-color);
        height: 100%;
        min-height: 95vh;
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .title_messanger {
        border-radius: 15px 15px 0 0;
        height: 6vh;
        display: flex;
        align-items: center;
        background-color: var(--primary-head);
    }
    .title {
        font-size: 24px;
        font-weight: 700;
        padding-left: 3vw;
        text-align: left;
    }
</style>
