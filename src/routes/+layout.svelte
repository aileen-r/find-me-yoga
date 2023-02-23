<script>
	import Navbar from '../components/global/Navbar.svelte';
	import Footer from '../components/global/Footer.svelte';

	import '../reset.css';
	import '../main.css';
</script>

<div class="layout">
	<Navbar />

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
			margin: 0 auto;
			max-width: 900px;
			padding: 10px 15px;
			width: 100%;
		}
	}
</style>
