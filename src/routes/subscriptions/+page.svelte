<script>
	import Image from '../../components/global/Image.svelte';
	/** @type {import('./$types').PageData} */ export let data;
</script>

<article class="prose lg:prose-lg prose-zinc max-w-none prose-headings:mb-3">
	<h2>Subscriptions</h2>

	<p>
		I collect links to videos from whatever platforms I have (or used to have) subscriptions to.
		Most of these are paid.
	</p>

	<p>
		By default, you will only see videos from free platforms. If you would like to enable videos
		from other platforms, please select them below. Your preference will be saved in your browser.
	</p>
</article>

<h3 class="text-2xl font-semibold mt-8 mb-3">In the library</h3>

<div class="flex gap-2">
	{#each data.subscriptions as subscription}
		<div class="w-1/3">
			<a
				class="block focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:rounded-sm"
				href={subscription.url}
				target="_blank"
				rel="noopener noreferrer nofollow"
			>
				<figure class="relative">
					<Image
						className="w-full"
						src={subscription.thumbnail}
						alt="Thumbnail for {subscription.name}"
					/>
				</figure>
				<h4 class="inline text-lg underline hover:no-underline">{subscription.name}</h4> | <span class="text-lg uppercase">{subscription.free ? 'free' : 'paid'}</span></a
			>
		</div>
	{/each}
</div>

<h3 class="text-2xl font-semibold mt-8 mb-4">Enable subscriptions</h3>
