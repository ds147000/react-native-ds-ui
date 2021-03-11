import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"
import colors, { button } from '../../config/theme/colors'

export const styles = StyleSheet.create({
    CellButton: {
        flexDirection: "row",
        height: setUnit(96),
        justifyContent: "center",
        width: setUnit(560)
    },
    button: {
        borderRightWidth: setUnit(1),
        borderTopWidth: setUnit(1),
        flex: 1,
        height: setUnit(96),
        justifyContent: "center"
    },
    content: {
        alignItems: "center",
        paddingBottom: setUnit(56),
        paddingLeft: setUnit(24),
        paddingRight: setUnit(24),
        paddingTop: setUnit(40),
        width: "100%"
    },
    contentText: {
        color: colors.text,
        fontSize: setUnit(30),
        paddingTop: setUnit(16),
        textAlign: 'center'
    },
    listButton: {
        width: setUnit(560)
    },

    mask: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
    },
    modal: {
        backgroundColor: colors.background,
        borderRadius: setUnit(16),
        overflow: "hidden",
        width: setUnit(560)
    },
    title: {
        fontSize: setUnit(36),
        fontWeight: "500"
    }
})

export const ButtonTextStyle = StyleSheet.create({
    cancel: {
        fontSize: setUnit(36),
        textAlign: "center"
    },
    none: {
        color: button.none,
        fontSize: setUnit(36),
        textAlign: "center"
    },
    ok: {
        fontSize: setUnit(36),
        fontWeight: "600",
        textAlign: "center"
    }
})
