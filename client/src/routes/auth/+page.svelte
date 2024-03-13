<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    
    export let form: ActionData;
</script>

<svelte:head>
    <title>Авторизация</title>
    <meta name="description" content="About this app" />
</svelte:head>

<div class="wrap-login">
    <form class="form_login" method="post" use:enhance>
        <span class="title">Авторизация</span>
        <span>Novsu логин</span>
        <input placeholder="Введите логин..." type="login" name="login" id="login" />
        <span>Novsu пароль</span>
        <input placeholder="Введите пароль..." type="password" name="password" id="password" />
        <button type="submit">Войти</button>
        {#if form?.error}
            <div class="error">
                {form.error}
            </div>
        {/if}
    </form>
</div>

<style>
    .wrap-login {
        width: 500px;
        background-color: var(--sidebar-color);
        padding: 60px;
        border-radius: 20px;
        margin: auto;
        position: relative;
        box-shadow: 0px 5px 10px 0px var(--text-color);
    }
    .form_login {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .title {
        font-size: 26px;
        margin-bottom: 10px;
        font-weight: 400;
    }
    span {
        padding-bottom: 20px;
        width: 100%;
        
    }
    input {
        display: block; 
        width: 100%;
        height: 45px;
        padding: 0.375rem 0.75rem;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 400;
        outline: none;
        padding: 0 20px 0 20px;
        line-height: 1.5;
        margin-bottom: 30px;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #bdbdbd;
        border-radius: 10px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    input[type=login], input[type=password] {
        background-color: var(--sidebar-color);
        color: var(--text-color);
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
        margin-bottom: 30px;
        border-radius: 20px;
        transition: all 0.4s;
    }
    button:hover {
        cursor: pointer;
        background-color: var(--button-hover);
    }
    .error {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--toggle-color);
        width: 100%;
        padding: 20px;
        background-color: rgb(253, 167, 167);  
        border-radius: 0px 20px 20px 0;  
        border-left: 5px solid rgb(250, 118, 118);
    }
</style>
