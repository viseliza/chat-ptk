<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import user from "/images/user.svg";
    import user_dark from "/images/user_dark.svg";
    import home from "/images/home.svg";
    import home_dark from "/images/home_dark.svg";
    import messages from "/images/messages.svg";
    import messages_dark from "/images/messages_dark.svg";
    import friends from "/images/friends.svg";
    import friends_dark from "/images/friends_dark.svg";
    import swapTheme from "../utils/swapTheme";
    
    let theme = $page.data.session.theme;
   
    onMount(() => {
        theme == "black" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
    });

    function changeTheme() {
        setTimeout(async () => {
            theme = await swapTheme(theme, $page.data.session.user_id);
        }, 100)
    }
</script>

<nav class="sidebar">
    <header>
        <div class="image-text">
            <span class="image" />

            <div class="text logo-text">
                <span class="name" />
                <span class="profession" />
            </div>
        </div>
    </header>
    <!-- ./header -->

    <div class="menu-bar">
        <div class="menu">
            <ul class="menu-links">
                <li class="nav-link">
                    <a href="/">
                        {#if theme != "black"}
                            <img id="icon" class="nav_icon" src={home} alt="home" />
                        {:else}
                            <img id="icon" class="nav_icon" src={home_dark} alt="home" />
                        {/if}
                        <span class="tooltip-text">Главная</span>
                    </a>
                </li>
                <!-- ./nav-link -->
                <li class="nav-link">
                    <a href="/messanger">
                        {#if theme != "black"}
                            <img id="icon" class="nav_icon" src={messages} alt="message" />
                        {:else}
                            <img id="icon" class="nav_icon" src={messages_dark} alt="message" />
                        {/if}
                        <span class="tooltip-text">Сообщения</span>
                    </a>
                </li>
                <li class="nav-link">
                    <a href="/friends">
                        {#if theme != "black"}
                            <img id="icon" class="nav_icon" src={friends} alt="friends" />
                        {:else}
                            <img id="icon" class="nav_icon" src={friends_dark} alt="friends" />
                        {/if}
                        <span class="tooltip-text">Друзья</span>
                    </a>
                </li>
            </ul>
            <!-- ./menu-links -->
        </div>
        <!-- ./menu -->

        <div class="bottom-content">
            <li class="">
                <a href="/{$page.data.session.login}">
                    {#if theme != "black"}
                        <img id="icon" class="nav_icon" src={user} alt="user" />
                    {:else}
                        <img id="icon" class="nav_icon" src={user_dark} alt="user" />
                    {/if}
                    <span class="tooltip-text">Профиль</span>
                </a>
            </li>

            <li class="mode">
                <div class="sun-moon">
                    <i class="bx bx-moon icon moon" />
                    <i class="bx bx-sun icon sun" />
                </div>

                <div class="toggle-switch">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span
                        on:click={() => changeTheme()}
                        class="switch"
                        role="button"
                        tabindex={0}
                    />
                </div>
            </li>
            <!-- ./mode -->
        </div>
        <!-- ./botton-content -->
    </div>
    <!-- ./menu-bar -->
</nav>

<style>
    /* ===== Sidebar ===== */
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 88px;
        padding: 10px 14px;
        background: var(--sidebar-color);
        transition: var(--tran-05);
        z-index: 100;
    }

    /* ===== Reusable code - Here ===== */
    .sidebar li {
        height: 50px;
        list-style: none;
        display: flex;
        align-items: center;
        margin-top: 10px;
    }

    .sidebar header .image,
    .sidebar .icon {
        min-width: 60px;
        border-radius: 6px;
    }

    .sidebar .icon {
        min-width: 60px;
        border-radius: 6px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .sidebar .text,
    .sidebar .icon {
        color: var(--text-color);
        transition: var(--tran-03);
    }

    .sidebar .text {
        font-size: 17px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 1;
    }

    /* =========================== */

    .sidebar header {
        position: relative;
    }

    .sidebar header .image-text {
        display: flex;
        align-items: center;
    }
    .sidebar header .logo-text {
        display: flex;
        flex-direction: column;
    }
    header .image-text .name {
        margin-top: 2px;
        font-size: 18px;
        font-weight: 600;
    }

    header .image-text .profession {
        font-size: 16px;
        margin-top: -2px;
        display: block;
    }

    .sidebar header .image {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sidebar header .image img {
        width: 40px;
        border-radius: 50%;
    }

    .sidebar li a {
        list-style: none;
        height: 100%;
        background-color: transparent;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        border-radius: 6px;
        text-decoration: none;
        transition: var(--tran-03);
    }

    .sidebar li a:hover {
        background-color: var(--primary-color);
    }
    .sidebar li a:hover .icon,
    .sidebar li a:hover .text {
        color: var(--sidebar-color);
    }

    .sidebar li a img {
        margin: auto;
    }

    body.dark .sidebar li a:hover .icon,
    body.dark .sidebar li a:hover .text {
        color: var(--text-color);
    }

    .tooltip-text {
        visibility: hidden;
        position: absolute;
        z-index: 1;
        width: 100px;
        color: white;
        font-weight: 500;
        font-size: 12px;
        margin-left: 70px;
        background-color: var(--tooltip);
        border-radius: 10px;
        padding: 10px 20px 10px 15px;
    }

    li a:hover .tooltip-text {
        visibility: visible;
    }

    .sidebar .menu-bar {
        height: 97%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
    }
    .menu-bar::-webkit-scrollbar {
        display: none;
    }
    .sidebar .menu-bar .mode {
        border-radius: 6px;
        background-color: var(--primary-color-light);
        position: relative;
        transition: var(--tran-05);
    }

    .menu-bar .mode .sun-moon {
        height: 50px;
        width: 60px;
    }

    .mode .sun-moon i {
        position: absolute;
    }
    .mode .sun-moon i.sun {
        opacity: 0;
    }
    body.dark .mode .sun-moon i.sun {
        opacity: 1;
    }
    body.dark .mode .sun-moon i.moon {
        opacity: 0;
    }

    .menu-bar .bottom-content .toggle-switch {
        position: absolute;
        right: 0;
        height: 100%;
        min-width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
    }
    .toggle-switch .switch {
        position: relative;
        height: 22px;
        width: 40px;
        border-radius: 25px;
        background-color: var(--toggle-color);
        transition: var(--tran-05);
        cursor: pointer;
    }

    .switch::before {
        content: "";
        position: absolute;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        top: 50%;
        left: var(--left);
        transform: translateY(-50%);
        background-color: var(--sidebar-color);
        transition: var(--tran-04);
    }

</style>
