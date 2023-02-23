<script>
	// Component source: https://github.com/zzzFelix/felixhoffmann.dev/blob/6f445e8f9f574379dc44dd014a1d47cadb18e623/src/components/BurgerMenuIcon.svelte

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let open = false;
	const toggleMenu = () => {
		open = !open;
		dispatch('menu', {
			open
		});
	};
</script>

<button class={open ? 'menu-button open' : 'menu-button'} on:click={toggleMenu}>
	<p class="sr-only">{open ? 'Close' : 'Open'} navigation</p>
	<div aria-hidden="true">
		<div class="bar1" />
		<div class="bar2" />
		<div class="bar3" />
	</div>
</button>

<style>
	.menu-button {
		cursor: pointer;
		border: none;
		background: none;
	}
	p {
		font-size: 1rem;
	}

	.bar1,
	.bar2,
	.bar3 {
		width: 28px;
		height: 2px;
		background-color: #1b1b1c;
		margin: 6px 0;
		transition: 0.4s;
    border-radius: 15px;
	}
	/* Rotate first bar */
	.open .bar1 {
		transform: rotate(-45deg) translate(-6px, 6px);
	}
	/* Fade out the second bar */
	.open .bar2 {
		opacity: 0;
	}
	/* Rotate last bar */
	.open .bar3 {
		transform: rotate(45deg) translate(-6px, -5px);
	}
	@media (min-width: 899px) and (min-height: 699px) {
		.menu-button {
			display: none;
		}
	}
</style>
