<script>
	import Nav from './nav.svelte';
	import Footer from './footer.svelte';

	import '../reset.css';
</script>

<div class="layout">
	<Nav />

	<main class="main"><slot /></main>

	<Footer />
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100%;

		.main {
			flex: 1 1 0;
			padding: 10px 15px;
		}
	}
</style>
