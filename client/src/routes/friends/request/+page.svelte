<script lang="ts">
    import FriendsHeader from "../../../lib/components/Friends/FriendsHeader.svelte";
    import FriendItem from "../../../lib/components/FriendItem.svelte";
    import user_search from "/images/user_search.svg";
    import user_search_dark from "/images/user_search_dark.svg";
    import type { PageData } from "../$types";
    export let data: PageData;

    let theme = data.session.theme;

    const profilesByMe = data.profilesByMe;
    const profilesForMe = data.profilesForMe;

    let actives = {
        isAllActive: true,
        isForMeActive: false,
        isByMeActive: false
    }
    function swapActive (indexActive: number) {
        let index = 0;
        Object.keys(actives).forEach(function (active) {
            actives[active] = index == indexActive ? true : false; 
            index++;
        }); 
    }
</script>

<svelte:head>
    <title>Заявки в друзья</title>
    <meta name="description" content="SearchFriends" />
</svelte:head>


<section class="search-friends">
    <FriendsHeader
        activeRequest={true}
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <section class="filter">
        <div on:click={() => swapActive(0)} class="a-item item_{actives.isAllActive}">Все: <strong style="margin-left: 3px;">{profilesByMe.length + profilesForMe.length}</strong></div>
        <div on:click={() => swapActive(1)} class="a-item item_{actives.isForMeActive}">Полученные: <strong style="margin-left: 3px;">{profilesForMe.length}</strong></div>
        <div on:click={() => swapActive(2)} class="a-item item_{actives.isByMeActive}">Отправленные: <strong style="margin-left: 3px;">{profilesByMe.length}</strong></div>
    </section>
    <section class="friends-list">
        {#if actives.isAllActive}
            {#if !profilesByMe.length && !profilesForMe.length}
            <div>
                <img src={theme == 'white' ? user_search : user_search_dark} alt="user-add">
                <span class="friends-title">Ваш список заявок пуст</span>
                <span>Здесь будут отображаться ваши отправленные и полученные заявки в друзья.Вы можете отправлять заявки в друзья на вкладке "Найти друзей"</span>
            </div>
            {:else}
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
            {/if}
        {:else if actives.isForMeActive}
            {#if !profilesForMe.length}
            <div>
                <img class="nav_icon" src={theme == 'white' ? user_search : user_search_dark} alt="user-add">
                <span class="friends-title">Ваш список полученных заявок пуст</span>
                <span>Здесь будут отображаться ваши полученные заявки в друзья. Вы можете подождать когда кто-то отправит вам заявку на вкладке "Найти друзей" или вы можете сделать это сами</span>
            </div>
            {:else}
                {#each profilesForMe as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                            {profile}
                        />
                    {/if}
                {/each}
            {/if}
        {:else if actives.isByMeActive}
            {#if !profilesByMe.length}
            <div>
                <img src={theme == 'white' ? user_search : user_search_dark} alt="user-add">
                <span class="friends-title">Ваш список отправленных заявок пуст</span>
                <span>Здесь будут отображаться ваши отправленные заявки в друзья.Вы можете отправлять заявки в друзья на вкладке "Найти друзей"</span>
            </div>
            {:else}
                {#each profilesByMe as profile}
                {#if profile.user?.login != data.session.login}
                    <FriendItem
                        user_id={data.session.user_id}
                        {theme}
                            {profile}
                        />
                    {/if}
                {/each}
            {/if}
        {/if}
        
    </section>
</section>



<style>
    .search-friends .filter {
        display: flex;
        flex-direction: row;
        padding: 15px 30px;
    }
    .search-friends {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto 0;
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
    .friends-list {        
        display: flex;
        flex-direction: column;
        height: 72vh;
        overflow-y: auto;
    }
    .friends-list div {
        flex: 1 1 auto;
        align-items: center;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 100px;
    }
    .friends-list img {
        width: 50px;
        height: 50px;
    }
    .friends-list div span {
        font-size: 16px;
        font-weight: 500;
        margin: 0 20px;
    }
    .friends-list .friends-title {
        font-size: 18px;
        padding: 5px 0;
        font-weight: 700;
    }
    .a-item {
        display: inline-flex;
        align-items: center;
        background-color: var(--sidebar-color);
        border-radius: 10px;
        border-style: none;
        box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
        color: var(--text-color);
        font-size: 14px;
        font-weight: 500;
        height: 48px;
        justify-content: center;
        letter-spacing: .25px;
        max-width: 100%;
        padding: 2px 20px;
        transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms, color 0.2s linear;
        touch-action: manipulation;
        will-change: transform,opacity;
        margin-right: 10px;
    }
    .item_false {
        color: var(--text-color);
    }
    .item_false:hover {
        text-decoration: none;
        color: #174ea6;
        cursor: pointer;
    }
    .item_false:active {
        box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
        outline: none;
    }
    .item_true {
        color: #174ea6;
    }

</style>