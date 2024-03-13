<script lang="ts">
    import { io } from "socket.io-client";
    import placeholder from "$lib/images/50x50.svg";
    import attachment from "$lib/images/attachment.svg";
    import attachment_dark from "$lib/images/attachment_dark.svg";
    import play from "$lib/images/navigation.svg";
    import play_dark from "$lib/images/navigation_dark.svg";
    import points from "$lib/images/points.svg";
    import points_dark from "$lib/images/points_dark.svg";
    import arrow_left from "$lib/images/arrow-left.png";
    import arrow_left_dark from "$lib/images/arrow-left_dark.png";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    export let data: PageData;
    
    const socket = io("http://localhost:18001");
    $: count = data.profiles[0]._count.profiles;
    let row = 0;
    let messages: Array<any> = [];
    let user_id = data.user.user_id;
    let profiles = data.profiles[0].profiles;
    let room_id = data.room.id;
	let scroll: Element;
    
    let text = "";
    $: room = data.room.name;
    let joined = true;

    onMount(()=> {
        scroll.addEventListener('scroll', function() {
            if (scroll.scrollTop == 0) {
                row += 100;
                socket.emit("takeMessages", { room_id, row }, (response: any) => {
                    response.length ? messages = [...messages, response] : row -= 100;
                });
            }
        })
    })


    socket.on("connect", () => {
        socket.emit("joinRoom", room);

        socket.emit("takeMessages", { room_id, row }, (response: any) => {
            messages = response;
        });

        socket.on("message", (message) => {
            messages = [...messages, message];
        });
    });


    const sendMessage = () => {
        if (text.trim()) {
            socket.emit(
                "createMessage",
                {
                    name: user_id,
                    text: text.trim(),
                    time: new Date(),
                    room,
                    room_id: room_id,
                },
                () => {
                    text = "";
                }
            );
        }
    };

    const join = () => {
        socket.emit("join", { name: user_id }, () => {
            joined = true;
            socket.emit("joinRoom", room);
        });
    };

    function on_key_down(event: { key: string }) {
        if (event.key == "Enter") sendMessage();
    }

    let theme = data.user.theme;
</script>

<svelte:head>
    <title>Чат</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <div class="chat_header">
        <div class="back">
            <a class="back" href="./" style="text-decoration: none;">
                {#if theme == "white"}
                    <img class="nav_icon" src={arrow_left} alt="" />
                {:else}
                    <img class="nav_icon" src={arrow_left_dark} alt="" />
                {/if}
                <span>Назад</span>
            </a>
        </div>
        <div class="title_box">
            <span class="title">{room}</span>
            <span class="count">колличество участников: {count}</span>
        </div>
        <div class="info">
            {#if theme == "white"}
                <img class="nav_icon" src={points} alt="" />
            {:else}
                <img class="nav_icon" src={points_dark} alt="" />
            {/if}
            <button title="Показать информацию" class="model_button" onclick="window.dialog.showModal();">
                <img style="width: 100%; height: 100%" id="icon" class="avatar" src={placeholder} alt="">
            </button>

        </div>
    </div>
    <!-- ./chat_header -->
    <div class="chat_messages" bind:this = "{scroll}">
        {#if !joined}
            <div>
                <form>
                    <span>What's your name?</span>
                    <input bind:value={user_id} />
                    <input bind:value={room} />
                    <button type="submit" on:click={() => join()}>Send</button>
                </form>
            </div>
        {:else if messages.length != 0}
            {#each messages as message, index}
                {#if message.user_id != data.user.user_id}
                    {#if index != 0 && messages[index - 1].user_id != data.user.user_id && Date.parse(new Date(messages[index].time).toString()) < new Date(messages[index - 1].time).setMinutes(new Date(messages[index - 1].time).getMinutes() + 5)}
                        <div
                            class="message"
                            style="padding-top: 0; margin-left: 55px;"
                        >
                            <div class="content">
                                {#each message.text.split("\n") as string}
                                    <span class="text">{string}</span>
                                {/each}
                                <span
                                    style="font-size: 12px; align-self: flex-end; margin-top: 2px;"
                                >
                                    {new Date(
                                        messages[index].time
                                    ).toLocaleTimeString("en-GB", {
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    {:else}
                        <div class="message">
                            <div class="icon">
                                <img class="avatar" src={placeholder} alt="" />
                            </div>
                            <div class="content">
                                {#each message.text.split("\n") as string}
                                    <span class="text">{string}</span>
                                {/each}
                                <span
                                    style="font-size: 12px; align-self: flex-end; margin-top: 2px;"
                                >
                                    {new Date(
                                        messages[index].time
                                    ).toLocaleTimeString("en-GB", {
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    {/if}
                {:else if index != 0 && Date.parse(new Date(messages[index].time).toString()) < new Date(messages[index - 1].time).setMinutes(new Date(messages[index - 1].time).getMinutes() + 5)}
                    <div
                        class="message"
                        style="padding-top: 0; margin-right: 55px; align-self: flex-end;"
                    >
                        <div
                            class="content"
                            style="background-color: var(--message-back);"
                        >
                            {#each message.text.split("\n") as string}
                                <span class="text">{string}</span>
                            {/each}
                            <span
                                style="font-size: 12px; align-self: flex-end; margin-top: 2px;"
                            >
                                {new Date(
                                    messages[index].time
                                ).toLocaleTimeString("en-GB", {
                                    hour: "numeric",
                                    minute: "numeric",
                                })}
                            </span>
                        </div>
                        <script>
                            element =
                                document.getElementsByClassName(
                                    "chat_messages"
                                )[0];
                            element.scrollTop = element.scrollHeight;
                        </script>
                    </div>
                {:else}
                    <div class="message" style="align-self: flex-end;">
                        <div
                            class="content"
                            style="background-color: var(--message-back);"
                        >
                            {#each message.text.split("\n") as string}
                                <span class="text">{string}</span>
                            {/each}
                            <span
                                style="font-size: 12px; align-self: flex-end; margin-top: 2px;"
                            >
                                {new Date(
                                    messages[index].time
                                ).toLocaleTimeString("en-GB", {
                                    hour: "numeric",
                                    minute: "numeric",
                                })}
                            </span>
                        </div>
                        <div class="icon">
                            <img class="avatar" src={placeholder} alt="" />
                        </div>
                        <script>
                            element =
                                document.getElementsByClassName(
                                    "chat_messages"
                                )[0];
                            element.scrollTop = element.scrollHeight;
                        </script>
                    </div>
                {/if}

                <script>
                    element =
                        document.getElementsByClassName("chat_messages")[0];
                    if (element.scrollTop + 1000 > element.scrollHeight)
                        element.scrollTop = element.scrollHeight;
                </script>
            {/each}
            <script>
                element = document.getElementsByClassName("chat_messages")[0];
                element.scrollTop = element.scrollHeight;
            </script>
        {:else}
            <span
                style="display: flex; justify-content: center; align-items: center; flex: 1 1 auto;"
                >Кажется, здесь ничего нет...</span
            >
        {/if}
    </div>
    <!-- ./chat_messages -->
    <div class="chat_footer">
        <button title="Прикрепить файл">
            {#if theme == "white"}
                <img id="icon" class="nav_icon" src={attachment} alt="" />
            {:else}
                <img id="icon" class="nav_icon" src={attachment_dark} alt="" />
            {/if}
        </button>
        <textarea
            on:keypress={(event) => {
                if (event.keyCode == 13 && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                }
            }}
            placeholder="Введите сообщение..."
            bind:value={text}
        />
        <button
            title="Отправить"
            type="submit"
            on:click={() => sendMessage()}
            on:keydown={on_key_down}
        >
            {#if theme == "white"}
                <img id="icon" class="nav_icon" src={play} alt="" />
            {:else}
                <img id="icon" class="nav_icon" src={play_dark} alt="" />
            {/if}
        </button>
    </div>
    <!-- ./chat_footer -->
    <dialog id="dialog">
        <div class="dailog_content">
            <div class="header">
                <img class="avatar" src={placeholder} alt="">
                <div class="header_content">
                    <p>{room}</p>
                    <p style="font-weight: 400; font-size: 14px">участников {count}</p>
                </div>
            </div>
            <p>{count} members</p>
            <div class="room_content">
                {#each profiles as profile}
                <div class="profile">
                    <a href="/{profile.user.login}"><img class="avatar" src={placeholder} alt=""></a>
                    <div class="profile_info">
                        <a href="/{profile.user.login}"><p style="font-size: 14px;">{profile.first_name} {profile.last_name}</p></a>
                        <p style="font-weight: 400; font-size: 14px">Был в сети</p>
                    </div>
                </div>
                {/each}
            </div>
        </div>
        <button onclick="window.dialog.close();" aria-label="close" class="x">❌</button>
    </dialog>
</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        background-color: var(--sidebar-color);
        height: 100%;
        min-height: 95vh;
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .chat_header {
        border-radius: 15px 15px 0 0;
        height: 6vh;
        background-color: var(--primary-head);
        display: flex;
        flex-direction: row;
    }
    .chat_messages {
        flex: 1 1 auto;
    }
    .chat_footer {
        height: 65px;
        border-radius: 0 0 15px 15px;
        background-color: var(--primary-head);
        display: flex;
        flex-direction: row;
        padding: 0 10px;
    }
    textarea {
        margin: 10px;
        flex: 1 1 auto;
        background-color: transparent;
        border-radius: 5px;
        border: none;
        padding: 12px 15px;
        font-size: 14px;
        color: var(--text-color);
        font-weight: 500;
        outline: none;
        resize: none;
    }
    textarea::placeholder {
        color: var(--primary-head);
    }
    .chat_footer .nav_icon {
        width: 28px;
        height: 28px;
        margin: auto 10px;
    }
    .chat_footer button {
        display: flex;
        background-color: transparent;
        border: none;
        margin: 10px 0;
    }
    .chat_footer button:hover {
        cursor: pointer;
    }
    .chat_footer button img {
        height: 24px;
        width: 24px;
    }
    .title_box {
        display: inline-flex;
        flex-direction: column;
        text-align: center;
        flex: 1 1 auto;
        margin: auto;
    }
    .title {
        font-size: 16px;
    }
    .count {
        font-size: 14px;
        color: var(--primary-color);
    }
    .back,
    .info {
        width: 100px;
    }
    .back {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 15px;
        justify-content: space-around;
    }
    .info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 10px 15px 10px 0;
        align-items: center;
    }
    .avatar {
        border-radius: 50%;
    }

    .chat_messages {
        display: flex;
        flex-direction: column;
        max-height: 82vh;
        overflow-y: auto;
    }

    .message {
        display: flex;
        flex-direction: row;
        margin: 0 15px;
        padding: 10px;
        align-self: flex-start;
    }
    .content {
        word-wrap: break-word;
        min-width: 90px;
        max-width: 400px;
        margin: 0 10px;
        padding: 10px 15px;
        border-radius: 20px;
        background-color: var(--primary-color);
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .icon img {
        width: 40px;
    }
    .text {
        word-wrap: break-word;
    }
    .model_button {
        background-color: transparent; 
        border: none; 
        width:35px; 
        height:35px;
    }
    .model_button:hover {
        cursor: pointer;
    }
    dialog {
        margin: auto;
        color: var(--text-color);
        padding: 1rem 3rem;
        background: #252525;
        width: 500px;
        padding-top: 2rem;
        border-radius: 20px;
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
    }
    .header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .header img {
        height: 75px;
        border-radius: 50%;
        margin-right: 20px;
    }
    div p {
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
        margin: 0 10px;
    }
</style>