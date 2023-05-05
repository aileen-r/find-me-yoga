// https://www.swyx.io/netlify-google-sheets
import { google } from 'googleapis';

import getList from './videos/getList';
import getEntity from './videos/getEntity';
import getQueriedList from './videos/getQueriedList';
import { selectUniqueRandomVideos } from './videos/selectRandomVideo';
import { getUploadsByPlaylistId, addImportedVideosToSheet } from './videos/youtubeImport';

// required env vars
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
	// spreadsheet key is the long id in the sheets URL
	throw new Error('no GOOGLE_APPLICATION_CREDENTIALS env var set');
}
if (!process.env.GOOGLE_SPREADSHEET_ID) {
	// spreadsheet key is the long id in the sheets URL
	throw new Error('no GOOGLE_SPREADSHEET_ID env var set');
}

// https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f
const sheets = google.sheets('v4');
const youtube = google.youtube('v3');
const SCOPES = [
	'https://www.googleapis.com/auth/spreadsheets',
	'https://www.googleapis.com/auth/youtube'
];

function getAuth() {
	const auth = new google.auth.GoogleAuth({
		keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
		scopes: SCOPES
	});
	return auth;
}

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
					if (event.rawQuery) {
						// We won't have this for long, I'm just trying something new for this.
						const videos = await getQueriedList(
							spreadsheetId,
							auth,
							'Videos',
							event.queryStringParameters
						);
						if (videos.length === 0) {
							return {
								statusCode: 204
							};
						}
						let data = videos;
						if (event.queryStringParameters.random) {
							const chosenVideos = selectUniqueRandomVideos(videos, 4);
							data = {
								video: chosenVideos[0],
								others: chosenVideos.slice(1)
							};
						}
						return {
							statusCode: 200,
							body: JSON.stringify(data)
						};
					}
					const videos = await getList(sheets, spreadsheetId, auth, 'Videos');
					return {
						statusCode: 200,
						body: JSON.stringify(videos)
					};
				}
				if (segments.length === 1) {
					// TODO: move this to PUT eventually
					if (segments[0] === 'trigger') {
						// this is channel ID but with 'UU' instead of 'UC' at the start
						const ADRIENE_UPLOADS_PLAYLIST_ID = 'UUFKE7WVJfvaHW5q283SxchA';
						const uploads = await getUploadsByPlaylistId(ADRIENE_UPLOADS_PLAYLIST_ID, youtube, auth);
						const response = await addImportedVideosToSheet(sheets, spreadsheetId, auth, uploads);
						return {
							statusCode: 200,
							body: JSON.stringify(response)
							// 	// body: JSON.stringify(rows[rowId]) // just sends less data over the wire
						};
					}
					const rowId = segments[0];
					return await getEntity(sheets, spreadsheetId, auth, 'Videos', rowId);
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
			// /* PUT /.netlify/functions/videos/123456 */
			case 'PUT':
				/* PUT /.netlify/functions/videos */
				if (segments.length === 0) {
					console.error('PUT request must also have an id'); // we could allow mass-updating of the sheet, but nah
					return {
						statusCode: 422, // unprocessable entity https://stackoverflow.com/questions/3050518/what-http-status-response-code-should-i-use-if-the-request-is-missing-a-required
						body: 'PUT request must also have an id.'
					};
				}
				/* PUT /.netlify/functions/videos/trigger */
				if (segments.length === 1) {
					if (segments[0] === 'trigger') {
						return {
							statusCode: 200,
							body: JSON.stringify({ message: 'PUT trigger is a success!' })
							// 	// body: JSON.stringify(rows[rowId]) // just sends less data over the wire
						};
					} else {
						// const rowId = segments[0];
						// const rows = await sheet.getRows(); // can pass in { limit, offset }
						// const data = JSON.parse(event.body);
						// data.UserIP = UserIP;
						// console.log(`PUT invoked on row ${rowId}`, data);
						// const selectedRow = rows[rowId];
						// Object.entries(data).forEach(([k, v]) => {
						// 	selectedRow[k] = v;
						// });
						// await selectedRow.save(); // save updates
						// return {
						// 	statusCode: 200,
						// 	body: JSON.stringify({ message: 'PUT is a success!' })
						// 	// body: JSON.stringify(rows[rowId]) // just sends less data over the wire
						// };
					}
				} else {
					return {
						statusCode: 500,
						body: 'too many segments in PUT request - you should only call somehting like /.netlify/functions/videos/123456 not /.netlify/functions/videos/123456/789/101112'
					};
				}
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
