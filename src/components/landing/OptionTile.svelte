<script>
	export let checked;
	export let text;
</script>

<div
	class="border-[6px] border-zinc-300 rounded-xl w-36 h-36 relative cursor-pointer hover:bg-zinc-300"
	class:checked
>
	<img
		class="mt-2 mx-auto mb-0 relative"
		alt="Placeholder"
		src="https://dummyimage.com/80x80/fafafa/000"
	/>
	<span class="absolute w-full left-0 bottom-3">{text}</span>
</div>

<style>
	.checked {
		@apply bg-zinc-500;
		@apply border-zinc-500;
		@apply text-zinc-50;
	}
</style>
