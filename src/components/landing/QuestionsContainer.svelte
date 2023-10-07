<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import questions from '../../data/questions';
	import Question from './Question.svelte';

	const validIds = questions.map((q) => q.id);
	const directions = Object.freeze({
		forward: 'forward',
		back: 'back'
	});
	let direction = directions.forward;
	let activeQuestion;

	let queryParamsByQuestionId = new Map();
	$: ctaDisabled = queryParamsByQuestionId.size === 0;

	function nextQuestion() {
		direction = directions.forward;
		if (activeQuestion < questions.length) {
			activeQuestion++;
		}
	}

	function previousQuestion() {
		direction = directions.back;
		activeQuestion--;
	}

	$:buttonsOutYCoord = activeQuestion === questions.length && direction === directions.forward ? 0 : 30;

	function getYCoord(questionId, isIn) {
		if (isIn) {
			return direction === directions.forward ? 30 : -30;
		} else if (questionId === questions.length) {
			return direction === directions.forward ? 0 : 30;
		} else {
			return direction === directions.forward ? -30 : 30;
		}
	}

	function handleOptionSelected(e) {
		if (!validIds.includes(e.detail.id)) {
			console.warn('Invalid question id. Id', e.detail.id);
			return;
		}
		queryParamsByQuestionId = queryParamsByQuestionId.set(e.detail.id, e.detail.param);
		nextQuestion();
	}

	const dispatch = createEventDispatcher();

	function handleCtaClick() {
		dispatch('find-me-yoga', {
			queryString: [...queryParamsByQuestionId.values()].join('&')
		});
	}

	onMount(() => {
		activeQuestion = questions[0].id;
	});
</script>

<div class="flex flex-col flex-auto items-center justify-center w-full h-full text-center">
	{#each questions as question}
		{#if activeQuestion === question.id}
			<div
				class="absolute text-center w-full -mt-24"
				in:fly|local={{
					delay: question.id > 1 || direction === directions.back ? 600 : 0,
					duration: 600,
					y: getYCoord(question.id, true)
				}}
				out:fly|local={{ duration: 600, y: getYCoord(question.id, false) }}
			>
				<Question
					id={question.id}
					questionText={question.question}
					options={question.options}
					on:option-selected={handleOptionSelected}
				/>
			</div>
		{/if}
	{/each}
	{#if activeQuestion > 1}
	<!-- TODO: sort fly firections -->
		<div class="mt-40" in:fly|local={{ delay: 600, duration: 600, y: 30 }} out:fly|local={{ duration: 600, y: buttonsOutYCoord }}>
			<button class="btn btn-secondary" on:click={() => previousQuestion()}>Back</button>
			<button class="btn btn-primary" on:click={handleCtaClick} disabled={ctaDisabled}>Find me yoga</button>
		</div>
	{/if}
</div>
