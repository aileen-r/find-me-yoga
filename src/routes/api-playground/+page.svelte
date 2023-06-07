<script>
	import Alert from "../../components/global/Alert.svelte";

	const feedbackTypes = Object.freeze({
		success: 'success',
		warning: 'warning',
		error: 'error'
	});
	let feedbackType;
	let feedbackMsg = '';

	function getAlertColorFromFeedbackType(feedbackType) {
		switch (feedbackType) {
			case feedbackTypes.success:
				return 'green';
			case feedbackTypes.warning:
				return 'amber';
			case feedbackTypes.error:
				return 'red';
			default:
				return 'zinc';
		}
	}

	$: alertColor = getAlertColorFromFeedbackType(feedbackType);

	// form data
	let username = '';
	let instructor = '';

	async function handleSubmit(e) {
		e.preventDefault();

		const url = `/.netlify/functions/videos/trigger`;
		const response = await fetch(url);
		if (response.ok && response.status === 200) {
			feedbackType = feedbackTypes.success;
			feedbackMsg = `${username}'s uploads successfully added to DB`;
			if (instructor) {
				feedbackMsg += `with "Instructor" set to ${instructor}`;
			}
			console.log(await response.json());
		} else {
			const errorText = await response.text();
			if (errorText.startsWith('TimeoutError')) {
				feedbackType = feedbackTypes.warning;
				feedbackMsg = `The process timed out. However, the DB population for ${username}'s uploads was likely still successful.`
			} else {
				feedbackType = feedbackTypes.error;
				feedbackMsg = 'Something went wrong. Check the developer console.'
			}
			console.error(errorText);
		}
		// make api request
		// update form state with "success" and reload form button
	}
</script>

<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
	<h2>API playground</h2>

	<p>
		I'm in the process of building out APIs that query my Google Sheets "database". Here's a list of
		links for testing the query parameters I intend to use for this first version. No guarantees
		they all work.
	</p>

	<ul>
		<li><a href="/.netlify/functions/videos">/videos</a> (all videos)</li>
		<li>
			<a href="/.netlify/functions/videos?maxDuration=30">/videos?maxDuration=30</a> (in minutes)
		</li>
		<li>
			<a href="/.netlify/functions/videos?maxDuration=20&minDuration=15"
				>/videos?maxDuration=20&minDuration=15</a
			> (in minutes)
		</li>
		<li>
			<a href="/.netlify/functions/videos?energy=high">/videos?energy=high</a> (high, medium or low)
		</li>
		<li>
			<a href="/.netlify/functions/videos?maxDuration=25&energy=medium"
				>/videos?maxDuration=25&energy=medium</a
			>
		</li>
		<li>
			<a href="/.netlify/functions/videos/trigger">/videos/trigger</a> (testing triggering an action
			that I will later make a cron)
		</li>
		<li><a href="/.netlify/functions/test">/test</a> (first Netlify function test)</li>
	</ul>

	<h3>Trigger APIs</h3>
	<p>
		These are API endpoints that trigger some action. I would like to eventually run these on some
		cron job.
	</p>

	<h4>Scrape YouTube videos</h4>
	<p>
		This scrapes a YouTube channel and populates the title, url, duration, and thumbnail columns of
		the DB for every upload to the channel. It will not add duplicate rows. If the "instructor"
		input is populated, this will also be saved.
	</p>

	{#if feedbackMsg}
	<Alert type="{feedbackType}">{feedbackMsg}</Alert>
	{/if}

	<form class="flex flex-col" on:submit={handleSubmit}>
		<label for="username">YouTube username</label>
		<input id="username" type="text" bind:value={username} />

		<label for="instructor">Instructor's name</label>
		<input id="instructor" type="text" bind:value={instructor} />

		<button type="submit">Scrape</button>
	</form>
</article>
