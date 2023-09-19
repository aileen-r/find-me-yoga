<script>
	import Image from '../global/Image.svelte';

  const sizes = Object.freeze({
    small: 'small',
    large: 'large'
  });

	export let thumbnail;
	export let title;
	export let subscription;
	export let duration;
	export let size = 'large';

	function getDurationPillClass(size) {
		let pillClass =
			'absolute bottom-0 right-0 pb-0.5 px-2 bg-zinc-900/80 text-zinc-50 rounded-full';
		if (size === sizes.small) {
			pillClass += ' mx-1 my-1 text-xs';
		}
		if (size === sizes.large) {
			pillClass += ' mx-2 my-2';
		}
		return pillClass;
	}

  function getOptionsButtonClass(size) {
    let buttonClass = 'absolute top-0 right-0 bg-white text-slate-800 rounded-full drop-shadow-md leading-none z-20 focus-visible:outline-none focus-visible:bg-slate-800 focus-visible:text-white';
    if (size === sizes.small) {
			buttonClass += ' mx-1 my-1 text-3xl w-7 h-7';
		}
		if (size === sizes.large) {
			buttonClass += ' mx-2 my-2 text-4xl w-8 h-8';
		}
    return buttonClass
  }

  function getDotsClass(size) {
    let dotsClass = 'absolute inset-0';
    if (size === sizes.small) {
			dotsClass += ' mt-[-3px]';
		}
		if (size === sizes.large) {
			dotsClass += ' mt-[-5px]';
		}
    return dotsClass;
  }

	$: durationPillClass = getDurationPillClass(size);
  $: optionsButtonClass = getOptionsButtonClass(size);
  $: dotsClass = getDotsClass(size);
</script>

<figure class="relative">
	<Image
		className="w-full"
		src={thumbnail}
		alt={`Thumbnail for video ${title} on ${subscription}.`}
	/>
  <button type="button" class={optionsButtonClass}><span class={dotsClass}>&middot;&middot;&middot;</span></button>
	<span class={durationPillClass}>{duration}</span>
</figure>
