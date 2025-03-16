<script>
	import { createEventDispatcher } from 'svelte';
	import RangeSlider from 'svelte-range-slider-pips';

	const dispatch = createEventDispatcher();

	function onDurationChange(e) {
		dispatch('option-selected', {
      id: 1, // TODO: magic
			param: values[0]
		});
	}

	let values = [20];
</script>

<RangeSlider
	float
	pips
	pipstep={10}
	all="label"
	bind:values
	min={0}
	max={120}
	on:change={onDurationChange}
/>
