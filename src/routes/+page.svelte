<script>
	import QuestionsContainer from '../components/landing/QuestionsContainer.svelte';
	import Loader from '../components/landing/Loader.svelte';

	const PAGE_STATES = Object.freeze({
		loading: 'loading',
		questions: 'questions',
		video: 'video',
		error: 'error'
	});

	let activeState = PAGE_STATES.loading;
	let video;

	async function findMeYoga(e) {
		activeState = PAGE_STATES.loading;
		const url = `/.netlify/functions/videos?${e.detail.queryString}&random=true`;
		const response = await fetch(url);
		if (response.ok) {
			video = await response.json();
			activeState = PAGE_STATES.video;
		} else {
			activeState = PAGE_STATES.error;
		}
	}

	function backToStart() {
		activeState = PAGE_STATES.questions;
	}
</script>

{#if activeState === PAGE_STATES.loading}
	<div class="flex flex-col items-center">
		<Loader />
	</div>
{:else if activeState === PAGE_STATES.questions}
	<QuestionsContainer on:find-me-yoga={findMeYoga} />
{:else if activeState === PAGE_STATES.video}
	<h2>Try one of these videos:</h2>
	<p>
		Your video: <a href={video.url} target="_blank" rel="noopener noreferrer nofollow"
			>{video.title}</a
		>
		({video.duration})
	</p>
	<button on:click={backToStart} type="button">Back to start</button>
{:else if activeState === PAGE_STATES.error}
	<h2>Something went wrong</h2>
{/if}
