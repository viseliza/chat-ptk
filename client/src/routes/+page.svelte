<script lang="ts">
    import type { PageData } from "./$types";
    import Schedule from "../lib/components/Schedule.svelte";
    import Replacement from "../lib/components/Replacement.svelte";

    export let data: PageData;
    
    const schedule = data.schedule;
    const replacement = data.replacement.split("\n\n");
</script>

<svelte:head>
    <title>Главная</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>Расписание</h1>
    <Schedule
        theme={data.session.theme}
        scheduleList={schedule}
        isHome={true}
    />

    <h1 style="margin-top: 50px;">Замены</h1>
    <Replacement {replacement} isHome={true} />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
    }
    h1 {
        width: 80%;
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
        text-align: left;
        padding: 20px;
        max-width: 65vh;
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }
</style>
