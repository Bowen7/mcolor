<script>
  import { onMount } from 'svelte'
  import ImageColorInput from './ImageColorInput.svelte'
  export let value
  let file = null
  
  const handlePaste = (event) => {
    const items = (event.clipboardData || window.clipboardData).items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.indexOf('image') === 0) {
        file = items[i].getAsFile()
        break
      }
    }
  }
  
  onMount(() => {
    document.addEventListener('paste', handlePaste)
  })
</script>

<main>
  <input bind:value={value}/>
  <ImageColorInput file={file}/>
</main>

<style>
</style>