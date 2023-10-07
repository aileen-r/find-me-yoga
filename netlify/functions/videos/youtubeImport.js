// DO NOT EVER be tempted to use the search endpoint. It costs 100 quota points

// async function getUploadsPlaylistIdByUsername(username, youtube, auth) {
// 	const channelResponse = await youtube.channels.list({
// 		auth,
// 		part: 'contentDetails',
// 		forUsername: username
// 	});
// 	const uploadsPlaylistId = channelResponse?.relatedPlaylists?.uploads;

// 	return uploadsPlaylistId;
// }

function constructUrlFromVideoId(id) {
	return `https://www.youtube.com/watch?v=${id}`;
}

/**
 * Converts YouTube API response duration into hh:mm:ss (assumes duration < 24h)
 * @param {string} duration
 */
function convertDuration(duration) {
	const pattern = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
	const match = pattern.exec(duration);
	if (!match) {
		return '';
	}
	const formatMatchGroup = (group) => {
		const num = parseInt(group, 10) || 0;
		if (num === 0) {
			return '00';
		}
		return num.toString().length === 1 ? `0${num}` : num.toString();
	};

	const hours = formatMatchGroup(match[1]);
	const minutes = formatMatchGroup(match[2]);
	const seconds = formatMatchGroup(match[3]);

	const isShort = hours === '00' && minutes === '02' || minutes === '00' || minutes === '00';

	if (isShort) {
		return 0; // for filtering later
	}

	return `${hours}:${minutes}:${seconds}`;
}

async function getDurationForVideos(youtube, auth, videos) {
	// https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key={YOUR_API_KEY}

	const res = await youtube.videos.list({
		auth,
		id: videos.map((v) => v.id),
		part: ['contentDetails']
	});

	const durationsById = new Map(
		res?.data?.items?.map((x) => [x.id, convertDuration(x.contentDetails.duration)])
	);

	return videos.map((v) => ({
		...v,
		duration: durationsById.get(v.id)
	}));
}

async function getUploadsByPlaylistId(playlistId, youtube, auth, instructor = '', nextPageToken = null) {
	const res = await youtube.playlistItems.list({
		auth,
		playlistId,
		part: ['snippet'],
		maxResults: 50,
    pageToken: nextPageToken
	});

	let videos = res.data.items.map(item => ({
    title: item?.snippet?.title,
    url: constructUrlFromVideoId(item?.snippet?.resourceId?.videoId),
    instructor,
    thumbnail: item?.snippet?.thumbnails?.maxres?.url ?? item?.snippet?.thumbnails?.standard?.url ?? item?.snippet?.thumbnails?.high?.url,
    id: item?.snippet?.resourceId?.videoId,
		subscription: 'YouTube'
  }))

  videos = (await getDurationForVideos(youtube, auth, videos)).filter(video => video.duration !== 0);

	return {videos, totalResults: res.data.pageInfo.totalResults, nextPageToken: res.data.nextPageToken};
}

async function getExistingUrls(sheets, spreadsheetId, auth) {
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId,
		auth,
		majorDimension: 'COLUMNS',
		range: 'Videos!B:B'
	});
	return new Set(res?.data.values[0]);
}

function formatVideoIntoRowArray(video) {
	return [video.title, video.url, video.duration, '', '', video.instructor, video.subscription, '', video.thumbnail, 'FALSE', '=ROW()'];
}

async function addImportedVideosToSheet(sheets, spreadsheetId, auth, videos) {
	const urlSet = await getExistingUrls(sheets, spreadsheetId, auth);

	const videosToAdd = videos.filter((v) => !urlSet.has(v.url)).map(v => formatVideoIntoRowArray(v));

	const response = await sheets.spreadsheets.values.append({
		spreadsheetId,
		auth,
		range: 'Videos!A:I',
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			majorDimension: 'ROWS',
			values: videosToAdd
		}
	});
	return response?.data;
}

export { getUploadsByPlaylistId, addImportedVideosToSheet };
