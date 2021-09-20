<script>
  import { onMount } from 'svelte'
  export let file
  let canvas
  let enlargedCanvas
  let imageData
  let position

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
        canvas.addEventListener('mousemove', function (event) {
          const x = event.layerX
          const y = event.layerY
          position = [x, y]
        })
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

    enlargedCanvas.width = 200
    enlargedCanvas.height = 200
    const ctx = enlargedCanvas.getContext('2d')

    ctx.imageSmoothingEnabled = false
    ctx.mozImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.msImageSmoothingEnabled = false

    ctx.drawImage(canvas,
      Math.min(Math.max(0, x - 5.5), width - 11),
      Math.min(Math.max(0, y - 5.5), height - 11),
      11, 11,
      0, 0,
      200, 200)
  }

  $: handlePositionChange(position, imageData)
  $: handleFileChange(file)

  onMount(resetCanvas)
</script>

<main>
  <canvas bind:this={canvas} />
  <canvas bind:this={enlargedCanvas} />
</main>

<style>
</style>