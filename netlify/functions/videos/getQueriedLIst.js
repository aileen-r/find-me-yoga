// TODO: JsDoc
function getValueFromCol(col) {
	// col.f gives formatted duration, whereas col.v gives a Date.
	const stringValue = col?.f || col?.v;
	if (!stringValue) {
		return null;
	}
	const arrayValue = stringValue.split(',');
	if (arrayValue.length === 1) {
		return stringValue;
	}
	return arrayValue.map(str => str.trim());
}
import {convertObjectToQueryString} from "../utils";

function formatQueryResponse(response) {
	const colLabels = response.table.cols.map(c => c.label);
	const formattedRows = [];
	response.table.rows.forEach(row => {
		const formattedRow = {};
		row.c.forEach((col, i) => {
			const key = colLabels[i];
			const value = getValueFromCol(col);
			formattedRow[key] = value;
		})
		formattedRows.push(formattedRow);
	})
	return formattedRows;
}

async function getQueriedList(spreadsheetId, auth, sheetName, queryStringParameters) {
	const authHeaders = await auth.getRequestHeaders();
	const maxDuration = queryStringParameters?.maxDuration;
	const requestQueryParameters = {
		gid: sheetName,
		tq: `Select A,B,C,D,E,F,G,H Where HOUR(C)*60+MINUTE(C)+SECOND(C)/60 <= ${maxDuration}`
	};
	const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq${convertObjectToQueryString(requestQueryParameters)}`;

	const options = {
		method: 'GET',
		headers: authHeaders
	};
	
	const response = await fetch(url, options);
	if (response.ok) {
		const data = await response.text();
		// fairly horrendous slicing out of actual JSON from returned string
		const queryResponse = JSON.parse(data.substring(47).slice(0, -2));
		return formatQueryResponse(queryResponse);
	} else {
		// TODO error
		return null;
	}
}

export default getQueriedList