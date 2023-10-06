<script>
	import { createEventDispatcher } from 'svelte';
	import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

	import OptionTile from './OptionTile.svelte';

	export let id;
	export let questionText;
	export let options;

	let selectedOption;

	const dispatch = createEventDispatcher();

	function updateSelection(e) {
		selectedOption = e.detail;
		dispatch('option-selected', {
			id,
			param: e.detail
		});
	}
</script>

<!-- https://svelte-headlessui.goss.io/docs/radio-group -->
<RadioGroup
	class="flex flex-wrap justify-center gap-3"
	value={selectedOption}
	on:change={updateSelection}
>
	<RadioGroupLabel class="grow shrink-0 basis-full text-lg">{questionText}</RadioGroupLabel>
	{#each options as option}
		<RadioGroupOption
			class="rounded-xl focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-600 focus-visible:ring-offset-2"
			value={option.param}
			let:checked
		>
			<OptionTile {checked} text={option.displayText} />
		</RadioGroupOption>
	{/each}
</RadioGroup>
