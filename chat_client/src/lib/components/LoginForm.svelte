
<script lang="ts">    
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import swapTheme from '../utils/swapTheme';
    export let form: any;

    let login_label: HTMLLabelElement, password_label: HTMLLabelElement, login_value: string, password_value: string, close: string = "";
    let theme: string;

    $: if (form?.error) {
        close = "_close";
    }   

    onMount(() => {
        theme == "black" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
    });

    function changeTheme() {
        setTimeout(async () => {
            theme = await swapTheme(theme);
        }, 100)
    }
</script>

{#if form?.error}
<div class="wrapper{close}">
    <div class="no-data float">
      <p><i class="fa fa-warning"></i>{form.error}</p>
    </div>
  </div>
{/if}

<form class="form_login" method="post" use:enhance>
    <span class="title">Добро пожаловать</span>

    <div class="input-column">
        <input bind:value={login_value} on:blur={() => { login_value ? login_label.style.opacity = "0" : login_label.style.opacity = "1" }} name="login" id="login" type="text">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label bind:this={login_label}>NovSU логин</label>
        <span class="focus-border"></span>
    </div>
    <div class="input-column">
        <input bind:value={password_value} on:blur={() => { password_value ? password_label.style.opacity = "0" : password_label.style.opacity = "1" }} name="password" id="password" type="password">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label bind:this={password_label}>NovSU пароль</label>
        <span class="focus-border"></span>
    </div>

    <button type="submit">Войти</button>
</form>

<div class="swap-theme">
    <div class="sun-moon">
        <i class="bx bx-moon icon moon" />
        <i class="bx bx-sun icon sun" />
    </div>

    <div class="toggle-switch">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
            on:click={() => changeTheme()}
            class="switch"
            role="button"
            tabindex={0}
        />
    </div>
</div>


<style>
    .form_login {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: stretch;
    }
    .title {
        font-size: 26px;
        font-weight: 600;
        margin-bottom: 25px;
    }
    .input-column {
        z-index: 2;
        margin: 25px 0;
        position: relative;
    }
    :focus{outline: none;} 

    input { 
        border: 0; 
        width: 100%;
        font-size: 16px;
        letter-spacing: 1px;
        color: var(--text-color);
        box-sizing: border-box;
        padding: 4px 0; 
        border-bottom: 1px solid var(--primary-head); 
        background-color: transparent;
    }

    input ~ .focus-border {
        position: absolute; 
        bottom: 0; 
        left: 0; 
        width: 0; 
        height: 2px; 
        background-color: #4caf50; 
        transition: 0.4s;
    }
    input:focus ~ .focus-border,
    .has-contentinput ~ .focus-border { 
        width: 100%; 
        transition: 0.4s;
    }
    input ~ label {
        position: absolute; 
        left: 0; 
        width: 100%; 
        top: 2px; 
        transition: 0.3s; 
        z-index: -1; 
        letter-spacing: 0.5px;
    }
    input:focus ~ label, 
    .has-contentinput ~ label {
        top: -20px; 
        font-size: 14px; 
        color: #4caf50;
        transition: 0.3s;
    }
     
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 150px;
        background-color: var(--button-background);
        color: var(--sidebar-color);
        height: 55px;
        border: none;
        margin-top: 25px;
        border-radius: 10px;
        transition: all 0.4s;
    }
    button:hover {
        cursor: pointer;
        background-color: var(--button-hover);
    }

    .wrapper {
        position: fixed;
        right: 50px;
        top: 50px;
        opacity: 0;
        animation: show 0.5s 1;
        animation-fill-mode: forwards;
    }

    .wrapper_close {
        position: fixed;
        right: 50px;
        top: 50px;
        opacity: 1;
        animation: hide 10s 1;
        animation-fill-mode: forwards;
    }

    .no-data {
        background-color: var(--sidebar-color);
        color: var(--text-color);
        width: 280px;
        padding: 18px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        font-size: 16px;
        line-height: 16px;
    }
    .no-data p {
        display: flex;
        align-items: center;
        margin-top: 0;
    }
    .no-data .fa-warning {
        float: left;
        margin-right: 12px;
        height: 40px;
        margin-top: 6px;
        font-size: 2em;
        color: #cc3c15;
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
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .swap-theme {
        border-radius: 6px;
        background-color: var(--primary-color-light);
        position: fixed;
        bottom: 36px;
        display: flex;
        left: 15px;
        transition: var(--tran-05);
    }

    .swap-theme .sun-moon {
        height: 50px;
        width: 60px;
    }

    .swap-theme .sun-moon i {
        position: absolute;
    }
    .swap-theme .sun-moon i.sun {
        opacity: 0;
    }
    body.dark .swap-theme .sun-moon i.sun {
        opacity: 1;
    }
    body.dark .swap-theme .sun-moon i.moon {
        opacity: 0;
    }

    .toggle-switch {
        position: absolute;
        right: 0;
        height: 100%;
        min-width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
    }
    .toggle-switch .switch {
        position: relative;
        height: 22px;
        width: 40px;
        border-radius: 25px;
        background-color: var(--toggle-color);
        transition: var(--tran-05);
        cursor: pointer;
    }

    .switch::before {
        content: "";
        position: absolute;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        top: 50%;
        left: var(--left);
        transform: translateY(-50%);
        background-color: var(--sidebar-color);
        transition: var(--tran-04);
    }

</style>