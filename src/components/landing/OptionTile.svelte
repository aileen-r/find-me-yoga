<script>
  // I don't have icons yet so let's roll with random emojis so my eyes don't get bored
  const emojis = ["💯", "💕", "🍕", "🧜🏻‍♀️", "🌊", "🔥", "🎡", "🧩", "🍋", "🐦", "🐌", "🏳️‍🌈", "🎀", "🧬", "🏆", "⛰️", "🪐", "🗺️", "💄", "🥿", "🃏", "💙"];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  export let text;
</script>

<div class="option-tile">
  <span class="icon">{emoji}</span>
  <span class="text">{text}</span>
</div>

<style lang="scss">
  .option-tile {
    border: 7px solid lightgrey;
    border-radius: 1.2em;
    height: 150px;
    margin: 12px;
    position: relative;
    width: 150px;

    .icon {
      font-size: 4em;
    }

    .text {
      bottom: 8px;
      left: 0;
      position: absolute;
      width: 100%;
    }
  }
</style>