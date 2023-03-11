<script>
	import BurgerMenuIcon from './BurgerMenuIcon.svelte';

	let navOpen = false;
	const toggleMenu = (event) => {
		navOpen = event.detail.open;
	};
</script>

<div class="navbar">
	<a href="/"><h1>Find me yoga</h1></a>
	<BurgerMenuIcon open={navOpen} on:menu={toggleMenu} />

	<nav class="nav {navOpen ? 'open' : 'closed'}" aria-expanded={navOpen}>
		<ul class="nav-list">
			<li><a href="/yoga-library">Yoga library</a></li>
			<li><a href="/about">About</a></li>
			<li><a href="/api-playground">API playground</a></li>
			<!--<li><a href="/about" class:active={$page.url.pathname.includes('/about')}>About me</a></li>
		<li><a href="/projects" class:active={$page.url.pathname.includes('/projects')}>Projects</a></li>
		<li><a href="/articles" class:active={$page.url.pathname.includes('/articles')}>Articles</a></li> -->
		</ul>
	</nav>
</div>

<style lang="scss">
	.navbar {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10px 15px;

		.nav {
			display: block;	

			@media (max-width: 899px) {
				flex-basis: 100%;

				&.open {
					display: block;
				}

				&.closed {
					display: none;
				}
			}

			@media (min-width: 900px) {
				.nav-list {
					display: flex;
					list-style-type: none;
					margin-top: 4px;
					padding: 0;

					li:not(:last-of-type) {
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
