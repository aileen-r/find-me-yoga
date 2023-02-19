// https://www.swyx.io/netlify-google-sheets
import { google } from 'googleapis';
/*
 * prerequisites
 */
// required env vars
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
	// spreadsheet key is the long id in the sheets URL
	throw new Error('no GOOGLE_APPLICATION_CREDENTIALS env var set');
}
if (!process.env.GOOGLE_SPREADSHEET_ID) {
	// spreadsheet key is the long id in the sheets URL
	throw new Error('no GOOGLE_SPREADSHEET_ID env var set');
}

//https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f
const sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuth() {
	const auth = new google.auth.GoogleAuth({
		keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
		scopes: SCOPES
	});
	return auth;
}

// async function getSpreadSheet({ spreadsheetId, auth }) {
// 	const res = await sheets.spreadsheets.get({
// 		spreadsheetId,
// 		auth
// 	});
// 	return res;
// }

async function getList(spreadsheetId, auth, sheetName) {
	// TODO: add limit + offset for pagination
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId,
		auth,
		range: sheetName
	});
	const entities = formatRowsIntoEntities(res.data.values);
	return entities;
}

async function getEntity(spreadsheetId, auth, sheetName, rowId) {
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

function formatRowIntoEntity(row, properties) {
	const entity = {};
	properties.forEach((property, i) => (entity[property] = row[i]));
	return entity;
}

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

// export const handler = async () => {
// 	try {
// 		const auth = await getAuth();
// 		const response = await getSpreadSheetValues({
// 			spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
// 			auth,
// 			sheetName: 'Videos'
// 		});
// 		return {
// 			statusCode: 200,
// 			body: JSON.stringify(response.data, null, 2)
// 		};
// 	} catch (error) {
// 		console.log(error.message, error.stack);
// 		return {
// 			statusCode: 500,
// 			body: JSON.stringify(error, null, 2)
// 		};
// 	}
// };

/*
 * ok real work
 *
 * GET /.netlify/functions/videos
 * GET /.netlify/functions/videos/1
 * PUT /.netlify/functions/videos/1
 * POST /.netlify/functions/videos
 * DELETE /.netlify/functions/videos/1
 *
 * the library also allows working just with cells,
 * but this example only shows CRUD on rows since thats more common
 */

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

export const handler = async (event) => {
	const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
	const segments = path.split('/').filter((e) => e);
	const auth = getAuth();

	try {
		switch (event.httpMethod) {
			case 'GET':
				if (segments.length === 0) {
					const videos = await getList(spreadsheetId, auth, 'Videos');
					return {
						statusCode: 200,
						body: JSON.stringify(videos)
					};
				}
				if (segments.length === 1) {
					const rowId = segments[0];
					return await getEntity(spreadsheetId, auth, 'Videos', rowId);
				} else {
					throw new Error(
						'too many segments in GET request - you should only call somehting like /.netlify/functions/google-spreadsheet-fn/123456 not /.netlify/functions/google-spreadsheet-fn/123456/789/101112'
					);
				}
			/* POST /.netlify/functions/google-spreadsheet-fn */
			// case 'POST':
			//   /* parse the string body into a useable JS object */
			//   const data = JSON.parse(event.body);
			//   data.UserIP = UserIP;
			//   // console.log('`POST` invoked', data);
			//   const addedRow = await sheet.addRow(data);
			//   // console.log({ addedRow });
			//   return {
			//     statusCode: 200,
			//     body: JSON.stringify({
			//       message: `POST Success - added row ${addedRow._rowNumber - 1}`,
			//       rowNumber: addedRow._rowNumber - 1 // minus the header row
			//     })
			//   };
			// /* PUT /.netlify/functions/google-spreadsheet-fn/123456 */
			// case 'PUT':
			//   /* PUT /.netlify/functions/google-spreadsheet-fn */
			//   if (segments.length === 0) {
			//     console.error('PUT request must also have an id'); // we could allow mass-updating of the sheet, but nah
			//     return {
			//       statusCode: 422, // unprocessable entity https://stackoverflow.com/questions/3050518/what-http-status-response-code-should-i-use-if-the-request-is-missing-a-required
			//       body: 'PUT request must also have an id.'
			//     };
			//   }
			//   /* PUT /.netlify/functions/google-spreadsheet-fn/123456 */
			//   if (segments.length === 1) {
			//     const rowId = segments[0];
			//     const rows = await sheet.getRows(); // can pass in { limit, offset }
			//     const data = JSON.parse(event.body);
			//     data.UserIP = UserIP;
			//     console.log(`PUT invoked on row ${rowId}`, data);
			//     const selectedRow = rows[rowId];
			//     Object.entries(data).forEach(([k, v]) => {
			//       selectedRow[k] = v;
			//     });
			//     await selectedRow.save(); // save updates
			//     return {
			//       statusCode: 200,
			//       body: JSON.stringify({ message: 'PUT is a success!' })
			//       // body: JSON.stringify(rows[rowId]) // just sends less data over the wire
			//     };
			//   } else {
			//     return {
			//       statusCode: 500,
			//       body:
			//         'too many segments in PUT request - you should only call somehting like /.netlify/functions/google-spreadsheet-fn/123456 not /.netlify/functions/google-spreadsheet-fn/123456/789/101112'
			//     };
			//   }
			// /* DELETE /.netlify/functions/google-spreadsheet-fn/123456 */
			// case 'DELETE':
			//   //
			//   // warning:
			//   // this code is untested but you can probably figure this out
			//   //

			//   if (segments.length === 1) {
			//     const rows = await sheet.getRows(); // can pass in { limit, offset }
			//     // // we dont actually use this in the demo but you might
			//     // const rowId = segments[0];
			//     // await rows[rowId].delete(); // delete a row

			//     // do this
			//     if (rows.length > 1) {
			//       const lastRow = rows[rows.length - 1];
			//       await lastRow.delete(); // delete a row
			//       return {
			//         statusCode: 200,
			//         body: JSON.stringify({ message: 'DELETE is a success!' })
			//       };
			//     } else {
			//       return {
			//         statusCode: 200,
			//         body: JSON.stringify({
			//           message: 'no rows left to delete! (first row is sacred)'
			//         })
			//       };
			//     }
			//   } else {
			//     return {
			//       statusCode: 500,
			//       body: JSON.stringify({
			//         message:
			//           'invalid segments in DELETE request, must be /.netlify/functions/google-spreadsheet-fn/123456'
			//       })
			//     };
			//   }
			/* Fallthrough case */
			default:
				return {
					statusCode: 500,
					body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE'
				};
		}
	} catch (err) {
		console.error('error ocurred in processing ', event);
		console.error(err);
		return {
			statusCode: 500,
			body: err.toString()
		};
	}
};
