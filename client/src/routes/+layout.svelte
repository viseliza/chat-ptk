<script lang="ts">
    import Nav from "../lib/components/Nav.svelte";
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";
    
    if (!$page.data.session && $page.url.pathname != "/auth") {
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
        background-image: linear-gradient(to bottom right, var(--body-color), var(--primary-color));
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
