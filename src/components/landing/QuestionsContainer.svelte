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

<div class="w-full text-center">
	{#each questions as question}
		<Question
			id={question.id}
			questionText={question.question}
			options={question.options}
			on:option-selected={handleOptionSelected}
		/>
	{/each}
	<button
		class="px-8 pt-1.5 pb-2 bg-zinc-500 text-zinc-50 rounded-full cursor-pointer hover:bg-zinc-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-600 focus-visible:ring-offset-2"
		on:click={handleCtaClick}
		disabled={ctaDisabled}>Find me yoga</button
	>
</div>
