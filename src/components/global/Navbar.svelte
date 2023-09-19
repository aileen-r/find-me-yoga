<script>
	import indexPageStateStore from '../../stores/indexPage';

	import BurgerMenuIcon from './BurgerMenuIcon.svelte';
	import Mandala from '../landing/Mandala.svelte';

	let indexPageState;
	indexPageStateStore.subscribe((value) => {
		indexPageState = value;
	});

	let navOpen = false;
	const toggleMenu = (event) => {
		navOpen = event.detail.open;
	};

	const headerLinkHandler = () => {
		indexPageStateStore.reset()
	}

	const links = [
		{
			link: '/about',
			text: 'About'
		},
		{
			link: '/subscriptions',
			text: 'Subscriptions'
		},
		{
			link: '/yoga-library',
			text: 'Yoga library'
		},
		{
			link: '/api-playground',
			text: 'API playground'
		}
	];
</script>

<div class="flex flex-wrap justify-between px-4 py-2.5">
	<a
		class="underline-hover rounded px-2 pt-1 pb-1.5 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
		href="/"
		on:click={headerLinkHandler}
		><h1 class="text-3xl">Find me yoga</h1></a
	>
	<!-- fill is zinc-300 -->
	<Mandala className="absolute left-16 -z-10" width={50} height={50} fill={'#d4d4d8'}/>
	<BurgerMenuIcon open={navOpen} on:menu={toggleMenu} />

	<nav class="basis-full {navOpen ? 'block' : 'hidden'} lg:basis-auto lg:block">
		<ul class="lg:flex mt-1">
			{#each links as { link, text } (link)}
				<li class="ml-1">
					<a
						class="underline-hover rounded px-2 pt-1 pb-1.5 text-zinc-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
						href={link}>{text}</a
					>
				</li>
			{/each}
			<!--<li><a href="/about" class:active={$page.url.pathname.includes('/about')}>About me</a></li>
		<li><a href="/projects" class:active={$page.url.pathname.includes('/projects')}>Projects</a></li>
		<li><a href="/articles" class:active={$page.url.pathname.includes('/articles')}>Articles</a></li> -->
		</ul>
	</nav>
</div>

<style lang="scss">
	h1 {
		font-family: 'Caveat', cursive;
	}
</style>
