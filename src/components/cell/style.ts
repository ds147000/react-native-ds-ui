import { StyleSheet } from "react-native"
import colors, { cell } from "../../config/theme/colors"
import { setUnit } from "../../libs/utils"

export const styles = StyleSheet.create({
    cell: {
        backgroundColor: colors.background,
        height: setUnit(96),
        paddingLeft: setUnit(24),
        width: "100%"
    },
    clounsCell: {
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
        borderBottomWidth: setUnit(2),
        height: setUnit(168),
        paddingLeft: setUnit(24),
        width: "100%"

    },
    clounsContent: {
        alignItems: "center",
        flexDirection: "row",
        height: setUnit(96),
        paddingRight: setUnit(24)
    },
    clounsLabel: {
        borderBottomColor: colors.border,
        borderBottomWidth: setUnit(2),
        height: setUnit(72),
        justifyContent: "center"
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    inputContent: {
        color: cell.color,
        flex: 1,
        fontSize: setUnit(28),
        fontWeight: "400",
        height: setUnit(96)
    },
    label: {
        color: cell.label,
        fontSize: setUnit(28),
        fontWeight: "500",
        width: setUnit(164)
    },
    page: { flex: 1 },
    placeholder: {
       fontSize: setUnit(28),
       fontWeight: "400"
    },
    slot: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        paddingRight: setUnit(24)
    },
    slotBottomBorder: {
        borderBottomColor: cell.bottom,
        borderBottomWidth: setUnit(2)
    },
    slotClouns: {
        flexDirection: "column"
    },
    slotDisabled: {
        opacity: 0.25
    },
    slotTopBorder: {
        borderTopColor: cell.bottom,
        borderTopWidth: setUnit(2)
    },
    value: {
        color: cell.color,
        fontSize: setUnit(28),
        fontWeight: "400"
    }
})
