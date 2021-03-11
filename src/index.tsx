import { UIManager, Platform } from "react-native"

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true)


export { default as Button, ButtonProps } from "./components/button"
export { default as Actionsheet } from "./components/actionsheet"
export { default as ActionsheetList } from "./components/actionsheet-list"
export { default as ActionsheetListMnanger } from "./components/actionsheet-list/manager"
export { PortalHot } from "./components/portal/host"
export { PortalEmit } from "./components/portal/manager"
export { default as Toast } from "./components/toast"
export { default as Loading } from "./components/loading"
export { default as Card } from "./components/card"
export { default as Tag } from "./components/tag"
export { default as CheckBox } from "./components/checkbox"
export { Icons } from "./components/icons"
export { default as AddressPickerMananger } from "./components/address-picker"
export { default as Empty } from "./components/empty"
export { default as ModalManager } from "./components/modal/index"
export { default as Modal } from "./components/modal/Modal"
export { default as DatePickerManager, PICKER_TYPE } from "./components/date-picker"
export { default as Cell } from "./components/cell"
export { default as FlatList } from "./components/flat-list"
export { Update } from "./components/update"
import * as UTILS from "./libs/utils"
export { default as Storage } from "./libs/storage"
export { MbProvider, ThemeContext } from "./config"
export { default as Divider } from "./components/divider"
export { default as RadioButton } from "./components/radio-button"
export { default as Result, SUCCESS, ERROR } from "./components/result"
export { default as Switch } from "./components/switch"
import * as NetError from './components/net-error'
export {
    UTILS,
    NetError
}
