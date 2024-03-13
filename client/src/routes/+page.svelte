<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    const schedule = data.schedule.split("\n");
	const replacement = data.replacement.split("\n\n");
	
    const days_array = [
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
    ];

    const numbers: {[key: string]: number} = {
        "08.30-10.10": 1,
        "10.20-12.00": 2,
        "12.45-14.25": 3,
        "14.35-16.15": 4,
        "16.25-18.05": 5
    }
</script>

<svelte:head>
    <title>Главная</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Расписание</h1>
    <table>
        {#each schedule as row, index}
            {#if row}
                <tr>
                    {#if days_array.includes(row.toLowerCase().trim())}
                        <th colspan="3">{row}</th>
                    {:else if schedule[index].split(" ")[0] == schedule[index + 1].split(" | ")[0]}
                        <td style="width: 50px; text-align: center;" rowspan="2">{numbers[row.split(" | ")[0]]}</td>
                        <td class='time' rowspan="2">{row.split(" | ")[0]}</td>
                        <td>{row.split(" | ")[1]}</td>
                    {:else if schedule[index -1].split(" ")[0] == schedule[index].split(" | ")[0]}
                        <td>{row.split(" | ")[1]}</td>
                    {:else}
                        <td style="width: 50px; text-align: center;">{numbers[row.split(" | ")[0]]}</td>
                        <td class='time'>{row.split(" | ")[0]}</td>
                        <td>{row.split(" | ")[1]}</td>
                    {/if}
                </tr>
            {/if}
        {/each}
    </table>
	<h1>Замены</h1>
	<table>
        <tr>
            <td>Группа</td>
            <td>№ пары </td>
            <td>По расписанию</td>
            <td>Изменения</td>
        </tr>

        {#each replacement as row}
			{#if row}
				<tr>
					<td style="width: 90px; text-align: center;">{row.split('\n')[0]}</td>
					<td style="width: 95px; text-align: center;">{row.split('\n')[1]}</td>
					<td>{row.split('\n')[2]}</td>
                    <td>{row.split('\n')[3]}</td>
				</tr>
			{/if}
		{/each}
	</table>
</section>

<style>
    .time {
        width: 120px;
    }
    table {
        width: 800px;
        overflow: hidden;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    th,
    td {
        padding: 15px;
        background-color: var(--sidebar-color);
        color: var(--text-color);
    }
    th {
		padding: 20px;
        text-align: center;
		background-color: var(--primary-head);
    }
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
