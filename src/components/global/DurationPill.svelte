<script>
  // TODO: deduplicate from VideoThumbnail
  const sizes = Object.freeze({
		small: 'small',
		large: 'large'
	});

  export let size = sizes.large;
  export let duration;

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

  $: durationPillClass = getDurationPillClass(size);
</script>

<span class={durationPillClass}>{duration}</span>