/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
	const page = url.searchParams.get('page') || '1';
	const limit = url.searchParams.get('limit') || '42';
	const minDuration = url.searchParams.get('minDuration');
	const maxDuration = url.searchParams.get('maxDuration');
	const energy = url.searchParams.get('energy');

	const offset = (page - 1) * limit;
	const queryString = constructQuery(limit, offset, minDuration, maxDuration, energy);

	const res = await fetch(`/.netlify/functions/videos?${queryString}`);
	const data = await res.json();

	data.page = page;
	data.limit = limit;
  data.filterForm = {
    minDuration,
    maxDuration,
    energy
  }

	return data;
}

/**
 * Query string for videos API
 * @param {string} limit
 * @param {string} offset
 * @param {string} minDuration
 * @param {string} maxDuration
 * @param {string} energy
 * @returns {string}
 */
function constructQuery(limit, offset, minDuration, maxDuration, energy) {
	if (!limit) {
		console.error("Yoga library: 'limit' query param is not defined");
	}
	if (!offset && offset !== 0) {
		console.error("Yoga library: 'offset' query param is not defined");
	}

	const queryParams = [`limit=${limit}`, `offset=${offset}`];
	if (minDuration && minDuration > 0) {
		queryParams.push(`minDuration=${minDuration}`);
	}
	if (maxDuration) {
		queryParams.push(`maxDuration=${maxDuration}`);
	}
	if (energy) {
		queryParams.push(`energy=${energy}`);
	}
	return queryParams.join('&');
}
