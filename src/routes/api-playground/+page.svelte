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
		<li><a href="/.netlify/functions/videos/trigger">/videos/trigger</a> (testing triggering an action that I will later make a cron)</li>
		<li><a href="/.netlify/functions/test">/test</a> (first Netlify function test)</li>
	</ul>
</article>
