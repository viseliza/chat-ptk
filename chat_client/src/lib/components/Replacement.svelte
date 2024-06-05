<script lang="ts">
    export let replacement: string[];
    export let isHome: boolean;
</script>

<table>
    {#if replacement[0] != "Расписания для колледжа ПТК на " + new Date().toLocaleDateString() + " число нет"}
        <div style="margin-top: 20px;" class="row">
            <div style="font-weight: 600;" class="row-group">Группа</div>
            <div style="font-weight: 600;" class="row-number">№ пары</div>
            <div style="font-weight: 600;" class="row-perv">По расписанию</div>
            <div style="font-weight: 600;" class="row-replace">Изменения</div>
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
        <div style="height: 150px;" class="column-none">
            <span>
                На сегодня в ПТК замен нет!
            </span>
        </div>
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
            margin: 0px auto 20px auto;
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
            max-width: 60px;
            width: 100%; 
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
        .column-none {
            display: flex;
            width: 100%;
            height: 250px;
            justify-content: center;
            align-items: center;
            font-weight: 700;
            font-size: 18px;
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
        .column-none {
            display: flex;
            width: 100%;
            height: 250px;
            justify-content: center;
            align-items: center;
            font-weight: 700;
            font-size: 18px;
        }
    </style>
{/if}
