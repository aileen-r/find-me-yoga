const NULL_COL_PRIORITY = ['duration', 'url', 'subscription', 'title', 'energy', 'style', 'instructor', 'bodyArea'];

function random(videos) {
  const randomIdx = Math.floor(Math.random() * videos.length);
  if (!videos[randomIdx]) {
    console.warn("Falling back to first video in list");
  }
  // console.log(videos.map(v => v.title));
  return videos[randomIdx] || videos[0]; // fallback just in case
}

function selectRandomVideo(videos) {
  for (let col of NULL_COL_PRIORITY) {
    if (videos.some(v => !v[col])) {
      return random(videos.filter(v => !v[col]));
    }
  }
  return random(videos);
}

// I have not made any attempt at optimising performance here so yikes probably
function selectUniqueRandomVideos(videos, count = 1) {
  if (videos.length === 0) {
    // this shouldn't even happen
    return [];
  }
  const chosenVideos = [];
  const chosenVideoUrls = new Set();
  for (let x = 0; x < count; x++) {
    const videoSet = videos.filter(v => !chosenVideoUrls.has(v.url));
    if (videoSet.length === 0) {
      break;
    }
    const video = selectRandomVideo(videoSet);
    chosenVideos.push(video);
    chosenVideoUrls.add(video.url);
  }
  return chosenVideos;
}

export default selectRandomVideo;
export {selectUniqueRandomVideos};