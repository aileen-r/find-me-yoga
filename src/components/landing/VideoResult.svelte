<script>
	import { createEventDispatcher } from 'svelte';
	import Image from '../global/Image.svelte';

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
		<figure class="relative">
			<Image
				className="w-full"
				src={video.thumbnail}
				alt={`Thumbnail for video ${video.title} on ${video.subscription}.`}
			/>
			<span
				class="absolute bottom-0 right-0 mx-3 my-2 pb-0.5 px-2 bg-zinc-900/80 text-zinc-50 rounded-full"
				>{video.duration}</span
			>
		</figure>
	</a>

	{#if others.length}
		<h3 class="text-xl mt-8 mb-3 text-left">Or, you could try...</h3>
		<div class="flex gap-2">
			{#each others as otherVideo}
				<div class="w-1/3">
					<a
						class="block focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:rounded-sm"
						href={video.url}
						target="_blank"
						rel="noopener noreferrer nofollow">
						<figure class="relative">
							<Image
								className="w-full"
								src={otherVideo.thumbnail}
								alt={`Thumbnail for video ${otherVideo.title} on ${otherVideo.subscription}.`}
							/>
							<span
								class="absolute bottom-0 right-0 mx-2 my-1 pb-0.5 px-2 bg-zinc-900/80 text-zinc-50 text-xs rounded-full"
								>{otherVideo.duration}</span
							>
						</figure>
						<h4 class="underline hover:no-underline">{otherVideo.title}</h4></a
					>
				</div>
			{/each}
		</div>
	{/if}
	<button
		class="px-8 pt-1.5 pb-2 mt-5 bg-zinc-500 text-base text-zinc-50 rounded-full cursor-pointer hover:bg-zinc-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-600 focus-visible:ring-offset-2"
		on:click={backToStart}
		type="button">Back to start</button
	>
</article>
