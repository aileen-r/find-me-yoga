<script>
	import { createEventDispatcher } from 'svelte';
	import Image from '../global/Image.svelte';
	import VideoThumbnail from './VideoThumbnail.svelte';

	const dispatch = createEventDispatcher();

	function backToStart() {
		dispatch('back-to-start');
	}

	export let videoData;
	$: video = videoData.video;
	$: others = videoData.others;
</script>

<article class="text-center">
	<a class="block focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-400 focus-visible:ring-offset-4 focus-visible:rounded" href={video.url} target="_blank" rel="noopener noreferrer nofollow"
		><h2 class="underline-hover-inverted w-max text-2xl font-bold mx-auto mb-3 pb-2">
			{video.title}
		</h2>
		<VideoThumbnail
			thumbnail={video.thumbnail}
			title={video.title}
			subscription={video.subscription}
			duration={video.duration}
		/>
	</a>

	{#if others.length}
		<h3 class="text-xl mt-8 mb-3 text-left">Or, you could try...</h3>
		<div class="flex gap-2">
			{#each others as otherVideo}
				<div class="w-1/3">
					<a
						class="block focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:rounded-sm"
						href={otherVideo.url}
						target="_blank"
						rel="noopener noreferrer nofollow">
						<VideoThumbnail
							thumbnail={otherVideo.thumbnail}
							title={otherVideo.title}
							subscription={otherVideo.subscription}
							duration={otherVideo.duration}
							size="small"
						/>
						<h4 class="underline hover:no-underline">{otherVideo.title}</h4></a
					>
				</div>
			{/each}
		</div>
	{/if}
	<button
		class="btn"
		on:click={backToStart}
		type="button">Back to start</button
	>
</article>
