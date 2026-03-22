<script>
	import { onMount } from 'svelte';
	import { page as pageStore } from '$app/stores';
	import subscriptionsStore from '../../stores/subscriptions.js';
	import { goto } from '$app/navigation';
	import VideoThumbnail from '../../components/landing/VideoThumbnail.svelte';

	/** @type {import('./$types').PageData} */ export let data;

	$: videos = data.videos;
	$: totalCount = Number(data.totalCount);
	$: page = Number(data.page);
	$: limit = Number(data.limit);
	$: filterForm = data.filterForm;

	let url;
	pageStore.subscribe((value) => {
		url = value.url;
	});

	let subscriptionNames;
	subscriptionsStore.subscribe((value) => {
		subscriptionNames = value.map((sub) => sub.name).sort((a, b) => a.localeCompare(b));
	});

	$: maxPage = Math.ceil(totalCount / limit);

	let filtersExpanded = false;

	// Initialise form values
	let text, minDuration, maxDuration, energy, showExcluded, complete, instructor, subscription;
	onMount(() => {
		text = filterForm.text;
		minDuration = filterForm.minDuration;
		maxDuration = filterForm.maxDuration;
		energy = filterForm.energy;
		showExcluded = filterForm.showExcluded;
		complete = filterForm.complete;
		instructor = filterForm.instructor;
		subscription = filterForm.subscription;
	});

	function toggleFiltersExpanded() {
		filtersExpanded = !filtersExpanded;
	}

	/**
	 * @param {string} page
	 * @returns {string} Query string for the frontend
	 */
	function constructQuery(page) {
		const queryParams = [`page=${page}`];
		if (text) {
			queryParams.push(`text=${text}`);
		}
		if (minDuration && minDuration > 0) {
			queryParams.push(`minDuration=${minDuration}`);
		}
		if (maxDuration) {
			queryParams.push(`maxDuration=${maxDuration}`);
		}
		if (energy) {
			queryParams.push(`energy=${energy}`);
		}
		if (showExcluded) {
			queryParams.push(`showExcluded=${showExcluded}`);
		}
		if (complete !== null && complete !== undefined) {
			queryParams.push(`complete=${complete}`);
		}
		if (instructor) {
			queryParams.push(`instructor=${instructor}`);
		}
		if (subscription) {
			// Not plural - this is frontend query
			queryParams.push(`subscription=${subscription}`);
		}
		return queryParams.join('&');
	}

	async function changePage(newPage) {
		await updateQueryParams(newPage);
	}

	function updateQueryParams(newPage) {
		const params = constructQuery(newPage);
		goto(`?${params.toString()}`);
	}

	async function filterSubmit(event) {
		event.preventDefault();
		await updateQueryParams(1);
		filtersExpanded = false;
	}
</script>

<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
	<h2>Yoga library</h2>

	<p>
		This is my full library of yoga videos. In time it will have CRUD actions exposed in the UI (but
		only for me - I don't want anyone else messing with my data!)
	</p>
	<p>While I have implemented filtering, there is no sorting yet.</p>
	<button type="button" class="btn btn-secondary px-4" on:click={toggleFiltersExpanded}
		>Filters {filtersExpanded ? '-' : '+'}</button
	>
</article>

{#if filtersExpanded}
	<form class="flex flex-wrap items-center mt-2 -mx-4 gap-y-4" on:submit={filterSubmit}>
		<div class="flex flex-col flex-grow min-w-0 px-4 md:pr-2 w-full md:w-1/2">
			<label for="text" class="text-sm font-medium">Search for text</label>
			<input type="text" id="text" bind:value={text} class="mt-1" />
		</div>

		<div class="flex flex-col pl-4 pr-2 md:pl-2 w-1/2 md:w-1/4">
			<label for="minDuration" class="text-sm font-medium">Min duration (mins)</label>
			<input type="number" id="minDuration" bind:value={minDuration} class="mt-1" />
		</div>

		<div class="flex flex-col pl-2 pr-4 w-1/2 md:w-1/4">
			<label for="maxDuration" class="text-sm font-medium">Max duration (mins)</label>
			<input type="number" id="maxDuration" bind:value={maxDuration} class="mt-1" />
		</div>

		<div class="flex flex-col px-4 md:pr-2 w-full md:w-1/3 lg:w-auto">
			<label for="energy" class="text-sm font-medium">Energy</label>
			<select id="energy" bind:value={energy} class="mt-1">
				<option value="">-</option>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
		</div>

		<div class="flex flex-col px-4 md:px-2 w-full md:w-1/3 lg:w-auto">
			<label for="instructor" class="text-sm font-medium">Instructor</label>
			<input type="text" id="instructor" bind:value={instructor} class="mt-1">
		</div>

		<div class="flex flex-col px-4 md:pl-2 lg:pr-2 w-full md:w-1/3 lg:w-auto">
			<label for="subscription" class="text-sm font-medium">Subscription</label>
			<select id="subscription" bind:value={subscription} class="mt-1">
				<option value="">-</option>
				{#each subscriptionNames as subscription}
					<option value={subscription}>{subscription}</option>
				{/each}
			</select>
		</div>

		<div class="flex items-center gap-2 px-4 md:pl-2 md:w-full lg:w-auto">
			<input id="excluded" type="checkbox" bind:checked={showExcluded} />
			<label for="excluded" class="text-sm font-medium">Show excluded videos?</label>
		</div>

		<div class="flex items-center gap-4 px-4 lg:w-auto">
			<div class="flex items-center gap-2">
				<input type="radio" id="complete" name="complete-group" bind:group={complete} value={true} />
				<label for="complete" class="text-sm font-medium">Complete only</label>
			</div>
			<div class="flex items-center gap-2">
				<input type="radio" id="incomplete" name="complete-group" bind:group={complete} value={false} />
				<label for="incomplete" class="text-sm font-medium">Incomplete only</label>
			</div>
			<div class="flex items-center gap-2">
				<input type="radio" id="both" name="complete-group" bind:group={complete} value={null} />
				<label for="both" class="text-sm font-medium">All</label>
			</div>
		</div>

		<button type="submit" class="btn btn-secondary mx-4 md:ml-auto">Apply filters</button>
	</form>
{/if}

<ol class="list-none p-0 mt-12 grid gap-5 grid-cols-2 md:grid-cols-3">
	{#each videos as video (video.id)}
		<li class="card text-center">
			<VideoThumbnail
				id={video.id}
				thumbnail={video.thumbnail}
				title={video.title}
				subscription={video.subscription}
				duration={video.duration}
				complete={video.complete}
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
