import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"
import colors, { button } from '../../config/theme/colors'

export const styles = StyleSheet.create({
    box: {
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: setUnit(2),
        overflow: "hidden"
    },
    close: {
        elevation: 2,
        shadowColor: button.shadowColor,
        shadowOffset: {
            width: setUnit(2),
            height: setUnit(4)
        },
        shadowOpacity: 0.2,
        shadowRadius: setUnit(4)
    },
    open: {
        elevation: 2,
        shadowColor: button.shadowColor,
        shadowOffset: {
            width: setUnit(-2),
            height: setUnit(4)
        },
        shadowOpacity: 0.2,
        shadowRadius: setUnit(4)
    }
})

export const sizeStyles = StyleSheet.create({
    default: {
        borderRadius: setUnit(31),
        height: setUnit(52),
        width: setUnit(92)
    },
    large: {
        borderRadius: setUnit(32),
        height: setUnit(64),
        width: setUnit(120)
    }
})

export const dotStyles = StyleSheet.create({
    default: {
        backgroundColor: colors.background,
        borderRadius: setUnit(22),
        height: setUnit(44),
        left: setUnit(2),
        position: "absolute",
        top: setUnit(2),
        width: setUnit(44),
        zIndex: 5
    },
    large: {
        backgroundColor: colors.background,
        borderRadius: setUnit(28),
        height: setUnit(56),
        left: setUnit(2),
        position: "absolute",
        top: setUnit(2),
        width: setUnit(56),
        zIndex: 5
    }
})
