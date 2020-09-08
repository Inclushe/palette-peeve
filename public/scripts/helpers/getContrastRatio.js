import HSLToRGB from './HSLToRGB'

export default function (firstColor, secondColor) {
  const firstColorLuminance = relativeLuminanceFromRGB(HSLToRGB(firstColor))
  const secondColorLuminance = relativeLuminanceFromRGB(HSLToRGB(secondColor))
  if (firstColorLuminance > secondColorLuminance) {
    return (firstColorLuminance + 0.05) / (secondColorLuminance + 0.05)
  } else {
    return (secondColorLuminance + 0.05) / (firstColorLuminance + 0.05)
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
