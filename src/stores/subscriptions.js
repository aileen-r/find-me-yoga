import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let subscriptionsStore = {};

try {
	/**
	 * Properties: name, enabled
	 */
	let persistedSubscriptions;
	try {
		if (browser) {
			const itemFromStorage = localStorage.getItem('subscriptions');
			console.log('itemFromStorage', itemFromStorage);
		}
		persistedSubscriptions = browser && JSON.parse(localStorage.getItem('subscriptions'));
	} catch (err) {
		console.error(err);
		console.error('isBrowser:', browser);
		console.log('browser variable', browser);
		console.log('localStorage', localStorage);
		throw 'is browser ' + browser;
	}

	/* eslint-disable */
	function createSubscriptionsStore() {
		const { subscribe, set: svelteSet, update } = writable(persistedSubscriptions || []);

		return {
			subscribe,
			set: (subscriptions) => {
				svelteSet(subscriptions);
				if (browser) {
					localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
				}
			},
			add: (newSubsciptions) => {
				let updatedSubscriptions = [];
				update((subscriptions) => {
					updatedSubscriptions = [...subscriptions, ...newSubsciptions];
					return updatedSubscriptions;
				});
				if (browser) {
					localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
				}
			}
		};
	}

	const subscriptionsStore = createSubscriptionsStore();
} catch (err) {
	console.error({err});
}

export default subscriptionsStore;
