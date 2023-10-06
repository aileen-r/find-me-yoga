// TODO: JsDoc
async function excludeVideo(sheets, spreadsheetId, auth, sheetName, rowId) {
  if (sheetName !== 'Videos') {
    return {
      statusCode: 400,
      body: 'Cannot exclude a non-video entity.'
    }
  }
	if (rowId === '1') {
		return {
			statusCode: 400,
			body: `ID ${rowId} does not exist in spreasheet ${sheetName}.`
		};
	}

	try {
		await sheets.spreadsheets.values.update({
			spreadsheetId,
			auth,
			range: `J${rowId}`,
			valueInputOption: 'USER_ENTERED',
			resource: {
				values: [['TRUE']]
			}
		});
	
		return {
			statusCode: 204,
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 500,
			body: err.toString()
		};
	}
	
}

export {excludeVideo};
