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

async function getUploadsByPlaylistId(playlistId, youtube, auth) {
	// GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=UUpRmvjdu3ixew5ahydZ67uA&key={YOUR_API_KEY}

	let totalResults, nextPageToken;
	const videos = [];
	const addVideo = (video) => {
		videos.push({
			title: video?.snippet?.title,
			url: constructUrlFromVideoId(video?.snippet?.resourceId?.videoId),
			// TODO: duration; requires a videos list call with contentDetails,
			instructor: 'Yoga with Adriene',
			thumbnail: video?.snippet?.thumbnails?.default?.url
		});
	};

	const firstResponse = await youtube.playlistItems.list({
		auth,
		playlistId,
		part: ['snippet'],
		maxResults: 20
	});

	totalResults = firstResponse?.data?.pageInfo?.totalResults;
	nextPageToken = firstResponse?.data?.nextPageToken;

	firstResponse.data.items.forEach((i) => {
		addVideo(i);
	});

	// while (videos.length < totalResults) {
	// 	const response = await youtube.playlistItems.list({
	// 		auth,
	// 		playlistId,
	// 		part: ['snippet'],
	// 		maxResults: 50,
	// 		pageToken: nextPageToken
	// 	});

	// 	nextPageToken = response?.data?.nextPageToken;

	// 	response?.data?.items?.forEach((i) => {
	// 		addVideo(i);
	// 	});
	// }

	return videos;
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
	return [video.title, video.url, '', '', '', video.instructor, 'YouTube', '', video.thumbnail];
}

async function addImportedVideosToSheet(sheets, spreadsheetId, auth, videos) {
	const urlSet = await getExistingUrls(sheets, spreadsheetId, auth);

  const videosToAdd = videos.filter(v => !urlSet.has(v.url)).map(formatVideoIntoRowArray);

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
