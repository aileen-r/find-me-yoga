<script>
	import DurationPill from '../../components/global/DurationPill.svelte';
	import Image from '../../components/global/Image.svelte';

	/** @type {import('./$types').PageData} */ export let data;

	let page = 1;
	const limit = 21; // default from +page.js
	const maxPage = Math.ceil(data.totalCount / limit);
</script>

<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
	<h2>Yoga library</h2>

	<p>
		This is my full library of yoga videos. In time it will have CRUD actions exposed in the UI (but
		only for me - I don't want anyone else messing with my data!)
	</p>
</article>

<ol class="list-none p-0 mt-12 grid gap-5 grid-cols-3">
	{#each data.videos as video}
		<li class="card text-center">
			<figure class="relative">
				<Image src={video.thumbnail} alt={'Thumbnail for ' + video.title} />
				<DurationPill duration={video.duration} size="small" />
			</figure>
			<a
				class="card-primary-action underline hover:no-underline"
				href={video.url}
				target="_blank"
				rel="noopener noreferrer nofollow">{video.title}</a
			>
		</li>
	{/each}
</ol>

<div class="flex justify-center gap-3">
	{#if page !== 1}
		<button class="btn btn-secondary px-4">&lt; Previous</button>
	{/if}
	{#if page !== maxPage}
		<button class="btn btn-secondary px-4">Next &gt;</button>
	{/if}
</div>
