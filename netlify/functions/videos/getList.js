import { formatRowIntoEntity } from './sheetsApiHelpers';

const videosColNames = ['title', 'url', 'duration', 'style', 'bodyArea', 'instructor', 'subscription', 'energy', 'thumbnail', 'exclude', 'id', 'music'];

const subscriptionColNames = ['name', 'url', 'free', 'thumbnail'];

/**
 * @param {'videos'|'subscriptions'} entityType 
 * @returns {string[]}
 */
function getColNames(entityType) {
	switch (entityType?.toLowerCase()) {
		case 'videos':
			return videosColNames;
		case 'subscriptions':
			return subscriptionColNames;
		default:
			console.warn(`No colNames found for entityType ${entityType}`);
			return [];
	}
}

/**
 * @param {*} rows 
 * @param {'videos'|'subscriptions'} entityType 
 * @returns 
 */
function formatRowsIntoEntities(rows, entityType) {
	const formattedEntites = [];
	if (!rows) {
		return [];
	}
	console.log(entityType);

	const colNames = getColNames(entityType);

	rows.forEach((row) => {
		const entity = formatRowIntoEntity(row, colNames);
		formattedEntites.push(entity);
	});
	return formattedEntites;
}

// A bog-standard get list that doesn't support querying. Only for subscriptions rn
async function getList(sheets, spreadsheetId, auth, sheetName, limit = 20, offset = 0) {
	const rowOffset = offset + 2; // accounts for 1-indexing of sheet and col 1 being col names
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId,
		auth,
		range: `${sheetName}!A${rowOffset}:K${rowOffset + limit}`
	});
	const entities = formatRowsIntoEntities(res.data.values, sheetName);
	return entities;
}

export default getList;
