<script lang="ts">
	import "../../app.css";
	export let groups: string[];
	export let value: string;

	let isOpen = false;
	let dropdownMenu: HTMLElement | null;
	let search: string = "";
	export let showInput = true;

	function toggleDropdown() {
		isOpen = !isOpen;
		hidden = hidden == "" ? "hidden" : "";
	}

	function onInput() {
		const searchTerm = search.toLowerCase();
		const items = dropdownMenu!.querySelectorAll("span");

		items.forEach((item) => {
			const text = item.textContent!.toLowerCase();
			if (text.includes(searchTerm)) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
		});
	}

	let hidden: string = "hidden";
</script>

<div style="margin-right: 10px;" class="relative group outline-none">
	<button
		style="height: 40px; box-shadow: var(--box-shadow) 0px 4px 12px; "
		on:click={() => toggleDropdown()}
		id="dropdown-button"
		class="border-none active:border-none inline-flex outline-none justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 active:border-none active:outline-none"
	>
		<span class="mr-2">{value}</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-5 h-5 ml-2 -mr-1"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	<div
		bind:this={dropdownMenu}
		id="dropdown-menu"
		class="w-52 overflow-auto max-h-40 {hidden} absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
	>
		<!-- Search input -->
		{#if showInput}
			<input
				bind:value={search}
				on:input={() => onInput()}
				id="search-input"
				class="block w-full px-4 py-2 text-gray-800 text-sm border rounded-md border-gray-300 focus:outline-none"
				type="text"
				placeholder="Найти группу"
				autocomplete="off"
			/>
		{/if}
		<!-- Dropdown content goes here -->
		{#each groups as group}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				id="span"
				on:click={() => {
					value = group;
					hidden = "hidden";
				}}
				class="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
				>{group}</span
			>
		{/each}
	</div>
</div>

<style>
	button {
		background-color: var(--primary-color);
		color: var(--text-color);
	}
	#dropdown-menu {
		background-color: var(--body-color);
		color: var(--text-color);
	}
	#span {
		color: var(--text-color);
	}
	#span:hover {
		background-color: var(--primary-color-light);
	}
	#search-input {
		background-color: var(--primary-color-light);
		border-color: var(--primary-color-light);
		color: var(--text-color);
	}
</style>
