<script lang="ts" type="module">
    import type { IMessage } from "../../lib/types";
	import { Chat } from '../../lib/utils';
	
    let row = 5;
	// const socket = new SocketChat("http://localhost:18001", { id: 1, name: "1992"});
    let messages: Array<IMessage> = [];
	
	let element;

	// socket.socket.on("connect", () => {
	// 	socket.socket.on("getMessages", (response: IMessage[]) => {
	// 		messages = [...messages, ...response];
	// 	})
	// })

	let files: any;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<div>
		<form>
			<span>What's your name?</span>\
			<!-- <button type="submit" on:click={() => socket.join(31, false)}>Send</button> -->
		</form>
	</div>

	<div bind:this={element} style="height:250px;overflow:auto; font-size: 20px">
		{#each messages as message}
			{#each messages as col}
				{col}
			{/each}
		{/each}
	</div>

	<input type="file" bind:files>


	<h1>About this app</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>

	<p>
		The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!
	</p>
</div>
