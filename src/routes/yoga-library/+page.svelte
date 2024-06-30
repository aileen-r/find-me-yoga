<script>
	import VideoThumbnail from '../../components/landing/VideoThumbnail.svelte';

	/** @type {import('./$types').PageData} */ export let data;

	let videos = data.videos;
	let totalCount = data.totalCount;

	let page = 1;
	const limit = 21; // default from +page.js
	const maxPage = Math.ceil(totalCount / limit);

	async function changePage(newPage) {
		const offset = (newPage - 1) * limit;
		const response = await fetch(`/.netlify/functions/videos?limit=${limit}&offset=${offset}`);

		if (response.ok && response.status === 200) {
			const body = await response.json();
			videos = body.videos;
			totalCount = body.totalCount;
			page = newPage;
			window.scrollTo(0, 0);
		} else {
			const error = await repsonse.text();
			console.error(error);
		}
	}
</script>

<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
	<h2>Yoga library</h2>

	<p>
		This is my full library of yoga videos. In time it will have CRUD actions exposed in the UI (but
		only for me - I don't want anyone else messing with my data!)
	</p>
</article>

<ol class="list-none p-0 mt-12 grid gap-5 grid-cols-3">
	{#each videos as video (video.id)}
		<li class="card text-center">
			<VideoThumbnail
				id={video.id}
				thumbnail={video.thumbnail}
				title={video.title}
				subscription={video.subscription}
				duration={video.duration}
				size="small"
			/>
			<a
				class="card-primary-action underline hover:no-underline"
				href={video.url}
				target="_blank"
				rel="noopener noreferrer nofollow">{video.title}</a
			>
		</li>
	{/each}
</ol>

<!-- TODO: a nicer pagination-->
<nav class="flex items-center justify-center gap-3">
	{#if page !== 1}
		<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(1)}>1</button>
	{/if}
	{#if page > 2}
	...
	{/if}
	{#if page > 2}
	<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(page - 1)}>{page - 1}</button>
	{/if}
	<button type="button" class="btn btn-secondary px-4" disabled>{page}</button>
	{#if page < maxPage - 1}
	<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(page + 1)}>{page + 1}</button>
	{/if}
	{#if page < maxPage - 1}
	...
	{/if}
	{#if page !== maxPage}

		<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(maxPage)}
			>{maxPage}</button
		>
	{/if}
</nav>
