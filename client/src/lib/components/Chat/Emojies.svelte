<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    export let isActiveSmiles = false;
    let emojies: HTMLDivElement;

    onMount(() => {
        document.addEventListener('click', function(e: any) {
            if (isActiveSmiles && e.target != emojies && e.target!.id != "emojies_button") {
                isActiveSmiles = false;
            }
        })
    })

    const dispatch = createEventDispatcher();

    function selectEmojie (emojie: number) {
        dispatch('emojie', {
            emojie
        });
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={emojies} class="emojies emojies_{isActiveSmiles}">
    <div style="margin-top: 0px; border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Улыбающиеся</div>
        <div class="list">
            <span on:click={() => selectEmojie(128512)}>&#128512;</span>
            <span on:click={() => selectEmojie(128521)}>&#128521;</span>
            <span on:click={() => selectEmojie(128513)}>&#128513;</span>
            <span on:click={() => selectEmojie(128513)}>&#128513;</span>
            <span on:click={() => selectEmojie(128518)}>&#128518;</span>
            <span on:click={() => selectEmojie(128517)}>&#128517;</span>
            <span on:click={() => selectEmojie(128514)}>&#128514;</span>
            <span on:click={() => selectEmojie(128522)}>&#128522;</span>
            <span on:click={() => selectEmojie(128578)}>&#128578;</span>
            <span on:click={() => selectEmojie(128516)}>&#128516;</span>
            <span on:click={() => selectEmojie(128579)}>&#128579;</span>
            <span on:click={() => selectEmojie(128519)}>&#128519;</span>
            <span on:click={() => selectEmojie(128515)}>&#128515;</span>
            <span on:click={() => selectEmojie(129315)}>&#129315;</span>
            <span on:click={() => selectEmojie(129760)}>&#129760;</span>
        </div>
    </div>
        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Влюбленные</div>
        <div class="list">
            <span on:click={() => selectEmojie(128538)}>&#128538;</span>
            <span on:click={() => selectEmojie(128537)}>&#128537;</span>
            <span on:click={() => selectEmojie(128525)}>&#128525;</span>
            <span on:click={() => selectEmojie(128535)}>&#128535;</span>
            <span on:click={() => selectEmojie(128536)}>&#128536;</span>
            <span on:click={() => selectEmojie(129392)}>&#129392;</span>
            <span on:click={() => selectEmojie(129394)}>&#129394;</span>
            <span on:click={() => selectEmojie(129321)}>&#129321;</span>
        </div>
    </div>
        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Эмоции с языком</div>
        <div class="list">
            <span on:click={() => selectEmojie(128539)}>&#128539;</span>
            <span on:click={() => selectEmojie(128540)}>&#128540;</span>
            <span on:click={() => selectEmojie(128541)}>&#128541;</span>
            <span on:click={() => selectEmojie(129322)}>&#129322;</span>
            <span on:click={() => selectEmojie(129322)}>&#129322;</span>
        </div>
    </div>
        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Эмоции с рукой</div>
        <div class="list">
            <span on:click={() => selectEmojie(129300)}>&#129300;</span>
            <span on:click={() => selectEmojie(129325)}>&#129325;</span>
            <span on:click={() => selectEmojie(129303)}>&#129303;</span>
            <span on:click={() => selectEmojie(129323)}>&#129323;</span>
            <span on:click={() => selectEmojie(129761)}>&#129761;</span>
            <span on:click={() => selectEmojie(129762)}>&#129762;</span>
            <span on:click={() => selectEmojie(129763)}>&#129763;</span>
        </div>
    </div>
        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Нейтральные эмоции</div>
        <div class="list">
            <span on:click={() => selectEmojie(128528)}>&#128528;</span>
            <span on:click={() => selectEmojie(128528)}>&#128528;</span>
            <span on:click={() => selectEmojie(128556)}>&#128556;</span>
            <span on:click={() => selectEmojie(128527)}>&#128527;</span>
            <span on:click={() => selectEmojie(128529)}>&#128529;</span>
            <span on:click={() => selectEmojie(128530)}>&#128530;</span>
            <span on:click={() => selectEmojie(128580)}>&#128580;</span>
            <span on:click={() => selectEmojie(129320)}>&#129320;</span>
            <span on:click={() => selectEmojie(129296)}>&#129296;</span>
            <span on:click={() => selectEmojie(129317)}>&#129317;</span>
            <span on:click={() => selectEmojie(129768)}>&#129768;</span>
            <span on:click={() => selectEmojie(129765)}>&#129765;</span>
        </div>
    </div>

        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Сонные эмоции</div>
        <div class="list">
            <span on:click={() => selectEmojie(128524)}>&#128524;</span>
            <span on:click={() => selectEmojie(128532)}>&#128532;</span>
            <span on:click={() => selectEmojie(128554)}>&#128554;</span>
            <span on:click={() => selectEmojie(128554)}>&#128554;</span>
            <span on:click={() => selectEmojie(129316)}>&#129316;</span>
        </div>
    </div>

        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Болеющие эмцоии</div>
        <div class="list">
            <span on:click={() => selectEmojie(128567)}>&#128567;</span>
            <span on:click={() => selectEmojie(128565)}>&#128565;</span>
            <span on:click={() => selectEmojie(129398)}>&#129398;</span>
            <span on:click={() => selectEmojie(129319)}>&#129319;</span>
            <span on:click={() => selectEmojie(129327)}>&#129327;</span>
            <span on:click={() => selectEmojie(129396)}>&#129396;</span>
            <span on:click={() => selectEmojie(129298)}>&#129298;</span>
            <span on:click={() => selectEmojie(129397)}>&#129397;</span>
            <span on:click={() => selectEmojie(129326)}>&#129326;</span>
            <span on:click={() => selectEmojie(129301)}>&#129301;</span>
            <span on:click={() => selectEmojie(129314)}>&#129314;</span>
        </div>
    </div>

        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Эмоции со шляпой</div>
        <div class="list">
            <span on:click={() => selectEmojie(129400)}>&#129400;</span>
            <span on:click={() => selectEmojie(129312)}>&#129312;</span>
            <span on:click={() => selectEmojie(129395)}>&#129395;</span>
        </div>
    </div>

        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Эмоции с очками</div>
        <div class="list">
            <span on:click={() => selectEmojie(128526)}>&#128526;</span>
            <span on:click={() => selectEmojie(129299)}>&#129299;</span>
            <span on:click={() => selectEmojie(129488)}>&#129488;</span>
        </div>
    </div>

        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Тревожные эмцоии</div>
        <div class="list">
            <span on:click={() => selectEmojie(128533)}>&#128533;</span>
            <span on:click={() => selectEmojie(128534)}>&#128534;</span>
            <span on:click={() => selectEmojie(128551)}>&#128551;</span>
            <span on:click={() => selectEmojie(128555)}>&#128555;</span>
            <span on:click={() => selectEmojie(128561)}>&#128561;</span>
            <span on:click={() => selectEmojie(128542)}>&#128542;</span>
            <span on:click={() => selectEmojie(128559)}>&#128559;</span>
            <span on:click={() => selectEmojie(128558)}>&#128558;</span>
            <span on:click={() => selectEmojie(128557)}>&#128557;</span>
            <span on:click={() => selectEmojie(128543)}>&#128543;</span>
            <span on:click={() => selectEmojie(128531)}>&#128531;</span>
            <span on:click={() => selectEmojie(128553)}>&#128553;</span>
            <span on:click={() => selectEmojie(128546)}>&#128546;</span>
            <span on:click={() => selectEmojie(128562)}>&#128562;</span>
            <span on:click={() => selectEmojie(128552)}>&#128552;</span>
            <span on:click={() => selectEmojie(128563)}>&#128563;</span>
            <span on:click={() => selectEmojie(128577)}>&#128577;</span>
            <span on:click={() => selectEmojie(128549)}>&#128549;</span>
            <span on:click={() => selectEmojie(128547)}>&#128547;</span>
            <span on:click={() => selectEmojie(128550)}>&#128550;</span>
            <span on:click={() => selectEmojie(128560)}>&#128560;</span>
            <span on:click={() => selectEmojie(129402)}>&#129402;</span>
            <span on:click={() => selectEmojie(129393)}>&#129393;</span>
            <span on:click={() => selectEmojie(129401)}>&#129401;</span>
            <span on:click={() => selectEmojie(129764)}>&#129764;</span>
        </div>
    </div>

        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Злые эмцоии</div>
        <div class="list">
            <span on:click={() => selectEmojie(128128)}>&#128128;</span>
            <span on:click={() => selectEmojie(128127)}>&#128127;</span>
            <span on:click={() => selectEmojie(128548)}>&#128548;</span>
            <span on:click={() => selectEmojie(128520)}>&#128520;</span>
            <span on:click={() => selectEmojie(128545)}>&#128545;</span>
            <span on:click={() => selectEmojie(128544)}>&#128544;</span>
            <span on:click={() => selectEmojie(129324)}>&#129324;</span>
            <span on:click={() => selectEmojie(9760)}>&#9760;</span>
        </div>
    </div>
        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Эмоции маски</div>
        <div class="list">
            <span on:click={() => selectEmojie(128169)}>&#128169;</span>
            <span on:click={() => selectEmojie(128125)}>&#128125;</span>
            <span on:click={() => selectEmojie(128126)}>&#128126;</span>
            <span on:click={() => selectEmojie(128123)}>&#128123;</span>
            <span on:click={() => selectEmojie(128122)}>&#128122;</span>
            <span on:click={() => selectEmojie(128121)}>&#128121;</span>
            <span on:click={() => selectEmojie(129313)}>&#129313;</span>
            <span on:click={() => selectEmojie(129302)}>&#129302;</span>
        </div>
    </div>
        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Кошачие эмоции</div>
        <div class="list">
            <span on:click={() => selectEmojie(128576)}>&#128576;</span>
            <span on:click={() => selectEmojie(128573)}>&#128573;</span>
            <span on:click={() => selectEmojie(128568)}>&#128568;</span>
            <span on:click={() => selectEmojie(128575)}>&#128575;</span>
            <span on:click={() => selectEmojie(128575)}>&#128575;</span>
            <span on:click={() => selectEmojie(128574)}>&#128574;</span>
            <span on:click={() => selectEmojie(128571)}>&#128571;</span>
            <span on:click={() => selectEmojie(128570)}>&#128570;</span>
            <span on:click={() => selectEmojie(128572)}>&#128572;</span>
            <span on:click={() => selectEmojie(128569)}>&#128569;</span>
        </div>
    </div>
        <div style="border-bottom: 1px solid var(--primary-color-light);" class="chapter">
        <div class="title">Эмоции обезьяны</div>
        <div class="list">
            <span on:click={() => selectEmojie(128585)}>&#128585;</span>
            <span on:click={() => selectEmojie(128586)}>&#128586;</span>
            <span on:click={() => selectEmojie(128584)}>&#128584;</span>
        </div>
    </div>
    <div style="margin-bottom: 0px;" class="chapter">
        <div class="title">Эмоции</div>
        <div class="list">
            <span on:click={() => selectEmojie(128159)}>&#128159;</span>
            <span on:click={() => selectEmojie(128173)}>&#128173;</span>
            <span on:click={() => selectEmojie(128158)}>&#128158;</span>
            <span on:click={() => selectEmojie(128140)}>&#128140;</span>
            <span on:click={() => selectEmojie(128162)}>&#128162;</span>
            <span on:click={() => selectEmojie(128147)}>&#128147;</span>
            <span on:click={() => selectEmojie(128175)}>&#128175;</span>
            <span on:click={() => selectEmojie(128149)}>&#128149;</span>
            <span on:click={() => selectEmojie(128139)}>&#128139;</span>
            <span on:click={() => selectEmojie(128168)}>&#128168;</span>
            <span on:click={() => selectEmojie(128166)}>&#128166;</span>
            <span on:click={() => selectEmojie(128171)}>&#128171;</span>
            <span on:click={() => selectEmojie(128151)}>&#128151;</span>
            <span on:click={() => selectEmojie(128148)}>&#128148;</span>
            <span on:click={() => selectEmojie(128152)}>&#128152;</span>
            <span on:click={() => selectEmojie(128154)}>&#128154;</span>
            <span on:click={() => selectEmojie(128153)}>&#128153;</span>
            <span on:click={() => selectEmojie(128156)}>&#128156;</span>
            <span on:click={() => selectEmojie(128155)}>&#128155;</span>
            <span on:click={() => selectEmojie(128165)}>&#128165;</span>
            <span on:click={() => selectEmojie(128150)}>&#128150;</span>
            <span on:click={() => selectEmojie(128172)}>&#128172;</span>
            <span on:click={() => selectEmojie(128163)}>&#128163;</span>
            <span on:click={() => selectEmojie(128164)}>&#128164;</span>
            <span on:click={() => selectEmojie(128157)}>&#128157;</span>
            <span on:click={() => selectEmojie(128495)}>&#128495;</span>
            <span on:click={() => selectEmojie(128371)}>&#128371;</span>
            <span on:click={() => selectEmojie(128488)}>&#128488;</span>
            <span on:click={() => selectEmojie(128420)}>&#128420;</span>
            <span on:click={() => selectEmojie(129505)}>&#129505;</span>
            <span on:click={() => selectEmojie(129294)}>&#129294;</span>
            <span on:click={() => selectEmojie(129293)}>&#129293;</span>
            <span on:click={() => selectEmojie(10084)}>&#10084;</span>
            <span on:click={() => selectEmojie(10083)}>&#10083;</span>
        </div>
    </div>
</div>


<style>
    .emojies_false {
        display: none;
        opacity: 0;
    }
    .emojies_true {
        height: 300px;
        display: block;
        width: 230px;
        background-image: linear-gradient(to bottom right, var(--body-color), var(--sidebar-color));
        position: absolute;
        border-radius: 10px;
        right: -50px;
        bottom: 75px;
        overflow-y: auto;
        opacity: 0;
        transition: 0.5s;
        animation: show 0.5s 1;
        animation-fill-mode: forwards;
    }
    .emojies .chapter {
        margin: 10px 0;
        padding: 10px;
    }
    .emojies .chapter .title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
    }
    .emojies .chapter .list {
        font-size: 20px;
    }
    .emojies .chapter .list span {
        padding: 0 5px;
        box-shadow: var(--box-shadow) 0px 8px 24px;
        border-radius: 50%;
    }
    .emojies .chapter .list span:hover {
        cursor: pointer;
    }
    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes hide {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>