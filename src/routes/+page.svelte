<script>
	import QuestionsContainer from '../components/landing/QuestionsContainer.svelte';

	const PAGE_STATES = Object.freeze({
		loading: 'loading',
		questions: 'questions',
		video: 'video'
	});

	let activeState = PAGE_STATES.questions;
	let video;

	async function findMeYoga(e) {
		activeState = PAGE_STATES.loading;
		const url = `/.netlify/functions/videos?${e.detail.queryString}`;
		console.log(url);
		const response = await fetch(url);
		if (response.ok) {
			video = await response.json();
			activeState = PAGE_STATES.video;
		}
	}

  function backToStart() {
    activeState = PAGE_STATES.questions;
  }
</script>

{#if activeState === PAGE_STATES.loading}
	<p>Loading...</p>
{:else if activeState === PAGE_STATES.questions}
	<QuestionsContainer on:find-me-yoga={findMeYoga} />
{:else if activeState === PAGE_STATES.video}
	<h2>Try one of these videos:</h2>
	<ul>
		{#each video as { title, url, duration }}
			<li><a href={url} target="_blank" rel="noopener noreferrer nofollow">{title}</a> ({duration})</li>
		{/each}
	</ul>
  <button on:click={backToStart} type="button">Back to start</button>
{/if}
