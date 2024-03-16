<script>
	/**
	 * @typedef Image
	 * @param {string} url
	 * @param {string} alt
	*/

	/** @type {boolean} */
	export let checked;
	/** @type {string} */
	export let text;
  /** @type {Image} */
	export let image;
</script>

<div
	class="border-[6px] border-zinc-300 rounded-xl w-36 h-36 relative cursor-pointer hover:bg-zinc-300"
	class:checked
>
	{#if image}
		<img
			class="mt-2 mx-auto mb-0 relative w-20 h-20"
			alt={image.alt}
			src={image.url}
		/>
	{/if}
	<span class="absolute w-full left-0 bottom-3">{text}</span>
</div>

<style>
	.checked {
		@apply bg-zinc-500;
		@apply border-zinc-500;
		@apply text-zinc-50;
	}
</style>
