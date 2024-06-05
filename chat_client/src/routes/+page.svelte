<script lang="ts">
    import type { PageData } from "./$types";
    import Schedule from "../lib/components/Schedule.svelte";
    import Replacement from "../lib/components/Replacement.svelte";
    import DropDown from "../lib/components/DropDown.svelte";

    export let data: PageData;
    
    let theme = data.session.theme;
    let schedule: any;
    let replacement: any;
    let groups: any[];
    let valueReportParam: string = "";
    let valueReportTable: string = "Таблица";
    let valueReplacement: string = "";
    let aElem: HTMLAnchorElement;
    let messageReprot: any = {};
    let messageUpdateSchedule: any = {};
    let messageUpdateReplacement: any = {};
    
    $: messageReprot && clearMessage("report");
    $: messageUpdateSchedule && clearMessage("updateSchedule");
    $: messageUpdateReplacement && clearMessage("updateReplacement");

    const clearMessage = (item: string) => {
        setTimeout(() => {
            switch (item) {
                case "report":
                    messageReprot = {}
                    break;
                case "updateSchedule":
                    messageUpdateSchedule = {}
                    break;
                case "updateReplacement":
                    messageUpdateReplacement = {}
                    break;
                default: 
                    break;
            }
        }, 10000)
    }

    const role = data.session.role;
    if (role !== "ADMIN") {
        schedule = data.schedule;
        replacement = data.replacement!.split("\n\n");
    } else {
        groups = data.groups;
    }

    if (role == "ADMIN") {
        groups = data.groups.map((group: any) => {
            return group.name;
        });
    }

    const tables = ['Расписания', 'Замены'];

    $: valueReportTable != "Таблица" && helperReport();

    const helperReport = () => {
        if (valueReportTable == tables[0]) 
            valueReportParam = "Группа";
        else if (valueReportTable == tables[1])
            valueReportParam = "";
    }

    const handlerOnClickGetReport = async () => {
        if (valueReportTable != "Таблица") {
            let table: string = "";
            if (valueReportTable == tables[0] && valueReportParam != 'Группа') 
                table = "schedule"
            else if (valueReportTable == tables[1] && new Date(valueReportParam.split('.')[1] + "." + valueReportParam.split('.')[0] + "." + valueReportParam.split('.')[2]).toString() != "Invalid Date")
                table = "replacement";
            else {
                messageReprot = { type: "Ошибка", message: "Вы не выбрали таблицу!" }
                return 0;
            }


            const url = `https://chat-ptk.viseliza.site/api/admin/${table}/${valueReportParam}`;
            if (table) {
                const res = await fetch(`https://chat-ptk.viseliza.site/api/report/${table}/${valueReportParam}`);
                const isExist = await res.text();
                if (isExist.indexOf('statusCode') === -1) {
                    const response = await fetch(url);
                    const buffer = await response.json();	
                    aElem = document.createElement('a');
                    document.body.append(aElem);
                    aElem.href = window.URL.createObjectURL(new Blob([new Uint8Array(buffer.data).buffer]));;
                    aElem.setAttribute('download', `${valueReportTable}.${valueReportParam}.pdf`)
                    aElem.click();
                    aElem.remove();
                } else
                    messageReprot = { type: "Ошибка", message: table == tables[0] ? "Расписание" : "Замены" + " по таким параметрам не найдено!" }
            } else
                messageReprot = { type: "Ошибка", message: "Неверный формат!" }
        } else 
            messageReprot = { type: "Ошибка", message: "Вы не выбрали таблицу!" }
    }

    const handlreOnClickUpdateSchedule = async () => {
        const response = await fetch('https://chat-ptk.viseliza.site/api/admin/update/schedule');
        const success = await response.json();
        messageUpdateSchedule = { type: "Успешно", message: "Расписания и группы преподавателей успешно обновлены." }
    }

    const handlreOnClickUpdateReplacement = async () => {
        if (new Date(valueReplacement.split('.')[1] + "." + valueReplacement.split('.')[0] + "." + valueReplacement.split('.')[2]).toString() != "Invalid Date") {
            const response = await fetch(`https://chat-ptk.viseliza.site/api/admin/update/replacement/${valueReplacement}`);
            const replacementUpdated = await response.json();
            messageUpdateReplacement = { type: "Успешно", message: "Замены на выбранный день обновлены" }
        } else 
            messageUpdateReplacement = { type: "Ошибка", message: "Неверный формат даты!" }
    }
</script>

<svelte:head>
    <title>Главная</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    {#if data.session.role !== "ADMIN"}
        <h1>Расписание</h1>
        <Schedule
            {theme}
            scheduleList={schedule}
            isHome={true}
            {role}
        />

        <h1 style="margin-top: 50px;">Замены</h1>
        <Replacement {replacement} isHome={true} />
    {:else}
        <h1>Получение отчета</h1>
        <section class="block">
            <div class="desription">
                <b>Описание</b>: скачивает отчет в формате pdf, либо <b>расписания</b> с <b>выбранной группой</b>, либо <b>замены</b> с выбранной <b>датой</b>
            </div>
            <div class="variables">
                <br/>
                <b>Перменные</b>: таблица: расписание/замены, параметр: группа/дата
            </div>
        </section>
        <section class="items">
            <DropDown
                groups={tables}
                bind:value={valueReportTable}
                showInput={false}
            />
            {#if valueReportTable == tables[0]}
                <DropDown
                    {groups}
                    bind:value={valueReportParam}
                />
            {:else if valueReportTable == tables[1]}
                <input bind:value={valueReportParam} maxlength="10" type="text" placeholder="dd.mm.yyyy">
            {/if}
            <button on:click={handlerOnClickGetReport} class="send">
                Выполнить
            </button>
        </section>
        {#if messageReprot.type}
            <section class="error">
                <span>
                    <b>{messageReprot.type}</b>: {messageReprot.message}
                </span>
            </section>
        {/if}

        <h1>Обновление всех расписаний</h1>
        <section class="block">
            <div class="desription">
                <b>Описание</b>: локально скачивает расписания всех групп, после создает группы для всех преподавателей ПТК и добавляет в базу данных расписания для студентов и преподавателей.
            </div>
        </section>
        <section class="items">
            <button class="send" on:click={handlreOnClickUpdateSchedule}>
                Выполнить
            </button>
        </section>
        {#if messageUpdateSchedule.type}
            <section class="error">
                <span>
                    <b>{messageUpdateSchedule.type}</b>: {messageUpdateSchedule.message}
                </span>
            </section>
        {/if}

        <h1>Обновление замен по дате</h1>
        <section class="block">
            <div class="desription">
                <b>Описание</b>: скачивает замены на <b>выбранный день</b> и отправляет данные в базу данных.
            </div>
            <div class="variables">
                <br/>
                <b>Перменные</b>: дата (формат: <b>dd.mm.yyyy</b>)
            </div>
        </section>
        <section class="items">
            <input bind:value={valueReplacement} type="text" maxlength="10" placeholder="dd.mm.yyyy">
            <button class="send" on:click={handlreOnClickUpdateReplacement}>
                Выполнить
            </button>
        </section>
        {#if messageUpdateReplacement.type}
            <section class="error">
                <span>
                    <b>{messageUpdateReplacement.type}</b>: {messageUpdateReplacement.message}
                </span>
            </section>
        {/if}
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        max-width: 600px;
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
        max-width: 600px;
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }
    .block {
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 20px;
    }
    .items {
        justify-content: flex-start;
        flex-direction: row;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 20px;
        align-items: center;
    }
    .items input {
        margin: 0 15px 0 5px;
        height: 40px;
        box-shadow: var(--box-shadow) 0 8px 24px;
        outline: none;
        padding: 10px;
        border-radius: 5px;
        color: var(--text-color);
        background: transparent;
        width: 120px;
    }
    .send {
        flex: 1 1 auto;
        box-shadow: var(--box-shadow) 0px 8px 24px;
        border-radius: 10px;
        padding: 10px 0;
        font-weight: 700;
        transition: background .3s linear;
    }
    .send:hover {
        background-color: var(--primary-color-light);
    }
    .error {
        padding: 20px;
        box-shadow: var(--box-shadow) 0 8px 24px;
        margin: 0 auto 10px;
    }
</style>
