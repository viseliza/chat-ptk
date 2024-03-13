<script lang="ts">
    import placeholder from '$lib/images/50x50.svg';
    import type { PageData } from './$types';

    export let data: PageData;
    $: user = data.user
    $: schedule = data.schedule
    $: profile = data.profile
    $: replacement = data.replacement.split('\n\n');
    
    const numbers: {[key: string]: number} = {
        "08.30-10.10": 1,
        "10.20-12.00": 2,
        "12.45-14.25": 3,
        "14.35-16.15": 4,
        "16.25-18.05": 5
    }
</script>

<svelte:head>
    <title>Профиль</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>

    <div class="header">
        <img src={placeholder} alt="">
        <div style="font-size: 16px;">
            <p style="margin-bottom: 5px;">{profile.first_name}</p>
            <hr>
            <p style="margin-top: 5px;">{profile.last_name}</p>
        </div>
    </div>
    
    <div class="content">
        <div class="item">

            {#if user.user_id == profile.user_id}
            <p>Почта:</p> 
            <div class="input_group">
                <input type="text" placeholder="Name"/>
                <label for="name" class="form__label">
                    {#if !profile.email}
                        your@email.com
                    {:else}
                        {profile.email}
                    {/if}
                </label>
            </div>
            {/if}
        </div>
        <div class="item">
            <p>Группа: {data.group}</p>
        </div>
    </div>

    <div class="replacement">
        <p>Расписание на сегодня</p>
        <table>
            <tr>
                <td style="border-bottom: 1px solid #fff">№ пары </td>
                <td style="border-bottom: 1px solid #fff">Время</td>
                <td style="border-bottom: 1px solid #fff">Дисциплина</td>
            </tr>
        {#each schedule as row}
            {#if row}
                <tr>
                    <td style="width: 95px; text-align: center; border-bottom: 1px solid #fff">{numbers[row.split(" | ")[0]]}</td>
                    <td class='time' style="border-bottom: 1px solid #fff">{row.split(" | ")[0]}</td>
                    <td style="border-bottom: 1px solid #fff">{row.split(" | ")[1]}</td>
                </tr>
            {/if}
        {/each}
        </table>
    </div>

    <div class="schedule">
        <p>Замены на сегодня</p>
        <table>
            {#if replacement[0] == "Замены для выбранной группы не найдены!"}
            <td>{replacement}</td>
            {:else}
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
            {/if}
        </table>
    </div>

</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        height: 100%;
        min-height: 95vh;
    }
    .header {
        padding: 30px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
    }
    .header img {
        height: 75px;
        border-radius: 50%;
        margin-right: 20px;
    }
    div p {
        font-weight: 700;
    }
    .content {
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    .content p {
        margin: 10px 0;
    }
    .item {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .input_group {
        padding: 15px;
        position: relative;
        width: 50%;
    }
    .input_group input {
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        color: #fff;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;

        &::placeholder {
            color: transparent;
        }
        &:placeholder-shown ~ .form__label {
            cursor: text;
            top: 20px;
        }
    }
    .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: #9b9b9b;
    }  
    .input_group input:focus {
        ~ .form__label {
            position: absolute;
            top: 0;
            display: block;
            transition: 0.2s;
            font-size: 1rem;
            color: #11998e;
            font-weight:700;   
        }
        padding-bottom: 6px;  
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, #11998e, #38ef7d);
        border-image-slice: 1;
    } 

    .replacement {
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    table {
        overflow: hidden;
        margin-top: 20px;
    }
    td {
        padding: 5px 15px;
        background-color: var(--sidebar-color);
        color: var(--text-color);
    }
    
    .schedule {
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
        background-color: var(--sidebar-color);
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>