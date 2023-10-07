/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  /* TODO: update limit according to page size */
  const res = await fetch(`/.netlify/functions/videos?limit=21`);
  const data = await res.json();
 
  return data;
}