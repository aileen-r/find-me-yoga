<script>
	import CommuneScraper from '../../components/api-playground/CommuneScraper.svelte';
import Alert from '../../components/global/Alert.svelte';

	const feedbackTypes = Object.freeze({
		success: 'success',
		warning: 'warning',
		error: 'error'
	});

	// scrape form -------------------------------------------
	let feedbackType;
	let feedbackMsg = '';

	let loading = false;

	let playlistId = '';
	let instructor = '';

	async function handleSubmit(e) {
		e.preventDefault();
		loading = true;

		const url = `/.netlify/functions/videos/trigger?playlistId=${playlistId}`;
		try {
			const response = await fetch(url);
			if (response.ok && response.status === 200) {
				feedbackType = feedbackTypes.success;
				feedbackMsg = `Videos from playlist ID ${playlistId} successfully added to DB`;
				if (instructor) {
					feedbackMsg += `with "Instructor" set to ${instructor}`;
				}
			} else {
				const errorText = await response.text();
				if (errorText.startsWith('TimeoutError')) {
					feedbackType = feedbackTypes.warning;
					feedbackMsg = `The process timed out. However, the DB population for videos from playlist ID ${playlistId} was likely still successful.`;
				} else {
					feedbackType = feedbackTypes.error;
					feedbackMsg = 'Something went wrong. Check the developer console.';
				}
				console.error(errorText);
			}
		} catch (err) {
			feedbackType = feedbackTypes.error;
			feedbackMsg = 'Something went wrong. Check the developer console.';
			console.error(err);
		} finally {
			playlistId = '';
			instructor = '';
			loading = false;
		}
	}

	// exclude form -------------------------------------------
	let videoId = '';

	let excludeFeedbackType;
	let excludeFeedbackMsg = '';

	let excludeLoading = false;

	async function handleExcludeSubmit(e) {
		e.preventDefault();
		excludeFeedbackMsg = '';
		if (!videoId) {
			excludeFeedbackType = feedbackTypes.error;
			excludeFeedbackMsg = 'Video ID is required';
			return;
		}

		const url = `/.netlify/functions/videos/exclude/${videoId}`;
		excludeLoading = true;
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: { 'Content-Length': '0' }
			});
			if (response.ok && response.status === 204) {
				excludeFeedbackMsg = `Successfully excluded video ${videoId}.`;
				excludeFeedbackType = feedbackTypes.success;
			} else {
				const errorText = await response.text();
				excludeFeedbackMsg = errorText;
				excludeFeedbackType = feedbackTypes.error;
			}
		} catch (err) {
			excludeFeedbackType = feedbackTypes.error;
			excludeFeedbackMsg = 'Something went wrong. Check the developer console.';
			console.error(err);
		} finally {
			videoId = '';
			excludeLoading = false;
		}
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
			<a href="/.netlify/functions/subscriptions">/subscriptions</a>
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
	<p>
		The playlist ID for a typical playlist can be captured from the playlist URL, e.g. <br
		/>https://www.youtube.com/playlist?list=<strong>PLc0asrzrjtZJk3jlJZXqP8C95h1uQvN7-</strong>
	</p>
	<p>
		You can also capture all the uploads from a given user's channel by inspecting the source of a
		channel page and looking for the canonical URL. It will contain a channel ID of the format <code
			>UCFKE7WVJfvaHW5q283SxchA</code
		>. The user's uploads playlist ID starts with <code>UU</code> instead of <code>UC</code>, e.g.
		<code>UUFKE7WVJfvaHW5q283SxchA</code>.
	</p>
	<p>NB: There's no frontend validation on this form.</p>

	{#if feedbackMsg}
		<Alert type={feedbackType}>{feedbackMsg}</Alert>
	{/if}

	<form class="flex flex-col mt-5" on:submit={handleSubmit}>
		<label for="playlistId">YouTube playlist ID</label>
		<input id="playlistId" type="text" bind:value={playlistId} />

		<label for="instructor">Instructor's name (optional)</label>
		<input id="instructor" type="text" bind:value={instructor} />

		<button type="submit" class="btn" disabled={loading}>{loading ? 'Loading...' : 'Scrape'}</button
		>
	</form>

	<h4>Exclude video</h4>
	<p>
		When I scrape a YouTube channel of a yoga teacher I like such as <a
			href="https://www.youtube.com/user/yogawithadriene"
			target="_blank"
			rel="noopener noreferrer nofollow">Yoga with Adriene</a
		>, all of her uploads are pulled into my spreadsheet "database", but not all of them are yoga
		videos. She has some blogs, meditations, and course introductions, for example.
	</p>
	<p>
		The exclude API lets me mark a video as "excluded" so that it will not appear in the find me
		yoga flow in future.
	</p>

	{#if excludeFeedbackMsg}
		<Alert type={excludeFeedbackType}>{excludeFeedbackMsg}</Alert>
	{/if}

	<form class="flex flex-col mt-5" on:submit={handleExcludeSubmit}>
		<label for="videoId">Video ID (the row in the spreadsheet)</label>
		<input id="videoId" type="number" bind:value={videoId} />

		<button type="submit" class="btn" disabled={excludeLoading}
			>{excludeLoading ? 'Loading...' : 'Exclude'}</button
		>
	</form>

	<CommuneScraper />
</article>
