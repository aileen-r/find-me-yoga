import { convertObjectToQueryString } from '../utils';

const ENERGY_VALUES = ['high', 'medium', 'low'];

// TODO: JsDoc
function getValueFromCol(col) {
	// col.f gives formatted duration, whereas col.v gives a Date.
	if (typeof col?.v === 'boolean' || typeof col?.v === 'number') {
		return col.v;
	}
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
			let value = getValueFromCol(col);
			if (key === 'duration' && value?.startsWith('00')) {
				value = value.substring(1);
			}
			formattedRow[key] = value;
		});
		formattedRows.push(formattedRow);
	});
	return formattedRows;
}

function getWhereConditionFromQueryParameters(params) {
	const conditions = [];
	if (params.text) {
		// This only returns matches within the title column
		conditions.push(`LOWER(A) contains '${params.text.toLowerCase()}'`);
	}
	if (params.maxDuration) {
		// formats HH:mm:ss to time in minutes (decimal)
		conditions.push(`HOUR(C)*60+MINUTE(C)+SECOND(C)/60 <= ${params.maxDuration}`);
	}
	if (params.minDuration) {
		conditions.push(`HOUR(C)*60+MINUTE(C)+SECOND(C)/60 >= ${params.minDuration}`);
	}
	if (params.energy && ENERGY_VALUES.includes(params.energy.toLowerCase())) {
		conditions.push(`H = '${params.energy}'`);
	}
	if (params.subscriptions) {
		const enabledSubscriptionsQuery = params.subscriptions
			.split(',')
			.map((sub) => `G = '${sub}'`)
			.join(' or ');
		conditions.push(`(${enabledSubscriptionsQuery})`);
	}
	if (params.excluded) {
		conditions.push('J = FALSE');
	}
	return conditions.length ? 'Where ' + conditions.join(' And ') : '';
}

function getPaginationFromQueryParams(params) {
	if (params.random) {
		// Since randomisation occurs after receiving spreadsheet results, we need to remove the limit
		// TODO: look into adding randomiser algorithim at this stage
		// https://developers.google.com/chart/interactive/docs/querylanguage
		return '';
	}
	const limit = params.limit || 20;
	const offset = params.offset || 0;
	return `Limit ${limit} Offset ${offset}`;
}

async function getTotalCount(spreadsheetId, sheetName, tqParam, options) {
	const requestQueryParameters = {
		gid: sheetName,
		tq: tqParam
	};
	const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq${convertObjectToQueryString(
		requestQueryParameters
	)}`;

	const response = await fetch(url, options);
	if (response.ok) {
		const data = await response.text();
		const queryResponse = JSON.parse(data.substring(47).slice(0, -2))
		const count = queryResponse?.table?.rows[0]?.c[0]?.v;
		return count;
	} else {
		// TODO error
		return null;
	}
}

async function getFormattedVideos(spreadsheetId, sheetName, tqParam, options) {
	const requestQueryParameters = {
		gid: sheetName,
		tq: tqParam
	};
	const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq${convertObjectToQueryString(
		requestQueryParameters
	)}`;

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

async function getQueriedList(spreadsheetId, auth, sheetName, queryStringParameters) {
	const authHeaders = await auth.getRequestHeaders();
	const whereCondition = getWhereConditionFromQueryParameters(queryStringParameters);
	const paginationConditions = getPaginationFromQueryParams(queryStringParameters);

	const tqParamCount = `Select Count(A) ${whereCondition}`;
	
	const tqParamPaged = `Select A,B,C,D,E,F,G,H,I,J,K ${whereCondition} ${paginationConditions}`;

	const options = {
		method: 'GET',
		headers: authHeaders
	};


	const totalCount = await getTotalCount(spreadsheetId, sheetName, tqParamCount, options);

	const videos = await getFormattedVideos(spreadsheetId, sheetName, tqParamPaged, options);

	return { totalCount, videos}
}

export default getQueriedList;
