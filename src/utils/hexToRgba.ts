/**
 * hexToRgba
 * a function transform hex to rgba with extra data
 * @param hex hex color to be replaced with rgba
 * @param alpha opacity of hex color
 * @returns rgba, contrast, luminance
 */
export const hexToRgba = (
  hex: string,
  alpha = 1
): {
  rgba: string
  type: string
  luminance: number
} => {
  const [r, g, b]: number[] = (hex.match(/\w\w/g) || []).map((x: string) =>
    parseInt(x, 16)
  ) // extract R, G, B
  const y: number = 0.2126 * r + 0.7152 * g + 0.0722 * b // RGB to compute luminance
  const c: string = y < 128 ? 'black' : 'white' // Determine color type dark/white
  return {
    rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`,
    type: c,
    luminance: y,
  }
}
