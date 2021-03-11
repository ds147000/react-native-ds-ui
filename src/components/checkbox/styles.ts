import { StyleSheet } from "react-native"
import colors, { checkbox } from "../../config/theme/colors"
import { setUnit } from "../../libs/utils"

export const SizeStyle = StyleSheet.create({
    middle: {
        borderRadius: setUnit(20),
        borderWidth: setUnit(2),
        height: setUnit(40),
        width: setUnit(40)
    },
    samll: {
        borderRadius: setUnit(18),
        borderWidth: setUnit(2),
        height: setUnit(36),
        width: setUnit(36)
    }
})

export const styles = StyleSheet.create({
    icon: {
        alignItems: "center",
        backgroundColor: colors.checkBack,
        borderColor: colors.divider,
        justifyContent: "center",
        marginBottom: setUnit(8),
        marginRight: setUnit(8),
        marginTop: setUnit(8)
    }
})

export const checkBoxStyle = StyleSheet.create({
    bottom: {
        alignItems: "center"
    },
    left: {
        alignItems: "center",
        flexDirection: "row-reverse"
    },
    right: {
        alignItems: "center",
        flexDirection: "row"
    },
    top: {
        alignItems: "center",
        flexDirection: "column-reverse"
    }
})

export const checkboxItem = StyleSheet.create({
    nornl: {
        backgroundColor: checkbox.nornlBack,
        borderColor: checkbox.nornl,
        borderWidth: setUnit(2)
    }
})
