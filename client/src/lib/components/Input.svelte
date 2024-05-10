<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { IChatPreview, IMessage, IProfile } from "../types";

    export let searchArray: IMessage[] | IChatPreview[] | IProfile[];
    export let searchedArray: any[] | string;
    export let isMessager = false;
    export let isFriends = false;

    let value: string = "";
    let blured = true;
    let closeInput: HTMLElement;
    const dispatch = createEventDispatcher();

    const isChatPrewiew = (object: any): object is IChatPreview => 'name' in object;
    const isMessages = (object: any): object is IMessage => 'text' in object;
    const isProfile = (object: any): object is IProfile => 'first_name' in object;

    const changedCloseInput = (isValue: boolean) => {
        if (isValue && closeInput) 
            closeInput.style.opacity = '1';
        else if (!isValue && closeInput)
            closeInput.style.opacity = '0';
        searchedArray = searchingChats(value, searchArray);
    }

    $: if (!value || value)
        changedCloseInput(value ? true : false);


    function searchingChats(where: string, array: IMessage[] | IChatPreview[] | IProfile[]): any[] | string {
        let result: any[] = [];
        array.forEach((object: any) => {
            if (isMessages(object)) {
                if (object.text.includes(where))
                    result = [...result, object];
            } else if (isChatPrewiew(object)) {
                if(object.name.includes(where) || object.id.includes(where))
                    result = [...result, object];
            } else if (isProfile(object)) {
                if(object.first_name?.includes(where) || object.last_name?.includes(where) || object.father_name?.includes(where)) 
                    result = [...result, object];
            }
        })
        if (!result.length)
            return "Результатов не найдено";
        return result;
    }
</script>

{#if isMessager}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="home-input-block">
        <input 
            on:blur={() => { blured = true; if (!value) dispatch('showInput', { showInput: false } ); }}
            on:focus={() => {closeInput.style.opacity = '1'; blured = false}}
            bind:value 
            type="text"
        />
        <i class="fa fa-search"/>
        <i 
            bind:this={closeInput} 
            on:click={() => { value = ""; dispatch('showInput', { showInput: false } ); } } 
            class="fa fa-times times_{blured}"
        />
    </div>
{:else if isFriends} 
    <slot>
        <div class="search">
            <!-- svelte-ignore a11y-autofocus -->
            <input type="text" bind:value placeholder="Поиск...">
            <i class="fa fa-search"></i>
        </div>
    </slot>
{/if}

<style>
    /************ HOME INPUT BLOCK ***********/
    .home-input-block {
        position: relative;
        width: 100%;
        margin: 0 20px;
    }
    .home-input-block input {
        padding: 0px 35px;
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text-color);
    }
    .home-input-block .fa-search {
        position: absolute;
        left: 5px;
        top: 5px;
    }
    .home-input-block .fa-times {
        position: absolute;
        opacity: 0;
        right: 10px;
        top: 5px;
        transition: opacity .3s linear;
    }
    .home-input-block .fa-times.times_false:hover {
        cursor: pointer;
    }

    /************ SEARCH ***********/
    .search {
        margin: 0px;
        position: relative;
        width: 100%;
        padding: 2px;
        height: 40px;
        background: transparent;
        border-radius: 4px;
        box-shadow: var(--box-shadow) 0px 4px 12px; 
        outline: none;
    }
    .search input {
        outline: none;
        color: var(--text-color);
        width: 100%;
        font-size: 14px;
        border: 0;
        float: left;
        padding: 8px 15px;
        padding-right: 35px;
        height: 100%;
        background: none;
    }
    .search .fa-search {
        position: absolute; 
        right: 10px; 
        top: 12px; 
    }
</style>