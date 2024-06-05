<script lang="ts">
    import Nav from "../lib/components/Nav.svelte";
    import { page } from "$app/stores";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    export let data: PageData;
    let theme: string = data.session.theme;
        
    onMount(() => {
        theme == "black" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
    });

</script>

{#if $page.url.pathname === "/auth"}
    <div class="auth">
        <main>
            <slot />
        </main>
    </div>
{:else}
    <div class="app">
        <Nav
            {theme}
        />
        <main>
            <slot />
        </main>
    </div>
{/if}

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        max-width: 100%;
        color: var(--text-color);
        background-image: linear-gradient(to bottom right, var(--body-color), var(--sidebar-color));
    }

    .auth {
        min-height: 100vh;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        background-image: linear-gradient(to bottom right, var(--body-color), var(--sidebar-color));
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
</style>
