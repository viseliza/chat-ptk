<script lang="ts">
    import search from "/images/search.svg";
    import search_dark from "/images/search_dark.svg";
    import type { IChatPreview, IMessage, IProfile } from "../types";

    export let theme: string;
    export let searchArray: IMessage[] | IChatPreview[] | IProfile[];
    export let searchedArray: any[] | string;
    export let showInput: boolean;
    export let isStatic = false;

    let value: string;
    let isFocused: boolean = false;
	const onFocus = () => isFocused = true;
	const onBlur = () => {
        if (!value) {
            searchedArray = [];
            showInput = false;
        }
        isFocused = false;
    }

    function isChatPrewiew(object: any): object is IChatPreview {
        return 'name' in object;
    }

    function isMessages(object: any): object is IMessage {
        return 'text' in object;
    }

    function isProfile(object: any): object is IProfile {
        return 'first_name' in object;
    }


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

{#if isStatic || (!isFocused && !showInput)} 
    <slot>
        <div style="margin: 0; position: relative; width: 100%" class="search">
            <!-- svelte-ignore a11y-autofocus -->
            <input style="padding-right: 35px;" type="text" bind:value on:input={() => searchedArray = searchingChats(value, searchArray)} placeholder="Поиск...">
            <i class="fa fa-search" style="position: absolute; right: 10px; top: 10px; font-size: 18px"></i>
        </div>
    </slot>
{:else}
    <div class="search">
        <!-- svelte-ignore a11y-autofocus -->
        <input autofocus type="text" on:blur={onBlur} on:focus={onFocus} bind:value on:input={() => searchedArray = searchingChats(value, searchArray)} placeholder="Поиск...">
    </div>
    <button on:click={() => {showInput = !showInput}}>
        <img class="nav_icon" src={theme == "white" ? search : search_dark} alt="">
    </button>
{/if}

<style>
    button {
        background-color: transparent;
        border: none;
        margin: 0 30px;
    }
    button:hover {
        cursor: pointer;
    }
    .search {
        margin-left: 30px;
        padding: 2px;
        width: 500px;
        height: 40px;
        background: var(--primary-head);
        border-radius: 4px;
        box-shadow: var(--box-shadow) 0px 4px 12px; 
        outline: none;
        opacity: 0;
        transition: 0.5s;
        animation: show 0.5s 1;
        animation-fill-mode: forwards;
    }
    .search input {
        outline: none;
        width: 100%;
        font-size: 14px;
        border: 0;
        float: left;
        padding: 8px;
        background: none;
    }
    button img {
        height: 24px;
        width: 24px;
        max-width: 24px;
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