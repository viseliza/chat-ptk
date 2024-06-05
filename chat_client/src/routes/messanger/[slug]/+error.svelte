<script lang="ts">
    import { page } from "$app/stores";
</script>

<section class="error">
    <h1>{$page.status}: {$page.error?.message}</h1>
</section>

<style>
    .error {
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>