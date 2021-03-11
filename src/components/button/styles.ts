import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"

export const basisStyles = StyleSheet.create({
    block: {
        width: "100%"
    },
    button: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        overflow: "hidden"
    },
    disabled: {
        opacity: 0.3
    },
    title: {
        paddingLeft: setUnit(6),
        paddingRight: setUnit(6)
    }
})

export const sizeStyle = StyleSheet.create({
    large: {
        borderRadius: setUnit(50),
        borderWidth: setUnit(2),
        height: setUnit(99),
        width: setUnit(340)
    },
    middle: {
        borderRadius: setUnit(36),
        borderWidth: setUnit(2),
        height: setUnit(72),
        width: setUnit(192)
    },
    small: {
        borderRadius: setUnit(28),
        borderWidth: setUnit(1),
        height: setUnit(56),
        width: setUnit(144)
    }
})
