/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  try {
    const res = await fetch(`/.netlify/functions/subscriptions`);

    /**
     * Properties: name, free, thumbnail, url
     */
    const subscriptions = await res.json();
   
    return { subscriptions };
  } catch (err) {
    console.error(err);
  }
}