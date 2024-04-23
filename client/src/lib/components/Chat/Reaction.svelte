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
        background-color: var(--body-color);
        border-radius: 15px;
        overflow: hidden;
        align-self: flex-end;
        height: 30px;
        position: absolute;
        bottom: 0;
        transition: height .1s linear;
    }
    .reactionSelect_false {
        right: -30px;
    }
    .reactionSelect_true {
        left: -30px;
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
    }
    .reactionSelect span:hover {
        cursor: pointer;
    }
    .emojie {
        margin-right: 5px;
    }
</style>