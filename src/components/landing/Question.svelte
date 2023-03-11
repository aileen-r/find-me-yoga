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

<div class="question">
	<!-- https://svelte-headlessui.goss.io/docs/radio-group -->
	<RadioGroup class="radio-group" value={selectedOption} on:change={updateSelection}>
		<RadioGroupLabel class="radio-group-label">{questionText}</RadioGroupLabel>
		{#each options as option}
			<RadioGroupOption value={option.param} let:checked>
				<OptionTile {checked} text={option.displayText} />
			</RadioGroupOption>
		{/each}
	</RadioGroup>

	<!-- <div class="options">
		{#each options as optionText}
			<OptionTile text={optionText} class="option-tile" />
		{/each}
	</div> -->
</div>

<style lang="scss">
	.question {
		text-align: center;
		width: 100%;

		:global(.radio-group) {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			:global(.radio-group-label) {
				flex: 1 0 100%;
			}
		}
	}
</style>
