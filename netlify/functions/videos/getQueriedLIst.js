import { convertObjectToQueryString } from '../utils';

const ENERGY_VALUES = ['high', 'medium', 'low'];

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
	return arrayValue.map((str) => str.trim());
}

function formatQueryResponse(response) {
	const colLabels = response.table.cols.map((c) => c.label);
	const formattedRows = [];
	response.table.rows.forEach((row) => {
		const formattedRow = {};
		row.c.forEach((col, i) => {
			const key = colLabels[i];
			const value = getValueFromCol(col);
			formattedRow[key] = value;
		});
		formattedRows.push(formattedRow);
	});
	return formattedRows;
}

function getWhereConditionFromQueryParameters(params) {
	const conditions = [];
	if (params.maxDuration) {
		// formats HH:mm:ss to time in minutes (decimal)
		conditions.push(`HOUR(C)*60+MINUTE(C)+SECOND(C)/60 <= ${params.maxDuration}`);
	}
	if (params.energy && ENERGY_VALUES.includes(params.energy.toLowerCase())) {
		conditions.push(`H = '${params.energy}'`);
	}
	return conditions.length ? conditions.join(' And ') : '';
}

async function getQueriedList(spreadsheetId, auth, sheetName, queryStringParameters) {
	const authHeaders = await auth.getRequestHeaders();
	const whereCondition = getWhereConditionFromQueryParameters(queryStringParameters);
	console.log(whereCondition);
	const requestQueryParameters = {
		gid: sheetName,
		tq: `Select A,B,C,D,E,F,G,H Where ${whereCondition}`
	};
	const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq${convertObjectToQueryString(
		requestQueryParameters
	)}`;


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

export default getQueriedList;
