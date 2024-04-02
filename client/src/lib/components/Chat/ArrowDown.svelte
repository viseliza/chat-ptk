<script lang="ts">
    import Chat from "../../utils/Chat";

    export let element: Element;
    export let isShow: boolean;
    export let countUnreadedMessages: number;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section 
    role="button" 
    tabindex={0} 
    on:click={() => Chat.scrollDown(element)} 
    class="arrow-down-block {isShow}"
>
    <section class="scroll-down-dude">
        {#if countUnreadedMessages}
            <span>{countUnreadedMessages}</span>
        {/if}
    </section>
</section>


<style>
    span {
        position: fixed;
        margin: 15px 0 0 15px;
        border-radius: 50%;
        width: 30px;
        background-color: var(--button-background);
        height: 30px;
        text-align: center;
        border: 2px solid var(--text-color);
        color: var(--body-color);
    }
    .arrow-down-block {
        cursor: pointer;
        position: fixed;
        border: 2px solid var(--text-color);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        bottom: 60px;
        margin-left: 540px;
        transition: 0.5s;
        transform: translateY(-100%);
    }
    .arrow-down-block.false {
        transition: 0.3s;
        transform: translateY(-40%);
        visibility: hidden;
        opacity: 0;
        z-index: 0;
    }

    .scroll-down-dude:before,
    .scroll-down-dude:after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        border-bottom: 4px solid var(--text-color);
        border-right: 4px solid var(--text-color);
    }
    
    .scroll-down-dude:before {
        animation: down-arrow-before 2.6s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    }
    
    .scroll-down-dude:after {
        animation: down-arrow-after 2.6s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    }
    
    @keyframes down-arrow-before {
        50% {
            transform: rotate(45deg) translate(70%, 70%);
        }
        100% {
            transform: rotate(45deg) translate(70%, 70%);
        }
    }
    
    @keyframes down-arrow-after {
        50% {
            transform: rotate(45deg) translate(110%, 110%);
            opacity: 0;
        }
        51% {
            transform: rotate(45deg) translate(-130%, -130%);
        }
        100% {
            transform: rotate(45deg) translate(-70%, -70%);
            opacity: 1;
        }
    }
    </style>