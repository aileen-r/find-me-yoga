<script>
	import subscriptionsStore from '../../stores/subscriptions';
	import Alert from '../../components/global/Alert.svelte';
	import Image from '../../components/global/Image.svelte';
	/** @type {import('./$types').PageData} */ export let data;

	let loading = false;
	let formSuccess = false;

	let subscriptionPreferences;
	subscriptionsStore.subscribe((value) => {
		subscriptionPreferences = value;
	});

	function spliceFetchedSubscriptionsWithPrefernces() {
		// TODO: handle deleted subscriptions? (unlikely)
		const newSubscriptions = data.subscriptions
			.filter((subs) => !subscriptionPreferences.find((sp) => sp.name === subs.name))
			.map((subs) => ({
				name: subs.name,
				enabled: subs.free
			}));
		subscriptionsStore.add(newSubscriptions);
	}

	spliceFetchedSubscriptionsWithPrefernces();

	function handleSubmit(e) {
		loading = true;
		e.preventDefault();
		subscriptionsStore.set(subscriptionPreferences);
		// for the sake of some loading time
		setTimeout(() => {
			loading = false;
			formSuccess = true;
		}, 1000);
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

	{#if !loading && formSuccess}
		<Alert>Subscriptions preferences updated!</Alert>
	{/if}

	<form class="flex flex-col mt-5" on:submit={handleSubmit}>
		<fieldset>
			<legend>What subscriptions would you like enabled?</legend>

			{#each subscriptionPreferences as subscription}
				<div>
					<input id={subscription.name} type="checkbox" bind:checked={subscription.enabled} />
					<label for={subscription.name}>{subscription.name}</label>
				</div>
			{/each}
		</fieldset>

		<button
			disabled={loading}
			type="submit"
			class="btn btn-primary w-fit"
			>{loading ? 'Loading...' : 'Submit'}</button
		>
	</form>
</article>
