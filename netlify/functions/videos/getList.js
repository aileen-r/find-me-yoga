import { formatRowIntoEntity } from "./sheetsApiHelpers";

// TODO: JsDoc
function formatRowsIntoEntities(rows) {
	const formattedEntites = [];
	if (!rows || rows.length < 2) {
		return [];
	}

	rows.forEach((row, idx) => {
		// First row is property name
		if (idx === 0) {
			return;
		}
		const entity = formatRowIntoEntity(row, rows[0]);
		formattedEntites.push(entity);
	});
	return formattedEntites;
}

async function getList(sheets, spreadsheetId, auth, sheetName) {
	// TODO: add limit + offset for pagination
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId,
		auth,
		range: sheetName
	});
	const entities = formatRowsIntoEntities(res.data.values);
	return entities;
}

export default getList;