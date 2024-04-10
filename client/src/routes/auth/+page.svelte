<script lang="ts">
    import type { ActionData } from './$types';
    import LoginForm from '../../lib/components/LoginForm.svelte';
    export let form: ActionData;
</script>

<svelte:head>
    <title>Авторизация</title>
    <meta name="description" content="About this app" />
</svelte:head>

<div class="wrap-login">
    <LoginForm form={form}/>
</div>

<style>
    .wrap-login {
        width: 500px;
        background-color: var(--sidebar-color);
        padding: 60px;
        border-radius: 10px;
        margin: auto;
        position: relative;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, var(--box-shadow) 0px 30px 60px -30px;
    }
</style>
