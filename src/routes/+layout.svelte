<script>
  /** @type {import('./$types').LayoutData} */  export let data;
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/yoga-library">Yoga library</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/netlify/functions/test" target="_blank">Test API Endpoint</a></li>
		<li><a href="/netlify/functions/videos" target="_blank">Videos API Endpoint</a></li>
	</ul>
</nav>

<main><slot></slot></main>

<footer>
	A project by <a href="https://aileenrae.co.uk" target="_blank" rel="noopener noreferrer nofollow"
		>Aileen Rae</a
	>.
	<a
		href="https://github.com/aileen-r/find-me-yoga"
		target="_blank"
		rel="noopener noreferrer nofollow">GitHub repository</a
	>
</footer>
