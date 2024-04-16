<script lang="ts">
    export let replacement: string[];
    export let isHome: boolean;
</script>

<table>
    {#if replacement[0] != "На сегодня замен в вашей группе нет"}
        <div style="margin-top: 20px;" class="row">
            <div class="row-group">Группа</div>
            <div class="row-number">№ пары</div>
            <div class="row-perv">По расписанию</div>
            <div class="row-replace">Изменения</div>
        </div>

        {#each replacement as row}
            {#if row}
                <div class="row">
                    <div class="row-group">{row.split("\n")[0]}</div>
                    <div class="row-number">{row.split("\n")[1]}</div>
                    <div class="row-perv">{row.split("\n")[2]}</div>
                    <div class="row-replace">{row.split("\n")[3]}</div>
                </div>
            {/if}
        {/each}
    {:else}
        <tr>
            <td colspan="4" style="text-align: center;"
                >На сегодня замен в вашей группе нет</td
            >
        </tr>
    {/if}
</table>

{#if isHome}
    <style>
        table {
            overflow: hidden;
            display: flex;
            flex-direction: column;
            max-width: 65vh;
            width: 100%;
            margin: 10px auto 50px auto;
            border-radius: 10px;
            box-shadow: 0 0 20px var(--box-shadow);
            background-color: var(--sidebar-color);
        }
        .row {
            display: flex;
            flex-direction: row;
            margin: 0 20px 20px 20px;
            border-radius: 10px;
            box-shadow: var(--box-shadow) 0px 2px 8px 0px;
            background-color: var(--sidebar-color);
            padding: 15px;
        }
        .row-group {
            width: 70px; 
            text-align: center;
        }
        .row-number {
            width: 90px; 
            text-align: center;
        }
        .row-perv {
            width: 180px;
        }
        .row-replace {
            width: 200px;
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
