<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "../$types";
	export let data: PageData;
	let aElem: HTMLAnchorElement;
	let url;
	console.log(data)
	onMount(() => {
		url = window.URL.createObjectURL(new Blob([new Uint8Array(data.buffer.data).buffer]));	
		console.log(aElem.href)
		aElem.href = url;
		console.log(aElem.href)
		aElem.setAttribute('download', 'yourcoolpdf.pdf');
	})

</script>


<section>
	<div>
		<!-- svelte-ignore a11y-missing-content -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a bind:this={aElem} href="#">фывыф</a>
		<a href="path_to_file" download="proposed_file_name">Download</a>

	</div>
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