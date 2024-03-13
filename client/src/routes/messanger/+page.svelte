<script lang="ts" type="module">
    import placeholder from "$lib/images/50x50.svg";
    import read from "$lib/images/read.svg";
    import type { PageData } from "./$types";
    
    export let data: PageData;
    const rooms = data.user.rooms;

    function displayTime(date: Date) {
        let today = new Date();
        if ( date.toLocaleDateString() == today.toLocaleDateString() ) {
            return date.toLocaleTimeString("en-GB", { hour: "numeric", 
                        minute: "numeric"});
        } else if ( date.getFullYear() == today.getFullYear() &&
                    date.getMonth() == today.getMonth() &&
                    date.getDate() + 1 == today.getDate() 
        ) {
            return "вчера"
        } else {
            return date.toLocaleDateString();
        }
    }
</script>

<svelte:head>
    <title>Сообщения</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <div class="title_messanger">
        <span class="title">Чаты</span>
    </div>
    <div class="chats">
        {#if rooms}
            {#each rooms as room, index}
                <a href='messanger/{room.name}'><div class="chat">
                    <div class="left">
                            <img src={placeholder} alt="" />
                            <div class="info">
                                <span style="font-weight: 700;">{room.name}</span>
                                <span>
                                    {#if data.messages.length > 0}
                                        {#if data.messages[index].text.length > 55}
                                            {data.messages[index].text.slice(0, 55)}...
                                        {:else}
                                            {data.messages[index].text}
                                        {/if}
                                    {:else}
                                        тут ничего нет...
                                    {/if}
                                </span>
                            </div>
                    </div>
                    <div class="right">
                        {#if data.messages.length > 0}
                            <span>{displayTime(new Date(data.messages[index].time))}</span>
                            <img src={read} alt="" />
                        {/if}
                    </div>
                </div></a>
            {/each}
        {:else}
            <div>
                Кажестя тут ничего нет...
            </div>
        {/if}
    </div>
    <!-- ./chats -->
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
    a {
        text-decoration: none;
    }
    .chats {
        margin: 30px 10px;
    }
    .chat {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin: 10px 20px;
        height: 80px;
        background-color: var(--primary-color-light);
        border-radius: 15px;
        transition: linear 0.2s;
    }
    .chat:hover {
        background-color: var(--primary-head);
    }
    .left,
    .right {
        display: flex;
        text-align: left;
    }
    .left img {
        width: 50px;
        height: 50px;
        margin: 15px;
        border-radius: 50%;
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 5px 0;
    }
    .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin: 10px 20px;
    }
    .right img {
        height: 10px;
        width: 10px;
    }
</style>
