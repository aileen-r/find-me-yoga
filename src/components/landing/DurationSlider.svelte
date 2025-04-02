<script>
	import { createEventDispatcher } from 'svelte';
	import RangeSlider from 'svelte-range-slider-pips';

	const dispatch = createEventDispatcher();

	function onDurationChange(e) {
		dispatch('option-selected', {
      id: 1, // TODO: magic
			param: `minDuration=${values[0]}&maxDuration=${values[1]}`
		});
	}

	let values = [20, 30];
</script>

<RangeSlider
	float
	pips
	pipstep={10}
	all="label"
	range
	pushy
	bind:values
	min={0}
	max={120}
	on:change={onDurationChange}
/>
