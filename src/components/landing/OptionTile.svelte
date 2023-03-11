<script>
  export let checked;
  export let text;
</script>

<div class="option-tile" class:checked>
  <img class="icon" alt="Placeholder" src="https://dummyimage.com/80x80/d3d3d3/000">
  <span class="text">{text}</span>
</div>

<style lang="scss">
  .option-tile {
    border: 7px solid #d3d3d3;
    border-radius: 1.2em;
    cursor: pointer;
    height: 150px;
    margin: 12px;
    position: relative;
    width: 150px;

    &:hover {
      background-color: lightgrey;
    }

    &.checked {
      background-color: black;
      border-color: black;
      color: white;
    }

    .icon {
      font-size: 4em;
      margin: 10px auto 0;
      position: relative;
    }

    .text {
      bottom: 8px;
      left: 0;
      position: absolute;
      width: 100%;
    }
  }
</style>