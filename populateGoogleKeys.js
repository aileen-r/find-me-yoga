import { readFile, writeFile } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();
const filePath = './netlify/functions/googleapi-keys.json';

if (!process.env.GOOGLE_PROJECT_ID) {
	throw new Error('no GOOGLE_PROJECT_ID env var set');
}
if (!process.env.GOOGLE_PRIVATE_KEY_ID) {
	throw new Error('no GOOGLE_PRIVATE_KEY_ID env var set');
}
if (!process.env.GOOGLE_PRIVATE_KEY) {
	throw new Error('no GOOGLE_PRIVATE_KEY env var set');
}
if (!process.env.GOOGLE_CLIENT_EMAIL) {
	throw new Error('no GOOGLE_CLIENT_EMAIL env var set');
}
if (!process.env.GOOGLE_CLIENT_ID) {
	throw new Error('no GOOGLE_CLIENT_ID env var set');
}
if (!process.env.GOOGLE_CLIENT_CERT_URL) {
	throw new Error('no GOOGLE_CLIENT_CERT_URL env var set');
}

readFile(filePath, 'utf-8', (err, data) => {
	console.log('Reading keys file at', filePath);
	if (err) {
		throw err;
	}
	const keys = JSON.parse(data);

	keys.project_id = process.env.GOOGLE_PROJECT_ID;
	keys.private_key_id = process.env.GOOGLE_PRIVATE_KEY_ID;
	keys.private_key = process.env.GOOGLE_PRIVATE_KEY.replaceAll("\\n", "\n");
	keys.client_email = process.env.GOOGLE_CLIENT_EMAIL;
	keys.client_id = process.env.GOOGLE_CLIENT_ID;
	keys.client_x509_cert_url = process.env.GOOGLE_CLIENT_CERT_URL;

	writeFile(filePath, JSON.stringify(keys, null, 2), (err) => {
		if (err) {
			throw err;
		}
		console.log('Wrote keys to file', filePath);
	});
});
