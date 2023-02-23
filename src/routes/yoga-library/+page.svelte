<script>
  /** @type {import('./$types').PageData} */  export let data;
</script>

<h1>Yoga library</h1>

<ol>
  {#each data.videos as video}
  <li><a href="{video.url}">{video.title}</a></li>
  {/each}
</ol>