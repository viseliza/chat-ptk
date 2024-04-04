<script lang="ts">
    import arrow_left from "/images/arrow-left.svg";
    import arrow_left_dark from "/images/arrow-left_dark.svg";
    import type { PageData } from "../$types";
    import FriendItem from "../../../lib/components/FriendItem.svelte";
    export let data: PageData;

    let theme = data.session.theme;

    const profilesByMe = data.profilesByMe;
    const profilesForMe = data.profilesForMe;
</script>

<svelte:head>
    <title>Поиск друзей</title>
    <meta name="description" content="SearchFriends" />
</svelte:head>


<section class="search-friends">
    <section>
        <div class="back">
            <a class="back" href="./" style="text-decoration: none;">
                {#if theme == "white"}
                    <img class="nav_icon" src={arrow_left} alt="" />
                {:else}
                    <img class="nav_icon" src={arrow_left_dark} alt="" />
                {/if}
                <span>Назад</span>
            </a>
        </div>
    </section>
    <section class="friends-list">
            {#each profilesByMe as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                        {profile}
                    />
                {/if}
            {/each}
            {#each profilesForMe as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                        {profile}
                    />
                {/if}
            {/each}
    </section>
</section>



<style>
    .search-friends {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        height: 100%;
        min-height: 95vh;
    }
    .search-friends section {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }    
    .back {
        width: 100px;
    }
    .back {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .back img{
        margin-right: 5px;
    }
    .friends-list {        
        display: flex;
        flex-direction: column;
        height: 85vh;
        overflow-y: auto;
    }
</style>