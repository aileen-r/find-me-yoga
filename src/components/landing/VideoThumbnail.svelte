<script>
	import Image from '../global/Image.svelte';

	export let thumbnail;
	export let title;
	export let subscription;
	export let duration;
	export let size = 'large';

	function getDurationPillClass(size) {
		let pillClass =
			'absolute bottom-0 right-0 pb-0.5 px-2 bg-zinc-900/80 text-zinc-50 rounded-full';
		if (size === 'small') {
			pillClass += ' mx-2 my-1 text-xs';
		}
		if (size === 'large') {
			pillClass += ' mx-3 my-2';
		}
		return pillClass;
	}

	$: durationPillClass = getDurationPillClass(size);
</script>

<figure class="relative">
	<Image
		className="w-full"
		src={thumbnail}
		alt={`Thumbnail for video ${title} on ${subscription}.`}
	/>
	<span class={durationPillClass}>{duration}</span>
</figure>
