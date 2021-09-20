<script>
	import ColorInput from './ColorInput.svelte'
	import Converter from './Converter.svelte'
	let value = ''
</script>

<main>
	<ColorInput bind:value={value}/>
  <Converter value={value}/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>