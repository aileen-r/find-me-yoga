/**
 * 
 * @param {object} obj an object of key value pairs. Values should be strings
 * @returns {string} A query string of form "?key1=value1&key2=value2" etc
 */
function convertObjectToQueryString(obj) {
	let queryString = '?';
	Object.keys(obj).forEach(key => {
		queryString += `${key}=${encodeURIComponent(obj[key])}&`
	});

	// crudely slicing off the extra ampersand. could be cleaner but gottagofast
	return queryString.slice(0, -1)
}

export {convertObjectToQueryString};