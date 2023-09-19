/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  try {
    const res = await fetch(`/.netlify/functions/subscriptions`);
    console.log({res});

    /**
     * Properties: name, free, thumbnail, url
     */
    const subscriptions = await res.json();
   
    return { subscriptions };
  } catch (error) {
    console.error({error});
    return {error};
  }
}