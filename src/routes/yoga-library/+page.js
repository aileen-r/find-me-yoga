/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`/.netlify/functions/videos`);
  const videos = await res.json();
 
  return { videos };
}