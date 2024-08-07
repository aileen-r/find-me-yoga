/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  /* TODO: update limit according to page size */
  const page = url.searchParams.get("page") || 1;
  const limit = url.searchParams.get("limit") || 42;
  const offset = (page - 1) * limit;
  const res = await fetch(`/.netlify/functions/videos?limit=${limit}&offset=${offset}`);
  const data = await res.json();

  data.page = page;
  data.limit = limit;
 
  return data;
}