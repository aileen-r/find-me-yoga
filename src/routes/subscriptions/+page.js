import { browser } from "$app/environment";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`/.netlify/functions/subscriptions`);

  /**
   * Properties: name, free, thumbnail, url
   */
  const subscriptions = await res.json();

  const defaultSubscriptionSettings = subscriptions.map(s => ({
    name: s.name,
    enabled: s.free
  }));

  const subscriptionSettings = browser && JSON.parse(localStorage.getItem("subscriptions")) || defaultSubscriptionSettings;
 
  return { subscriptions, subscriptionSettings };
}