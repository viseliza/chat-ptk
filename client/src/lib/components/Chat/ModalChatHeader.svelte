<script lang="ts">
    import type { Profile } from "../../../models/Profile";
    import placeholder from "/images/50x50.svg";
    import type Chat from "../../utils/Chat";
    
    export let chat: Chat;
    export let showModal: boolean;
    export let room_name: string;

    let dialog: HTMLDialogElement;
    let where: string;
    let result: Profile[];

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog 
    bind:this={dialog}
    on:close={() => {showModal = false}}
	on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <section on:click|stopPropagation >
        <section class="dailog_content">
            <section class="header">
                <img class="avatar" src={placeholder} alt="">
                <section class="header_content">
                    <p style="font-weight: 700;">{room_name}</p>
                    <p style="font-weight: 400; font-size: 14px">участников {chat.count_of_profiles}</p>
                </section>
            </section>
            <section class="search">
                <span>Поиск участников: </span>
                <div class="growing-search">
                    <div class="input">
                        <input bind:value={where} on:input={() => result = chat.searchPerson(where)} type="text" name="search"/>
                    </div><!-- Space hack --><div class="submit">
                        <button type="submit" name="go_search">
                          <span class="fa fa-search"></span>
                        </button>
                    </div>
                </div>
            </section>
            <section class="room">
                <section class="room_content">
                    {#if !where}
                        {#each chat.profiles as profile}
                        <section class="profile">
                            <a href="/{profile.user?.login}"><img class="avatar" src={placeholder} alt=""></a>
                            <section class="profile_info">
                                <a href="/{profile.user?.login}"><p style="font-size: 14px;">{profile.first_name} {profile.last_name}</p></a>
                                <p style="font-weight: 400; font-size: 14px">Был в сети</p>
                            </section>
                        </section>
                        {/each}
                    {:else}
                    {#if !result}
                        <span>Пользователи не найдены</span>
                    {:else}
                        {#each result as profile}
                        <section class="profile">
                            <a href="/{profile.user?.login}"><img class="avatar" src={placeholder} alt=""></a>
                            <section class="profile_info">
                                <a href="/{profile.user?.login}"><p style="font-size: 14px;">{profile.first_name} {profile.last_name}</p></a>
                                <p style="font-weight: 400; font-size: 14px">Был в сети</p>
                            </section>
                        </section>
                        {/each}
                        {/if}
                    {/if}
                </section>
            </section>
        </section>
    </section>
    
    <button on:click={() => dialog.close()} aria-label="close" class="x">❌</button>
</dialog>

<style lang="scss">
    .avatar {
        border-radius: 50%;
    }
    dialog {
        height: 800px;
        margin: auto;
        color: var(--text-color);
        background: var(--sidebar-color);
        width: 500px;
        // padding-top: 2rem;
        border-radius: 10px;
        border: 0;
        box-shadow: 0 5px 30px 0 var(--box-shadow);
        animation: fadeIn 1s ease both;
        &::backdrop {
            animation: fadeIn 1s ease both;
            background: rgb(0, 0, 0, 0.5);
            z-index: 2;
        }
        .x {
            filter: grayscale(1);
            border: none;
            background: none;
            position: absolute;
            top: 15px;
            right: 10px;
            transition: ease filter, transform 0.3s;
            cursor: pointer;
            transform-origin: center;
            &:hover {
                filter: grayscale(0);
                transform: scale(1.1);
            }
        }
    }
    .dailog_content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        // margin: 1rem 3rem; 
    }
    .header {
        display: flex;
        align-items: center;
        padding: 48px 48px 16px 48px;
        margin-bottom: 10px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .header img {
        height: 75px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .room {
        padding: 16px 48px;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .room p {
        font-weight: 700;
    }
    .room_content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .profile {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        align-items: center;
    }
    .profile_info {
        display: flex;
        flex-direction: column;
        height: 55px;
        justify-content: space-around;
        margin: 0 15px;
    }
    .search {
        display: flex;
        padding: 16px 48px;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 20px var(--box-shadow);
        margin-bottom: 10px;
    }
    .growing-search {
        padding: 1px 10px 1px 7px;
        border-radius: 10px;
        background: var(--toggle-color);
        margin-left: 10px;
    }
    .growing-search div {
        display: inline-block;
        font-size: 12px;
    }

    .growing-search .input input {
        margin-right: 0;
        border: none;
        font-size: inherit;
        transition: width 200ms;
        padding-top: 5px;
        padding-left: 5px;
        font-size: 12px;
        padding-bottom: 5px;
        font-weight: 500;
        width: 150px;
        background-color: var(--toggle-color);
        color: #707070;
        border-bottom: 1px solid #eee;
    }

    .growing-search .input input:focus {
        width: 210px;
    }

    .growing-search .submit button {
        margin-left: 5px;
        border: none;
        font-size: 1.15em;
        color: #aaa;
        background-color: var(--toggle-color);
        padding-top: 2px;
        padding-bottom: 2px;
        transition: color 200ms;
    }

    .growing-search .input input:focus, .growing-search .submit button:focus {
        outline: none;
    }

    .growing-search .submit button:hover {
        color: #3498db;
    }

</style>