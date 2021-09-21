<script>
	import Logo from './Logo.svelte'
	import ColorInput from './ColorInput.svelte'
	import Converter from './Converter.svelte'
	let value = ''
</script>

<main>
	<Logo/>
	<ColorInput bind:value={value}/>
  <Converter value={value}/>
</main>

<style>
	main {
		padding: 0 24px;
		width: 900px;
		margin: 0 auto;
	}
</style>