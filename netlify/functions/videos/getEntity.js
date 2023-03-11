import { formatRowIntoEntity } from "./sheetsApiHelpers";

// TODO: JsDoc
async function getEntity(sheets, spreadsheetId, auth, sheetName, rowId) {
	if (rowId === '1') {
		return {
			statusCode: 404,
			body: '404 Not Found'
		};
	}
	// TODO - stitch these into one request
	const res2 = await sheets.spreadsheets.values.get({
		spreadsheetId,
		auth,
		range: `${sheetName}!A${rowId}:Z${rowId}`
	});

	if (!res2.data.values || !res2.data.values.length) {
		return {
			statusCode: 404,
			body: '404 Not Found'
		};
	}

	const res1 = await sheets.spreadsheets.values.get({
		spreadsheetId,
		auth,
		range: `${sheetName}!A1:Z1`
	});

	const entity = formatRowIntoEntity(res2.data.values[0], res1.data.values[0]);
	return {
		statusCode: 200,
		body: JSON.stringify(entity)
	};
}

export default getEntity;