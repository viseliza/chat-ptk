<script lang="ts">
    import type { PageData } from "./$types";
    import Schedule from "../lib/components/Schedule.svelte";
    import Replacement from "../lib/components/Replacement.svelte";

    export let data: PageData;

    const schedule = data.schedule.split("\n");
	const replacement = data.replacement.split("\n\n");

</script>

<svelte:head>
    <title>Главная</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>


<section>
	<h1>Расписание</h1>
    <Schedule schedule={schedule} isHome={true}/>
    
	<h1>Замены</h1>
	<Replacement replacement={replacement} isHome={true}/>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 80%;
        font-size: 28px;
        font-weight: 700;
        margin: 40px;
        text-align: left;
    }
</style>
