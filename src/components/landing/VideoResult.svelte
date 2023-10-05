<script>
	import { createEventDispatcher } from 'svelte';
	import VideoThumbnail from './VideoThumbnail.svelte';

	const dispatch = createEventDispatcher();

	function backToStart() {
		dispatch('back-to-start');
	}

	export let videoData;
	let extendedVideoData = {
		video: { ...videoData.video, excluded: false },
		others: videoData.others.map((video) => ({ ...video, excluded: false }))
	};

	$: video = extendedVideoData.video;
	$: others = extendedVideoData.others;

	function excludeVideo(event) {
		const url = event.detail.url;
		if (video.url === url) {
			extendedVideoData.video.excluded = true;
			return;
		}
		const videoIdx = others.findIndex((video) => video.url === url);
		extendedVideoData.others[videoIdx].excluded = true;
	}
</script>

<article class="text-center">
	<div class="card" class:opacity-40={video.excluded} class:grayscale={video.excluded}>
		<h2 class="underline-hover-inverted w-max text-2xl font-bold mx-auto mb-3 pb-2">
			{#if video.excluded}
				<span>{video.title}</span>
			{:else}
				<a
					class="card-primary-action"
					href={video.url}
					target="_blank"
					rel="noopener noreferrer nofollow">{video.title}</a
				>
			{/if}
		</h2>
		<VideoThumbnail
			url={video.url}
			thumbnail={video.thumbnail}
			title={video.title}
			subscription={video.subscription}
			duration={video.duration}
			on:exclude-video={excludeVideo}
		/>
	</div>

	{#if others.length}
		<h3 class="text-xl mt-8 mb-3 text-left">Or, you could try...</h3>
		<div class="flex gap-2">
			{#each others as otherVideo}
				<div class="card w-1/3" class:opacity-40={otherVideo.excluded} class:grayscale={otherVideo.excluded}>
					<VideoThumbnail
						url={otherVideo.url}
						thumbnail={otherVideo.thumbnail}
						title={otherVideo.title}
						subscription={otherVideo.subscription}
						duration={otherVideo.duration}
						size="small"
						on:exclude-video={excludeVideo}
					/>
					<h4>
						{#if otherVideo.excluded}
							<span>{otherVideo.title}</span>
						{:else}
							<a
								class="card-primary-action underline hover:no-underline"
								href={otherVideo.url}
								target="_blank"
								rel="noopener noreferrer nofollow">{otherVideo.title}</a
							>
						{/if}
					</h4>
				</div>
			{/each}
		</div>
	{/if}
	<button class="btn" on:click={backToStart} type="button">Back to start</button>
</article>
