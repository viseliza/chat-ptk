<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let isMe: boolean;
    let reaction: HTMLDivElement;

    const reset = () => {
        reaction.scrollTop = reaction.scrollHeight;
    }

    const dispatch = createEventDispatcher();

    function selectReaction (reaction: number) {
        dispatch('reaction', {
            reaction
        });
    }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={reaction} class="reactionSelect reactionSelect_{isMe}" on:mouseleave={reset}>
    <span on:click={() => selectReaction(128077)}>&#128077;</span>
    <span on:click={() => selectReaction(128078)}>&#128078;</span>
    <span on:click={() => selectReaction(128151)}>&#128151;</span>
    <span on:click={() => selectReaction(128148)}>&#128148;</span>
    <span on:click={() => selectReaction(128545)}>&#128545;</span>
    <span on:click={() => selectReaction(128546)}>&#128546;</span>
    <span on:click={() => selectReaction(128526)}>&#128526;</span>
    <span on:click={() => selectReaction(129398)}>&#129398;</span>
    <span on:click={() => selectReaction(129397)}>&#129397;</span>
    <span on:click={() => selectReaction(128514)}>&#128514;</span>
</div>


<style>
    .reactionSelect {
        padding: 0 5px 5px 5px;
        display: flex;
        flex-direction: column-reverse;
        background-color: var(--primary-color-light);
        border-radius: 15px;
        overflow: hidden;
        height: 30px;
        position: absolute;
        bottom: 0;
        box-shadow: var(--box-shadow) 0px 8px 24px;
        opacity: 0;
        transition: 0.2s;
        animation: show 0.2s 1;
        animation-fill-mode: forwards;
    }
    .reactionSelect_false {
        right: -25px;
    }
    .reactionSelect_true {
        left: -25px;
    }
    .reactionSelect:hover {
        height: 120px;
        overflow-y: auto;
        -ms-overflow-style: none;
        scrollbar-width: none; 
    }
    .reactionSelect:hover::-webkit-scrollbar {
        display: none;
    }
    .reactionSelect span {
        padding: 0 2px;
        margin-top: 5px;
    }
    .reactionSelect span:hover {
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
</style>