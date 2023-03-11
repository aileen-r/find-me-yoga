<script>
	import { createEventDispatcher } from 'svelte';

	import questions from '../../data/questions';
	import Question from './Question.svelte';

	const validIds = questions.map((q) => q.id);

	let queryParamsByQuestionId = new Map();
	$: ctaDisabled = queryParamsByQuestionId.size === 0;

	function handleOptionSelected(e) {
		if (!validIds.includes(e.detail.id)) {
			console.warn('Invalid question id. Id', e.detail.id);
			return;
		}
		queryParamsByQuestionId = queryParamsByQuestionId.set(e.detail.id, e.detail.param);
	}

  const dispatch = createEventDispatcher();

	function handleCtaClick() {
		dispatch('find-me-yoga', {
			queryString: [...queryParamsByQuestionId.values()].join('&')
		});
	}
</script>

<div class="questions-container">
	{#each questions as question}
		<Question
			id={question.id}
			questionText={question.question}
			options={question.options}
			on:option-selected={handleOptionSelected}
		/>
	{/each}
	<button on:click={handleCtaClick} disabled={ctaDisabled} class="cta">Find me yoga</button>
</div>

<style lang="scss">
	.questions-container {
		margin-top: 60px;
		text-align: center;
		width: 100%;

		.cta {
			margin-top: 2em;
		}
	}
</style>
