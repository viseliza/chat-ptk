<script lang="ts">
    import { page } from "$app/stores";
    import Nav from "../lib/components/Nav.svelte";
    import { redirect } from "@sveltejs/kit";
    if (!$page.data.user && $page.url.pathname != "/auth") {
        throw redirect(302, "/auth");
    }
</script>

{#if $page.url.pathname === "/auth"}
    <div class="auth">
        <main>
            <slot />
        </main>
    </div>
{:else}
    <div class="app">
        <Nav />

        <main>
            <slot />
        </main>
        {#if !$page.url.pathname.includes("/messanger")} 
            <footer>
                <div class="footer">
                    <div class="row">
                        <a target="_blank" href="https://vk.com/novsuru"><i class="fa fa-vk" /></a>
                        <a target="_blank" href="https://t.me/news_novsu"><i class="fa fa-telegram" /></a>
                        <a target="_blank" href="https://www.youtube.com/@novsu_ru"><i class="fa fa-youtube" /></a>
                        <a target="_blank" href="https://novsu.ru"><i class="fa fa-google" /></a>
                    </div>
            
            
                    <div class="row">
                        INFERNO Copyright © 2024 Inferno - All rights reserved || Designed
                        By: Mahesh
                    </div>
                </div>
            </footer>
        {/if}
    </div>
{/if}

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        color: var(--text-color);
    }

    .auth {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem 1rem 0 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .footer {
        margin-top: 2rem;
        background: #000;
        padding: 30px 0px;
        font-family: "Play", sans-serif;
        text-align: center;
    }

    .footer .row {
        width: 100%;
        margin: 1% 0%;
        padding: 0.6% 0%;
        color: gray;
        font-size: 0.8em;
    }

    .footer .row a {
        text-decoration: none;
        color: gray;
        transition: 0.5s;
    }

    .footer .row a:hover {
        color: #fff;
    }

    .footer .row a i {
        font-size: 2em;
        margin: 0% 1%;
    }

    @media (max-width: 720px) {
        .footer {
            text-align: left;
            padding: 5%;
        }

        .footer .row a i {
            margin: 0% 3%;
        }
    }
</style>
