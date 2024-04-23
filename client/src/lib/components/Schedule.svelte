<script lang="ts">
    import { onMount } from "svelte";
    import arrow_left from "/images/arrow_left.svg";
    import arrow_left_dark from "/images/arrow_left_dark.svg";
    import arrow_right from "/images/arrow_right.svg";
    import arrow_right_dark from "/images/arrow_right_dark.svg";
    export let scheduleList: string[][] | string[];
    export let isHome: boolean;
    export let theme: string;
    export let role: string;
    
    let slideIndex: number;
    let currentDay: number;
    let isToday = typeof scheduleList[0] === "string";

    slideIndex = new Date().getDay() == 0 ? 0 : new Date().getDay() - 1;
    currentDay = slideIndex;

    let slides: any[] = [];
    let dots: any[] = [];

    const days_array = [
        'ПОНЕДЕЛЬНИК',
        'ВТОРНИК',
        'СРЕДА',
        'ЧЕТВЕРГ',
        'ПЯТНИЦА',
        'СУББОТА'
    ];

    if (isHome) 
        onMount(() => showSlides(slideIndex));
    // Next/previous controls

    function changeSlide(n: number) {
        showSlides((slideIndex += n));
    }

    // Thumbnail image controls
    function currentSlide(n: number) {
        showSlides((slideIndex = n));
    }

    function showSlides(n: number) {
        if (n > slides.length - 1) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex].style.display = "flex";
        dots[slideIndex].className += " active";
    }
</script>

<!-- <table>
    {#each schedule as row, index}
        {#if row}
            <tr>
                {#if days_array.includes(row.toLowerCase().trim())}
                    <th bind:this={slides[slides.length]} colspan="3">{row}</th>
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
</table> -->
{#if isHome}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <button class="prev" on:click={() => changeSlide(-1)}>
        <img class="nav_icon" src={theme == 'white' ? arrow_left : arrow_left_dark} />
    </button>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button class="next" on:click={() => changeSlide(1)}>
        <img class="nav_icon" src={theme == 'white' ? arrow_right : arrow_right_dark} />
    </button>

    <section class="table">
        {#each scheduleList as rows, index1}
            <div class="item" bind:this={slides[index1]}>
                {#if !rows.length}
                    <span class={index1 == currentDay ? "currentDay day" : "day"}>{days_array[index1]}</span>
                    <div class="column-none">
                        <span>
                            В этот день у Вас нет занятий
                        </span>
                    </div>
                {/if}
                {#each rows as row, index}
                    {#if index == 0}
                        <span class={index1 == currentDay ? "currentDay day" : "day"}>{row}</span>
                    {:else if scheduleList[index1][index + 1] && scheduleList[index1][index].split(" | ")[0] == scheduleList[index1][index + 1].split(" | ")[0]}
                    {#if role == "TEACHER"}
                        <div class="column column-split">
                            <div class="prev-row">
                                <span class="time">{row.split(" | ")[0]}</span>
                                <span class="group">{row.split(" | ")[1]}</span>
                                <span class="row-text">{row.split(" | ")[2]}</span>
                            </div>
                            <div style="border-top: 1px solid var(--primary-color);" class="next-row">
                                <span class="time">{scheduleList[index1][index + 1].split(" | ")[0]}</span>
                                <span class="group">{scheduleList[index1][index + 1].split(" | ")[1]}</span>
                                <span class="row-text">{scheduleList[index1][index + 1].split(" | ")[2]}</span>
                            </div>
                        </div>
                    {:else}
                        <div class="column column-split">
                            <div class="prev-row">
                                <span class="time">{row.split(" | ")[0]}</span>
                                <span class="row-text">{row.split(" | ")[1]}</span>
                            </div>
                            <div style="border-top: 1px solid var(--primary-color);" class="next-row">
                                <span class="time">{scheduleList[index1][index + 1].split(" | ")[0]}</span>
                                <span class="row-text">{scheduleList[index1][index + 1].split(" | ")[1]}</span>
                            </div>
                        </div>
                    {/if}
                    {:else if scheduleList[index1][index - 1] && scheduleList[index1][index].split(" | ")[0] != scheduleList[index1][index - 1].split(" | ")[0]}
                        {#if role == "TEACHER"}
                            <div class="column">
                                <span class="time">{row.split(" | ")[0]}</span>
                                <span class="group">{row.split(" | ")[1]}</span>
                                <span class="row-text">{row.split(" | ")[2]}</span>
                            </div>
                        {:else}
                        <div class="column">
                            <span class="time">{row.split(" | ")[0]}</span>
                            <span class="row-text">{row.split(" | ")[1]}</span>
                        </div>
                        {/if}
                    {/if}
                {/each}
            </div>
        {/each}
    </section>

    <!-- The dots/circles -->
    <div style="text-align:center">
        {#each scheduleList as row, index}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
                class="dot"
                bind:this={dots[index]}
                on:click={() => currentSlide(index)}
            ></span>
        {/each}
    </div>
{:else}
    <div class="item" bind:this={slides[0]}>
        {#if !scheduleList.length}
            <div style="height: 150px;" class="column-none">
                <span>
                    На сегодня у Вас нет занятий
                </span>
            </div>
        {/if}
        {#each scheduleList as row, index}
            {#if !days_array.includes(row.trim())}    
                {#if scheduleList[index + 1] && scheduleList[index].split(" | ")[0] == scheduleList[index + 1].split(" | ")[0]}
                    <div class="column column-split">
                        <div class="prev-row">
                            <span class="time">{row.split(" | ")[0]}</span>
                            <span class="row-text">{row.split(" | ")[1]}</span>
                        </div>
                        <div style="border-top: 1px solid var(--primary-color);" class="next-row">
                            <span class="time">{scheduleList[index + 1].split(" | ")[0]}</span>
                            <span class="row-text">{scheduleList[index + 1].split(" | ")[1]}</span>
                        </div>
                    </div>
                {:else if scheduleList[index - 1] && scheduleList[index].split(" | ")[0] != scheduleList[index - 1].split(" | ")[0]}
                    <div class="column">
                        <span class="time">{row.split(" | ")[0]}</span>
                        <span class="row-text">{row.split(" | ")[1]}</span>
                    </div>
                {/if}
            {/if}
        {/each}
    </div>
{/if}

    <style>
        .time {
            width: 120px;
        }
        .table {
            display: flex;
            flex-direction: column;
            max-width: 65vh;
            width: 100%;
            margin: 10px auto 15px auto;
            border-radius: 10px;
            box-shadow: 0 0 20px var(--box-shadow);
            background-color: var(--sidebar-color);
            min-height: 400px;
        }
        .table .item {
            display: flex;
            flex-direction: column;
        }
        .item .day {
            text-align: center;
            padding: 20px;
            align-self: stretch;
            background-color: var(--primary-color-light);
            font-size: 20px;
            font-weight: 700;
            border-radius: 10px 10px 0 0;
            margin-bottom: 20px;
        }
        .item .currentDay {
            background-color: var(--primary-head);
        }
        .item .column {
            padding: 15px;
            display: flex;
            flex-direction: row;
            margin: 0 20px 20px 20px;
            border-radius: 10px;
            box-shadow: var(--box-shadow) 0px 2px 8px 0px;
            background-color: var(--sidebar-color);
        }
        .item .column .time {
            width: 100px;
            align-self: center;
        }
        .item .column .group {
            width: 100px;
            text-align: center;  
            position: relative;
            align-self: center;
            display: inline-block;
        }
        .item .column .group:before{ 
            content: " ";
            background: var(--primary-color);
            width: 1px;
            height: calc(100% + 30px);
            right: 13px;
            position: absolute;
            top: -15px;
        }

        .item .column .group:after{ 
            content: " ";
            background: var(--primary-color);
            width: 1px;
            height: calc(100% + 30px);
            left: 10px;
            position: absolute;
            top: -15px;
        }
        .item .column-split {
            display: flex;
            flex-direction: column;
        }
        .item .column-none {
            display: flex;
            width: 100%;
            height: 250px;
            justify-content: center;
            align-items: center;
            font-weight: 700;
            font-size: 18px;
        }
        .prev-row,
        .next-row {
            display: flex;
        }
        .prev-row {
            padding-bottom: 10px;
        }
        .next-row {
            padding-top: 10px;
        }
        .row-text {
            width: 450px;
        }
        /* Next & previous buttons */
        .prev,
        .next {
            cursor: pointer;
            position: relative;
            bottom: -260px;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -35px;
            padding: 16px;
            border-radius: 50%;
            border: 1px solid var(--primary-color);
            transition: 0.6s ease;
            user-select: none;
            background-color: var(--primary-color);
            box-shadow: var(--box-shadow) 0px 7px 29px 0px;
            left: -60px;
        }

        /* Position the "next button" to the right */
        .next {
            left: 630px;
        }

        /* On hover, add a black background color with a little bit see-through */
        .prev:hover,
        .next:hover {
            background-color: var(--primary-color-light);
        }


        /* The dots/bullets/indicators */
        .dot {
            cursor: pointer;
            height: 15px;
            width: 15px;
            margin: 0 2px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.6s ease;
        }

        .active,
        .dot:hover {
            background-color: #717171;
        }
    </style>