<script>
	import VideoThumbnail from '../../components/landing/VideoThumbnail.svelte';

	/** @type {import('./$types').PageData} */ export let data;

	let videos = data.videos;
	let totalCount = Number(data.totalCount);
	let page = Number(data.page);
	const limit = Number(data.limit);

	// TODO: update query params

	$: maxPage = Math.ceil(totalCount / limit);

	let filtersExpanded = false;

	// Form values
	let minDuration, maxDuration, energy;

	function toggleFiltersExpanded() {
		filtersExpanded = !filtersExpanded;
	}

	function constructFilterParams() {
		const queryParams = [];
		if (minDuration && minDuration > 0) {
			queryParams.push(`minDuration=${minDuration}`);
		}
		if (maxDuration) {
			queryParams.push(`maxDuration=${maxDuration}`);
		}
		if (energy) {
			queryParams.push(`energy=${energy}`);
		}
		return queryParams.join('&')
	}

	async function changePage(newPage) {
		await loadNewQuery(newPage);
	}

	async function loadNewQuery(newPage) {
		const offset = (newPage - 1) * limit;
		const response = await fetch(`/.netlify/functions/videos?limit=${limit}&offset=${offset}&${constructFilterParams()}`);

		if (response.ok && response.status === 200) {
			const body = await response.json();
			videos = body.videos;
			totalCount = body.totalCount;
			page = newPage;
			window.scrollTo(0, 0);
		} else {
			const error = await response.text();
			console.error(error);
		}
	}

	async function filterSubmit(event) {
		event.preventDefault();

		await loadNewQuery(1);

		filtersExpanded = false;
	}
</script>

<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
	<h2>Yoga library</h2>

	<p>
		This is my full library of yoga videos. In time it will have CRUD actions exposed in the UI (but
		only for me - I don't want anyone else messing with my data!)
	</p>
	<p>While I have made a start on filtering, there is no sorting yet.</p>
	<button type="button" class="btn btn-secondary px-4" on:click={toggleFiltersExpanded}
		>Filters {filtersExpanded ? '-' : '+'}</button
	>
</article>

{#if filtersExpanded}
	<form class="flex flex-col" on:submit={filterSubmit}>
		<label for="minDuration">Minimum duration (minutes)</label>
		<input type="number" id="minDuration" bind:value={minDuration} />

		<label for="maxDuration">Maximum duration (minutes)</label>
		<input type="number" id="maxDuration" bind:value={maxDuration} />

		<label for="energy">Energy</label>
		<select id="energy" bind:value={energy}>
			<option value="">-</option>
			<option value="low">Low</option>
			<option value="medium">Medium</option>
			<option value="high">High</option>
		</select>

		<button type="submit" class="btn btn-secondary px-4">Apply filters</button>
	</form>
{/if}

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

<nav class="flex items-center justify-center gap-3">
	{#if page !== 1}
		<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(1)}>1</button>
	{/if}
	{#if page > 3}
		...
	{/if}
	{#if page > 2}
		<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(page - 1)}
			>{page - 1}</button
		>
	{/if}
	<button type="button" class="btn btn-secondary px-4" disabled>{page}</button>
	{#if page < maxPage - 1}
		<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(page + 1)}
			>{page + 1}</button
		>
	{/if}
	{#if page < maxPage - 2}
		...
	{/if}
	{#if page !== maxPage}
		<button type="button" class="btn btn-secondary px-4" on:click={() => changePage(maxPage)}
			>{maxPage}</button
		>
	{/if}
</nav>
