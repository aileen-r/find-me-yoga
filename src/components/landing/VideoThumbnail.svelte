<script>
	import {createEventDispatcher} from 'svelte';
	import clickOutside from '../../directives/clickOutside';
	import Image from '../global/Image.svelte';
	import DurationPill from '../global/DurationPill.svelte';

	const sizes = Object.freeze({
		small: 'small',
		large: 'large'
	});

	export let id;
	export let thumbnail;
	export let title;
	export let subscription;
	export let duration;
	export let size = 'large';
	let showMenu = false;

	function getButtonContainerClass(size) {
		let containerClass = 'absolute top-0 right-0 text-right z-20';
		if (size === sizes.small) {
			containerClass += ' mx-2 my-1';
		}
		if (size === sizes.large) {
			containerClass += ' mx-3 my-2';
		}
		return containerClass;
	}

	function getOptionsButtonClass(size) {
		let buttonClass =
			'bg-white text-zinc-800 rounded-full drop-shadow-md leading-none mr-[-2px] focus-visible:outline-none focus-visible:bg-zinc-800 focus-visible:text-white hover:bg-zinc-800 hover:text-white';
		if (size === sizes.small) {
			buttonClass += ' text-3xl w-7 h-7';
		}
		if (size === sizes.large) {
			buttonClass += ' text-4xl w-8 h-8';
		}
		return buttonClass;
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

	function getArrowOffset(size) {
		return size === sizes.large ? '9px' : '7px';
	}

	$: buttonContainerClass = getButtonContainerClass(size);
	$: optionsButtonClass = getOptionsButtonClass(size);
	$: dotsClass = getDotsClass(size);
	$: arrowOffset = getArrowOffset(size);

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function hideMenu() {
		showMenu = false;
	}

	const dispatch = createEventDispatcher()

  function excludeVideo() {
    dispatch('exclude-video', {id});
	}
</script>

<figure class="relative">
	<Image
		className="w-full"
		src={thumbnail}
		alt={`Thumbnail for video ${title} on ${subscription}.`}
	/>
	<div class={buttonContainerClass}>
		<button type="button" class={optionsButtonClass} 
			use:clickOutside={hideMenu}
			on:click={toggleMenu}
			><span class={dotsClass}
				>&middot;&middot;&middot;<span class="sr-only">More options</span></span
			></button
		>
		{#if showMenu}
			<ul
				class="bg-white py-1 mt-2 relative leading-none context-menu"
				style="--arrow-offset: {arrowOffset}"
			>
				<li>
					<button type="button" class="px-3 py-1 hover:bg-zinc-200" on:click={excludeVideo}>Exclude video</button>
				</li>
			</ul>
		{/if}
	</div>
	<DurationPill duration={duration} size={size} />
</figure>

<style>
	.context-menu::before {
		border-bottom: 5px solid white;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		content: '';
		height: 0;
		position: absolute;
		right: var(--arrow-offset);
		top: -4px;
		width: 0;
	}
</style>
