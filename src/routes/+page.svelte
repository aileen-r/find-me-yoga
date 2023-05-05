<script>
	import { indexPageStateStore, PAGE_STATES } from '../stores.js';
	
	import QuestionsContainer from '../components/landing/QuestionsContainer.svelte';
	import VideoResult from '../components/landing/VideoResult.svelte';
	import Loader from '../components/landing/Loader.svelte';

	let activeState;
	indexPageStateStore.subscribe((value) => {
		activeState = value;
	});

	let videoData;
	let error = 'Something went wrong.';

	async function findMeYoga(e) {
		indexPageStateStore.update(PAGE_STATES.loading);
		const url = `/.netlify/functions/videos?${e.detail.queryString}&random=true`;
		const response = await fetch(url);
		if (response.ok && response.status === 200) {
			videoData = await response.json();
			indexPageStateStore.update(PAGE_STATES.video);
		} else if (response.ok && response.status === 204) {
			error = 'No videos found.';
			indexPageStateStore.update(PAGE_STATES.error);
		} else {
			indexPageStateStore.update(PAGE_STATES.error);
		}
	}

	function backToStart() {
		indexPageStateStore.reset();
	}
</script>

{#if activeState === PAGE_STATES.loading}
	<div class="flex flex-col items-center">
		<Loader />
	</div>
{:else if activeState === PAGE_STATES.questions}
	<QuestionsContainer on:find-me-yoga={findMeYoga} />
{:else if activeState === PAGE_STATES.video}
	<VideoResult {videoData} on:back-to-start={backToStart} />
{:else if activeState === PAGE_STATES.error}
	<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
		<h2>Error</h2>
		<p>{error}</p>
		<button
			class="px-8 pt-1.5 pb-2 bg-zinc-500 text-base text-zinc-50 rounded-full cursor-pointer hover:bg-zinc-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-600 focus-visible:ring-offset-2"
			on:click={backToStart}
			type="button">Back to start</button
		>
	</article>
{/if}
