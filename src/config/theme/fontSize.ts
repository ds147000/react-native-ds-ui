import { setUnit } from "../../libs/utils"


export interface FontSize {
  large?: number
  small?: number
  middle?: number
  button?: FontSize
}

const fontSize = {
  large: setUnit(32),
  small: setUnit(18),
  middle: setUnit(24),
  button: {
    large: setUnit(32),
    small: setUnit(24),
    middle: setUnit(29)
  }
}

export default fontSize
