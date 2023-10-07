/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`/.netlify/functions/videos?subscriptions=Commune&limit=10&offset=10`);
  const videos = await res.json();
 
  return { videos };
}