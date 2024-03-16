<script lang="ts">
    export let schedule: string[];
    export let isHome: boolean;

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

<table>
    {#each schedule as row, index}
        {#if row}
            <tr>
                {#if days_array.includes(row.toLowerCase().trim())}
                    <th colspan="3">{row}</th>
                {:else if schedule[index + 1] && schedule[index].split(" ")[0] == schedule[index + 1].split(" | ")[0]}
                    <td style="width: 50px; text-align: center;" rowspan="2">{numbers[row.split(" | ")[0]]}</td>
                    <td class='time' rowspan="2">{row.split(" | ")[0]}</td>
                    <td>{row.split(" | ")[1]}</td>
                {:else if schedule[index - 1] && schedule[index - 1].split(" ")[0] == schedule[index].split(" | ")[0]}
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

{#if isHome}
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
</style>
{:else}
<style>
    table {
        overflow: hidden;
        margin-top: 20px;
    }
    td {
        padding: 5px 15px;
        background-color: var(--sidebar-color);
        color: var(--text-color);
    }
</style>
{/if}