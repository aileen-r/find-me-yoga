<script>
	import Navbar from '../components/global/Navbar.svelte';
	import Footer from '../components/global/Footer.svelte';

	import '../reset.css';
	import '../main.css';
</script>

<div class="flex flex-col min-h-full">
	<Navbar />

	<main class="mt-2 mx-auto flex-1 max-w-4xl px-4 py-2.5 w-full">
		<slot />
	</main>

	<Footer />
</div>

<style lang="scss">
	// reusible classes
	:global(.underline-hover) {
		background: linear-gradient(0deg, theme('colors.zinc.400'), theme('colors.zinc.400')) no-repeat right
			bottom / 0 var(--bg-h);
		transition: background-size 350ms;
  	--bg-h: 0.15em;

		&:hover {
			background-size: 100% var(--bg-h);
			background-position-x: left;
		}
	}

	:global(.underline-hover-inverted) {
		background: linear-gradient(0deg, theme('colors.zinc.400'), theme('colors.zinc.400')) no-repeat left
			bottom / 100% var(--bg-h);
		transition: background-size 350ms;
  	--bg-h: 0.15em;

		&:hover {
			background-size: 0 var(--bg-h);
			background-position-x: right;
		}

		&:focus-visible {
			background: transparent;
		}

	}
</style>