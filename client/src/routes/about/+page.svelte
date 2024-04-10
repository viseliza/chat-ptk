<script lang="ts" type="module">
    import Message from "../../lib/components/Chat/Message.svelte";
    import type { IMessage } from "../../lib/types";
	import Chat from '../../lib/utils/Chat';
    import SocketChat from "../../lib/utils/SocketService";

    let row = 5;
	const socket = new SocketChat("https://viseliza.site/api", { id: 1, name: "1992"});
    let messages: Array<IMessage> = [];
	let element: Element;

	socket.socket.on("connect", () => {
		socket.socket.on("getMessages", (response: IMessage[]) => {
			messages = [...messages, ...response];
		})
	})

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
			<button type="submit" on:click={() => Chat.scrollDown(element)}>Send</button>
		</form>
	</div>

	<div bind:this={element} style="height:250px;overflow:auto; font-size: 20px">
		{#each messages as message}
			{#each messages as col}
				{col}
			{/each}
		{/each}
	</div>

	<Message message={{
		id:	20,
		user_id: 31,
		text: "dd",
		time: new Date().toLocaleDateString()
	}} 
		isMe={true} 
		isLessThan5Minute={false}
		isPrevious={false}
	></Message>
	<Message message={{
		id:	20,
		user_id: 31,
		text: "dd",
		time: new Date().toLocaleDateString()
	}} 
		isMe={true} 
		isLessThan5Minute={true}
		isPrevious={true}
	></Message>
	
	<Message message={{
		id:	20,
		user_id: 31,
		text: "dd",
		time: new Date().toLocaleDateString()
	}} 	
		isMe={false} 
		isLessThan5Minute={true}
		isPrevious={false}	
	></Message>
	<Message message={{
		id:	20,
		user_id: 31,
		text: "dd",
		time: new Date().toLocaleDateString()
	}} 
		isMe={false} 
		isLessThan5Minute={true}
		isPrevious={true}
	></Message>

	
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

