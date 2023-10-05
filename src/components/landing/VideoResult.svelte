<script>
	import { createEventDispatcher } from 'svelte';
	import VideoThumbnail from './VideoThumbnail.svelte';

	const dispatch = createEventDispatcher();

	function backToStart() {
		dispatch('back-to-start');
	}

	export let videoData;
	$: video = videoData.video;
	$: others = videoData.others.map(video => ({...video, excluded: false}));
</script>

<article class="text-center">
	<div class="card">
		<h2 class="underline-hover-inverted w-max text-2xl font-bold mx-auto mb-3 pb-2">
			<a
				class="card-primary-action"
				href={video.url}
				target="_blank"
				rel="noopener noreferrer nofollow">{video.title}</a
			>
		</h2>
		<VideoThumbnail
			thumbnail={video.thumbnail}
			title={video.title}
			subscription={video.subscription}
			duration={video.duration}
		/>
	</div>

	{#if others.length}
		<h3 class="text-xl mt-8 mb-3 text-left">Or, you could try...</h3>
		<div class="flex gap-2">
			{#each others as otherVideo}
				<div class="card w-1/3">
					<VideoThumbnail
						thumbnail={otherVideo.thumbnail}
						title={otherVideo.title}
						subscription={otherVideo.subscription}
						duration={otherVideo.duration}
						size="small"
					/>
					<h4 class="underline hover:no-underline">
						<a
							class="card-primary-action"
							href={otherVideo.url}
							target="_blank"
							rel="noopener noreferrer nofollow">{otherVideo.title}</a
						>
					</h4>
				</div>
			{/each}
		</div>
	{/if}
	<button class="btn" on:click={backToStart} type="button">Back to start</button>
</article>
