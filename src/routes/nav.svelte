<nav class="nav">
  <a href="/"><h1>Find me yoga</h1></a>
	<ul class="nav-list">
		<li><a href="/yoga-library">Yoga library</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/.netlify/functions/test" target="_blank">Test API Endpoint</a></li>
		<li><a href="/.netlify/functions/videos" target="_blank">Videos API Endpoint</a></li>
	</ul>
</nav>

<style lang="scss">
	.nav {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;

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
</style>
