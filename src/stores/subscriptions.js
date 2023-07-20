import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/**
 * Properties: name, enabled
 */
let persistedSubscriptions
try {
  persistedSubscriptions = browser && JSON.parse(localStorage.getItem('subscriptions'));
} catch (err) {
	console.error(err);
	console.info("isBrowser:", browser);
}

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

export default subscriptionsStore;
