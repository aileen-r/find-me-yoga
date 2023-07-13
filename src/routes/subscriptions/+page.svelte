<script>
	import Image from '../../components/global/Image.svelte';
	/** @type {import('./$types').PageData} */ export let data;

	let loading = false;

	function handleSubmit(e) {
		e.preventDefault();
		localStorage.setItem("subscriptions", JSON.stringify(data.subscriptionSettings));
	}
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

	<h3>In the library</h3>

	<div class="flex gap-2">
		{#each data.subscriptions as subscription}
			<div class="w-1/3">
				<a
					class="block focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:rounded-sm"
					href={subscription.url}
					target="_blank"
					rel="noopener noreferrer nofollow"
				>
					<figure class="relative !m-0">
						<Image
							className="w-full"
							src={subscription.thumbnail}
							alt="Thumbnail for {subscription.name}"
						/>
					</figure>
					<h4 class="inline text-lg underline hover:no-underline">{subscription.name}</h4>
					|&nbsp;<span class="text-lg uppercase">{subscription.free ? 'free' : 'paid'}</span></a
				>
			</div>
		{/each}
	</div>

	<h3>Enable subscriptions</h3>

	<p>WIP: this form updates local storage but doesn't do anything with it.</p>

	<form class="flex flex-col mt-5" on:submit={handleSubmit}>
		<fieldset>
			<legend>What subscriptions would you like enabled?</legend>

			{#each data.subscriptionSettings as subscription}
			<div>
				<input id={subscription.name} type="checkbox" bind:checked={subscription.enabled} />
				<label for={subscription.name}>{subscription.name}</label>
			</div>
			{/each}
		</fieldset>

		<button
			type="submit"
			class="mt-5 px-8 pt-1.5 pb-2 bg-zinc-500 text-base text-zinc-50 rounded-full cursor-pointer hover:bg-zinc-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-zinc-600 focus-visible:ring-offset-2"
			>{loading ? 'Loading...' : 'Submit'}</button
		>
	</form>
</article>
