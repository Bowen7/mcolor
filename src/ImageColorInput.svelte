<script>
  import { onMount } from 'svelte'
  import throttle from 'lodash/throttle'
  export let file
  export let value
  let canvas
  let enlargedCanvas
  let imageData
  let position
  let locked = false

  const resetCanvas = () => {
    canvas.width = 0
    canvas.height = 0
    enlargedCanvas.width = 0
    enlargedCanvas.height = 0
  }

  const handleFileChange = (file) => {
    if (!canvas) {
      return
    }
    if (!file) {
      resetCanvas()
      return
    }
    const reader = new FileReader()
    reader.onload = event => {
      const img = new Image()
      img.src = event.target.result
      img.onload = function () {
        const { width, height } = this
        const ctx = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        imageData = ctx.getImageData(0, 0, width, height)
        position = [width / 2, height / 2]
      }
    }
    reader.readAsDataURL(file)
  }

  const handlePositionChange = (position, imageData) => {
    if (!position || !imageData) {
      return
    }
    const { width, height } = imageData
    const [x, y] = position

    enlargedCanvas.width = 100
    enlargedCanvas.height = 100
    const ctx = enlargedCanvas.getContext('2d')

    ctx.imageSmoothingEnabled = false
    ctx.mozImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.msImageSmoothingEnabled = false

    ctx.drawImage(canvas,
      Math.min(Math.max(0, x - 5), width - 10),
      Math.min(Math.max(0, y - 5), height - 10),
      10, 10,
      0, 0,
      100, 100)
  }

  const handleClick = () => {
    locked = true
  }
  const handleContextmenu = () => {
    locked = false
  }

  const handleMousemove = throttle((event) => {
    if (locked) {
      return
    }
    const x = event.offsetX
    const y = event.offsetY
    const { width, data } = imageData
    const r = data[(y * width + x) * 4]
    const g = data[(y * width + x) * 4 + 1]
    const b = data[(y * width + x) * 4 + 2]
    const a = data[(y * width + x) * 4 + 3] / 255
    value = [r, g, b, a]
    position = [x, y]
  }, 16)

  $: handlePositionChange(position, imageData)
  $: handleFileChange(file)

  onMount(() => {
    if (file) {
      handleFileChange(file)
    } else {
      resetCanvas()
    }
  })
</script>

<main>
  <div>
    <div>
      <div class="main-canvas">
        <canvas
          bind:this={canvas}
          on:mousemove={handleMousemove}
          on:click={handleClick}
          on:contextmenu={handleContextmenu}
        />
      </div>
    </div>
    <div class="enlarged-canvas">
      <canvas bind:this={enlargedCanvas} />
    </div>
  </div>
</main>

<style>
  .main-canvas {
    display: inline-block;
    max-width: 100%;
    max-height: 300px;
    overflow: auto;
    border: 1px solid #666;
    margin-bottom: 32px;
    font-size: 0;
  }
  .main-canvas > canvas {
    border: 1px solid #fff;
  }

  .enlarged-canvas {
    display: inline-block;
    width: 102px;
    height: 102px;
    border: 1px solid #000;
  }
  .enlarged-canvas > canvas {
    border: 1px solid #fff;
  }
</style>