export default function (firstColor, secondColor) {
  const firstColorLuminance = relativeLuminanceFromRGB(HSLToRGB(firstColor))
  const secondColorLuminance = relativeLuminanceFromRGB(HSLToRGB(secondColor))
  if (firstColorLuminance > secondColorLuminance) {
    return (firstColorLuminance + 0.05) / (secondColorLuminance + 0.05)
  } else {
    return (secondColorLuminance + 0.05) / (firstColorLuminance + 0.05)
  }
}

// Original code by Jon Kantner: https://css-tricks.com/converting-color-spaces-in-javascript/
function HSLToRGB (hslObject) {
  const h = hslObject.hue
  let s = hslObject.saturation
  let l = hslObject.lightness

  // Must be fractions of 1
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return {
    red: r,
    green: g,
    blue: b
  }
}

function relativeLuminanceFromRGB ({ red, green, blue }) {
  red /= 255
  green /= 255
  blue /= 255
  red = (red <= 0.03928) ? red / 12.92 : Math.pow(((red + 0.055) / 1.055), 2.4)
  green = (green <= 0.03928) ? green / 12.92 : Math.pow(((green + 0.055) / 1.055), 2.4)
  blue = (blue <= 0.03928) ? blue / 12.92 : Math.pow(((blue + 0.055) / 1.055), 2.4)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}
