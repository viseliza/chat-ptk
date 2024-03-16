<script lang="ts">
    export let replacement: string[];
    export let isHome: boolean;
</script>

<table>
    {#if replacement[0] != "Замены для выбранной группы не найдены!"}
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
    {:else}
        <tr>
            <td colspan="4" style="text-align: center;">Замены для выбранной группы не найдены!</td>
        </tr>
    {/if}
</table>

{#if isHome}
<style>
    table {
        width: 800px;
        overflow: hidden;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    td {
        padding: 15px;
        background-color: var(--sidebar-color);
        color: var(--text-color);
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