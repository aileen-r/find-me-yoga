<script>
	export let src;
	export let alt;
	export let ratio = '16x9';
  export let className;
</script>

<picture class="flex items-center justify-center relative isolate ratio-{ratio} {className} m-0">
	<div class="animate-pulse bg-zinc-200 w-full h-full" />
	<img class="absolute top-0 left-0 w-full h-full object-cover !m-0" {src} {alt} />
</picture>

<style lang="scss">
	picture {
		aspect-ratio: 16 / 9;

		&.ratio-1x1 {
      aspect-ratio: 1 / 1;
    }
	}
</style>
