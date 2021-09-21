<script>
  export let value
  let r = 0
  let g = 0
  let b = 0
  let a = 0
  let colorList = []

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
  const componentToHex = (c) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  const convertToHex = () => {
    return { label: 'HEX', text: '#' + componentToHex(r) + componentToHex(g) + componentToHex(b) }
  }

  const convertFromHex8 = (value) => {}
  // const convertToHex8 = () => {}

  const convertFromRgb = (value) => {
    value = value.slice(4, -1).replace(/ *, */g, ',');
    ([r, g, b] = value.split(',').map(item => Number(item)))
    a = 1
  }
  const convertToRgb = () => {
    return { label: 'RGB', text: `rgb(${r}, ${g}, ${b})` }
  }

  const convertFromRgba = () => {
    value = value.slice(5, -1).replace(/ *, */g, ',');
    ([r, g, b, a] = value.split(',').map(item => Number(item)))
  }
  const convertToRgba = () => {
    return { label: 'RGBA', text: `rgba(${r}, ${g}, ${b}, ${a})` }
  }

  const convertToVec3 = () => {
    const rgbText = [r, g, b].map(item => (item / 255).toFixed(3)).join(', ')
    return { label: 'GLSL VEC3', text: `vec3(${rgbText})` }
  }

  const convertToVec4 = () => {
    const rgbText = [r, g, b].map(item => (item / 255).toFixed(3)).join(', ')
    return { label: 'GLSL VEC4', text: `vec4(${rgbText}, ${a})` }
  }

  const genColorList = (excludedType) => {
    colorList = []
    const types = ['hex', 'hex8', 'rgb', 'rgba', 'vec3', 'vec4'].filter(type => type !== excludedType)
    types.forEach(type => {
      switch (type) {
        case 'hex':
          colorList.push(convertToHex())
          break
        case 'rgb':
          colorList.push(convertToRgb())
          break
        case 'rgba':
          colorList.push(convertToRgba())
          break
        case 'vec3':
          colorList.push(convertToVec3())
          break
        case 'vec4':
          colorList.push(convertToVec4())
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
    if (!value) {
      colorList = []
      return
    }
    if (Array.isArray(value)) {
      ([r, g, b, a] = value)
      genColorList('')
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
          case 'rgb':
            convertFromRgb(value)
            break
          case 'rgba':
            convertFromRgba(value)
            break
          default:
            break
        }
        genColorList(type)
        return
      }
    }
  }

  $: detectType(value)
</script>

<main>
  {#if value}
    <div class="legend-container">
      <div class="legend" style="background: rgba({r}, {g}, {b}, {a});"></div>
    </div>
  {/if}
  {#each colorList as item}
		<p>{item.label}: {item.text}</p>
	{/each}
</main>

<style>
  .legend-container {
    border: 1px solid #000;
    margin-top: 12px;
    width: 22px;
    height: 22px;
  }
  .legend {
    border: 1px solid #fff;
    width: 20px;
    height: 20px;
  }
</style>