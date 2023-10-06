<script>
  let page;

	async function scrapeCommune(e) {
		e.preventDefault();
		const url = `/.netlify/functions/videos/scrapeCommune?page=${page}`;
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Length': '0' }
			});
			if (!response.ok) {
				const errorText = await response.text();
				console.error(errorText);
			}
		} catch (err) {
			console.error(err);
		}
	}
</script>

<h4>Scrape Commune</h4>
<p>A scraper for Commune's <a href="https://communeyogastudio.com/categories/full-class-library" target="_blank" rel="noopener noreferrer nofollow">online library</a>.</p>

<p>At the time of writing there are 27 pages of content in the full library. The scraper accepts one page at a time.</p>

<p>NB: There is no authentication in this scraper so it will likely only be working for me running locally.</p>

<!-- Scraped 20-27 so far -->

<form class="flex flex-col mt-5" on:submit={scrapeCommune}>
  <label for="page">Page number</label>
  <input id="page" type="number" bind:value={page} />
  <button type="submit" class="btn">Scrape</button>
</form>