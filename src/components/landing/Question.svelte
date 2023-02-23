<script>
	import OptionTile from './OptionTile.svelte';

	export let questionText;
	export let options;
</script>

<div class="question">
	<p class="question-text">{questionText}</p>

  <!-- Maybe want to try an accessible "picker" -->
  <!-- https://svelte-headlessui.goss.io/docs/radio-group -->

	<div class="options">
		{#each options as optionText}
			<OptionTile text={optionText} class="option-tile" />
		{/each}
	</div>
</div>

<style lang="scss">
	.question {
		text-align: center;
		width: 100%;

		.options {
			display: flex;
			justify-content: center;
		}
	}
</style>
