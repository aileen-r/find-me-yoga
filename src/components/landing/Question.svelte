<script>
	import { createEventDispatcher } from 'svelte';
	import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

	import { actionTypes } from '../../data/questions';

	import OptionTile from './OptionTile.svelte';

	export let id;
	export let questionText;
	export let options;

	let selectedOption;
	let visibleOptions = options;

	const dispatch = createEventDispatcher();

	function updateSelection(e) {
		selectedOption = e.detail;
		if (e.detail.param) {
			dispatch('option-selected', {
				id,
				param: e.detail.param
			});
			return;
		}
		if (e.detail.action === actionTypes.expandOptions) {
			visibleOptions = e.detail.options;
		} else if (e.detail.action === actionTypes.collapseOptions) {
			visibleOptions = options;
		}
	}
</script>

<!-- https://svelte-headlessui.goss.io/docs/radio-group -->
<RadioGroup
	class="flex flex-wrap justify-center gap-3"
	value={selectedOption}
	on:change={updateSelection}
>
	<RadioGroupLabel class="grow shrink-0 basis-full text-lg">{questionText}</RadioGroupLabel>
	{#each visibleOptions as option}
		<RadioGroupOption
			class="rounded-xl focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-600 focus-visible:ring-offset-2"
			value={option}
			let:checked
		>
			<OptionTile {checked} text={option.displayText} image={option.image} />
		</RadioGroupOption>
	{/each}
</RadioGroup>
