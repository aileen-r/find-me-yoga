const NULL_COL_PRIORITY = ['duration', 'url', 'subscription', 'title', 'energy', 'style', 'instructor', 'bodyArea'];

function random(videos) {
  const randomIdx = Math.round(Math.random() * videos.length);
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

export default selectRandomVideo;