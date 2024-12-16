<script>
	import { fade } from 'svelte/transition';
	import indexPageStateStore, { PAGE_STATES } from '../stores/indexPage.js';
	import subscriptionsStore from '../stores/subscriptions.js';

	import QuestionsContainer from '../components/landing/QuestionsContainer.svelte';
	import VideoResult from '../components/landing/VideoResult.svelte';
	import Loader from '../components/landing/Loader.svelte';

	let activeState;
	indexPageStateStore.subscribe((value) => {
		activeState = value;
	});

	let subscriptionsQueryParam;
	subscriptionsStore.subscribe((value) => {
		// TODO: simplify to a reduce
		subscriptionsQueryParam = value
			.filter((subs) => subs.enabled)
			.map((subs) => encodeURIComponent(subs.name))
			.join(',');
	});

	let videoData;
	let error = 'Something went wrong.';

	async function findMeYoga(e) {
		indexPageStateStore.update(PAGE_STATES.loading);
		const url = `/.netlify/functions/videos?${e.detail.queryString}&random=true&subscriptions=${subscriptionsQueryParam}&excluded=true`;
		const response = await fetch(url);
		if (response.ok && response.status === 200) {
			videoData = (await response.json()).videos;
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
	<div
		class="flex flex-col w-full h-full justify-center items-center absolute bg-zinc-50 -mt-8"
		transition:fade
	>
		<Loader />
	</div>
{/if}
{#if activeState === PAGE_STATES.questions}
	<div class="flex flex-col flex-auto" in:fade={{ delay: 601 }} out:fade>
		<QuestionsContainer on:find-me-yoga={findMeYoga} />
	</div>
{:else if activeState === PAGE_STATES.video}
	<div in:fade={{ delay: 601 }} out:fade>
		<VideoResult {videoData} on:back-to-start={backToStart} />
	</div>
{:else if activeState === PAGE_STATES.error}
	<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
		<h2>Error</h2>
		<p>{error}</p>
		<button class="btn-primary" on:click={backToStart} type="button">Back to start</button>
	</article>
{/if}
