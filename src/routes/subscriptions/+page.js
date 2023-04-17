/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`/.netlify/functions/subscriptions`);
  const subscriptions = await res.json();
 
  return { subscriptions };
}