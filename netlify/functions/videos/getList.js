import { formatRowIntoEntity } from './sheetsApiHelpers';

const colNames = ['title', 'url', 'duration', 'style', 'bodyArea', 'instructor', 'subscription', 'energy', 'thumbnail', 'exclude', 'id'];

// TODO: JsDoc
function formatRowsIntoEntities(rows) {
	const formattedEntites = [];
	if (!rows) {
		return [];
	}

	rows.forEach((row) => {
		const entity = formatRowIntoEntity(row, colNames);
		formattedEntites.push(entity);
	});
	return formattedEntites;
}

// A bog-standard get list that doesn't support querying. Not in use.
async function getList(sheets, spreadsheetId, auth, sheetName, limit = 20, offset = 0) {
	const rowOffset = offset + 2; // accounts for 1-indexing of sheet and col 1 being col names
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId,
		auth,
		range: `${sheetName}!A${rowOffset}:K${rowOffset + limit}`
	});
	const entities = formatRowsIntoEntities(res.data.values);
	return entities;
}

export default getList;
