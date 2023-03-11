function selectRandomVideo(videos) {
  const randomIdx = Math.round(Math.random() * videos.length);
  return videos[randomIdx] || videos[0]; // fallback just in case
}

export default selectRandomVideo;