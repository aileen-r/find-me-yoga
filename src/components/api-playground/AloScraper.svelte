<script>
  let url;
	let loading = false;

	async function scrapeAlo(e) {
		e.preventDefault();
		loading = true;
		const postUrl = `/.netlify/functions/videos/scrapeAlo?url=${encodeURIComponent(url)}`;
		try {
			const response = await fetch(postUrl, {
				method: 'POST',
				headers: { 'Content-Length': '0' }
			});
			if (!response.ok) {
				const errorText = await response.text();
				console.error(errorText);
			}
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<h4>Scrape Alo Wellness Club</h4>
<p>A scraper for <a href="https://wellnessclub.aloyoga.com" target="_blank" rel="noopener noreferrer nofollow">Alo Wellness Club</a>. Accepts a direct URL for an Alo series. Individual class support to come.</p>

<form class="flex flex-col mt-5" on:submit={scrapeAlo}>
  <label for="url">URL</label>
  <input id="url" type="text" bind:value={url} />
  <button disabled={loading} type="submit" class="btn btn-primary mt-2">Scrape</button>
</form>