<script>
  export let value
  let r = 0
  let g = 0
  let b = 0
  let a = 0
  let list = []

  const convertFromHex = (value) => {
    if (value[0] === '#') {
      value = value.slice(1)
    }
    // handle 3-digit hex color, #000 => #000000
    if (value.length === 3) {
      value = value.split('').reduce((prev, item) => {
        prev += (item + item)
        return prev
      }, '')
    }
    value = '0x' + value
    r = (value >> 16) & 255
    g = (value >> 8) & 255
    b = value & 255
    a = 1
  }
  const convertToHex = () => {}

  const convertFromHex8 = (value) => {}
  const convertToHex8 = () => {}

  const convertFromRgb = (value) => {}
  const convertToRgb = () => {
    return { label: 'rgb', text: `rgb(${r}, ${g}, ${b})` }
  }

  const convertFromRgba = () => {}
  const convertToRgba = () => {
    return { label: 'rgba', text: `rgba(${r}, ${g}, ${b}, ${a})` }
  }

  const genList = (excludedType) => {
    list = []
    const types = ['hex', 'hex8', 'rgb', 'rgba'].filter(type => type !== excludedType)
    types.forEach(type => {
      switch (type) {
        case 'hex':
          list.push(convertToHex())
          break
        case 'rgb':
          list.push(convertToRgb())
          break
        case 'rgba':
          list.push(convertToRgba())
          break
        default:
          break
      }
    })
  }

  const typeMap = {
    hex: /^#?([A-Fa-f0-9]{3}){1,2}$/,
    hex8: /^#?[A-Fa-f0-9]{8}$/,
    rgb: /^rgb\( *\d{1,3} *, *\d{1,3} *, *\d{1,3} *\)/,
    rgba: /^rgba\(( *\d{1,3} *,){3} *[\d.]+ *\)/,
  }

  const detectType = (value) => {
    console.log(value)
    if (!value) {
      return
    }
    value = value.trim()
    const types = Object.keys(typeMap)
    for (let i = 0; i < types.length; i++) {
      const type = types[i]
      if (typeMap[type].test(value)) {
        switch (type) {
          case 'hex':
            convertFromHex(value)
            break
          case 'hex8':
            convertFromHex8(value)
            break
          default:
            break
        }
        genList(type)
        return
      }
    }
  }

  $: detectType(value)
</script>

<main>
  {#each list as item}
		<p>{item.label}: {item.text}</p>
	{/each}
</main>

<style>
</style>