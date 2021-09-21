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

  const handleReset = () => {
    value = ''
    file = null
  }
  
  onMount(() => {
    document.addEventListener('paste', handlePaste)
  })
</script>

<main>
  {#if file}
    <ImageColorInput file={file} bind:value={value}/>
    <button on:click={handleReset}>reset</button>
  {:else}
    <p>You can input the color value, or paste a image.</p>
    <input bind:value={value} spellcheck="false"/>
  {/if}
</main>

<style>
  button {
    margin-top: 24px;
  }
  p { 
    font-size: 14px;
  }
</style>