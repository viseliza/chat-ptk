<script lang="ts">
    export let activeMyFriends: boolean = false;
    export let activeRequest: boolean = false;
    export let activeSearch: boolean = false;
</script>


<section class="friends-header">
    <div class="friends-left">
        {#if activeMyFriends}
            <div class="active a-item">
                <span>Мои друзья</span>
            </div>
        {:else}
            <a class="request a-item" href="/friends/">Мои друзья</a>
        {/if}

        {#if activeRequest}
            <div style="margin-left: 5px;" class="active a-item">
                <span>Мои заявки</span>
            </div>
        {:else}
            <a style="margin-left: 5px;" class="request a-item" href="/friends/request">Мои заявки</a>
        {/if}
    </div>
    
    {#if activeSearch}
        <div class="active a-item">
            <span>Найти друзей</span>
        </div>
    {:else}
        <a class="a-item" href="/friends/search">Найти друзей</a>
    {/if}
</section>


<style>
    .friends-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 20px 30px;
        display: flex;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }

    .friends-header .a-item {
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
    }

    .friends-header a {
        cursor: pointer;
    }

    .friends-header a:hover {
        text-decoration: none;
        color: #174ea6;
    }

    .friends-header a:active {
        box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
        outline: none;
    }
    .active {
        padding: 15px;
        height: 48px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .active span {
        color: #174ea6;
    }
</style>