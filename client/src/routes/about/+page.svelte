<script>
	import { fly } from 'svelte/transition';
	
	let emojiSets = [
		{ type: "faces", minVal:128512, maxVal: 128580 },
		{ type: "faces2", minVal:129296, maxVal: 129327},
		{ type: "body", minVal:128066, maxVal: 128080},
		{ type: "animals", minVal:129408, maxVal: 129442},
		{ type: "transport", minVal:128640, maxVal: 128676},
		{ type: "misc", minVal:129494, maxVal: 129535},
			
	];
	
	let selectedSet = 0;
	// $: console.log(selectedSet)
	$: min = emojiSets[selectedSet].minVal;
	$: max = emojiSets[selectedSet].maxVal;
	
	// storage of emojis to make emoji keyboard
	let emojis = [];
	
	$: for (let i = min; i <= max; i++) {
		//console.log(String.fromCharCode(i))
		emojis = [...emojis, String.fromCodePoint(i)]
	}
	
	const clearEmojiMenu = () => emojis = []; 
	
	const chooseEmojiSet = (e) => {	
		selectedSet = Number(e.target.dataset.id);
		clearEmojiMenu()
	}

	// Header on emoji keyboard to select different emoji sets
	let setIcons = [128512, 129313, 128074, 129417, 128664, 129504]
	
	// Emoji icon to open modal of emojis
	let emojiIcon = String.fromCodePoint(128571);
	
	// Modal of emoji keyboard
	let modalOpen = false;
	
	// CHAT MESSAGE
	let textBox; // for bind:this
	let message = "";
	
	const addEmoji = (e) => {
		message += e.target.textContent
	}
	
	const submitMsg = () => {
		console.log(`The message: (${message}) has been sent.`);	
		textBox.value = ""; // this line is not needed since message will control the value
		message = "";
		modalOpen = false; // close emoji menu
	}
	
	// Emoji Testing Area
	// console.log("😻".charCodeAt(0))
	// console.log(String.fromCharCode(128571))
	console.log("🧠".codePointAt(0))
	console.log(String.fromCodePoint(127757))
</script>


<section>
	<div class="chat-popup" id="myForm">
		<form class="form-container" on:submit|preventDefault={submitMsg}>
			<h1>Chat</h1>

			<label for="msg"><b>Message</b></label>
			<textarea placeholder="Type message.." 
								name="msg" 
								required
								bind:this={textBox}
								bind:value={message}></textarea>

			<div id="btn-emoji-icon-cont">
				<button type="submit" class="btn">Send</button>
				<div id="emoji-opener-icon" on:click={() => modalOpen = true}>{emojiIcon}</div>
			</div>
		</form>

	</div>

	{#if modalOpen}
		<div id="emoji-cont" transition:fly={{ y: -30 }}>
			<header>
				{#each setIcons as icon, i}
					<div data-id={i} on:click={chooseEmojiSet}>{String.fromCodePoint(icon)}</div>		
				{/each}
					<div id="closer-icon" on:click={() => modalOpen = false}>X</div>
			</header>

			{#each emojis as emoji}
				<span on:click={addEmoji}>{emoji}</span>
			{/each}
		</div>
	{/if}
</section>	


<style>
  * {box-sizing: border-box;}

	section {
		width: 300px;
		margin: 0 auto;
	}
	
	/* Add styles to the form container */
	.form-container {
		max-width: 300px;
		padding: 10px;
		background-color: white;
	}

	/* Full-width textarea */
	.form-container textarea {
		width: 100%;
		padding: 15px;
		margin: 5px 0 22px 0;
		font-size: 1.5rem;
		border: none;
		background: #ddd;
		resize: none;
		min-height: 200px;
	}

	/* When the textarea gets focus, do something */
	.form-container textarea:focus {
		background-color: #ddd;
		outline: none;
	}

	/* Set a style for the submit/login button */
	.form-container .btn {
		background-color: #4CAF50;
		color: white;
		padding: 16px 20px;
		border: none;
		cursor: pointer;
		width: 80%;
		margin-bottom:10px;
		opacity: 0.8;
	}
	
	.form-container .btn:hover {
		opacity: 1;
	}
	
	#btn-emoji-icon-cont {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#emoji-opener-icon {
		font-size: 2rem;
		cursor: pointer;
		transition: all .1s;
	}
	
	#emoji-opener-icon:active {
		font-size: 2.3rem;
		transform: rotate(10deg);
		cursor: pointer;
	}
	
	#emoji-cont {
		max-width: 300px;
		max-height: 248px;
		overflow: scroll;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-left: 10px;
/* 		border: 1px solid gray;
		background: #ddd; */
	}
	
	#emoji-cont header {
		width: 98%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border: 1px solid gray;
	}
	
	#emoji-cont header div {
		cursor: pointer;
	}
	
	span {
		font-size: 1.5rem;
		padding: .3rem;
		border: 1px solid gray;
		background: #eee;
		cursor: pointer;
	}
	
	span:active {
		background: #fff;
	}
	
	#closer-icon {
		font-size: 1.5rem;
		font-weight: bold;
		text-align: right;
	}
</style>