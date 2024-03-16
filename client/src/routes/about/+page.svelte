<script lang="ts" type="module" context="module">
	import { DataTransfer } from "../../lib/utils";
	const data = new DataTransfer("http://localhost:18001", { id: 1, name: "1992"});
	console.log(data)
	// socket.socket.on("connect", () => {

    //     socket.socket.emit("joinRoom", "1992");
	// })
	
	// let joined = false
	// const join = () => {
    //     socket.socket.emit("join", { name: 31 }, () => {
    //         joined = true;
    //         socket.socket.emit("joinRoom", "1992");
    //     });
    // };
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<div>
		<form>
			<span>What's your name?</span>\
			<!-- <button type="submit" on:click={() => join()}>Send</button> -->
		</form>
	</div>
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
