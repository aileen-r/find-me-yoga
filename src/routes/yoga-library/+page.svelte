<script>
	/** @type {import('./$types').PageData} */ export let data;
</script>

<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
	<h2>Yoga library</h2>

	<p>
		This will list my full library of yoga videos with all their tags. In time it will have CRUD
		actions exposed in the UI (but only for me - I don't want anyone else messing with my data!)
	</p>

	<ol>
		{#each data.videos as video}
			<li><a href={video.url}>{video.title}</a></li>
		{/each}
	</ol>
</article>
