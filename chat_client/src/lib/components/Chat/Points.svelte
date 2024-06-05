<script lang="ts">
    import points from "/images/points.svg";
    import points_dark from "/images/points_dark.svg";
    export let showInput: boolean;
    export let theme: string;
</script>

<details class="dropdown">
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <summary role="button">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a style="height: 35px;" class="button"><img class="nav_icon" src={theme == 'white' ? points : points_dark} alt=""></a>
    </summary>
    <ul style="box-shadow: var(--box-shadow) 0px 8px 24px;">
        <li>
            <button on:click={() => showInput = !showInput}>
                <i style="font-size: 16px; margin-right: 10px;" class="fa fa-search"/>
                Поиск сообщений
            </button>
        </li>
        <li><button>In Pure CSS</button></li>
        <li><button>As in...</button></li>
        <li><button>No JbuttonvbuttonScript.</button></li>
        <li><button>At All.</button></li>
    </ul>
</details>

<style>
    .dropdown {
        position: relative;
        padding: 0;
        margin-right: 1em;

        border: none;
    }

    .dropdown summary {
        list-style: none;
        list-style-type: none;
    }

    .dropdown summary a {
        height: 35px;
        display: flex;
    }

    .dropdown summary:hover {
        cursor: pointer;
    }

    .dropdown summary:focus {
        outline: none;
    }

    .dropdown ul {
        position: absolute;
        padding: 1px 0;
        width: 190px;
        left: 50%;
        margin-left: calc((230px / 2) * -1);
        box-sizing: border-box;
        z-index: 2;

        background: var(--sidebar-color);
        border-radius: 10px;
        list-style: none;
    }

    .dropdown ul li {
        padding: 0;
        margin: 0;
    }

    .dropdown ul li button {
        display: flex;
        border: none;
        border-radius: 10px;
        align-items: center;
        font-size: 14px;
        padding: 10px 15px;
        width: 100%;
        box-sizing: border-box;
        background-color: var(--sidebar-color);
        color: var(--text-color);
        transition: background 0.3s;
        text-decoration: none;
    }

    .dropdown ul li button img {
        height: 18px;
        width: 18px;
        margin-right: 15px;
    }

    .dropdown ul li button:hover {
        background-color: var(--primary-color-light);
    }

    .dropdown ul li button:active {
        background-color: var(--primary-head);
    }

    /* Dropdown triangle */
    .dropdown ul::before {
        content: " ";
        position: absolute;
        width: 0;
        height: 0;
        top: -10px;
        left: 60%;
        margin-left: -10px;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent var(--sidebar-color) transparent;
    }

    /* Close the dropdown with outside clicks */
    .dropdown > summary::before {
        display: none;
    }

    .dropdown[open] > summary::before {
        content: " ";
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
    }
</style>
