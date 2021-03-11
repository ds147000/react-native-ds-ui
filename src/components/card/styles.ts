import { StyleSheet } from "react-native"
import colors, { card } from "../../config/theme/colors"
import { setUnit } from "../../libs/utils"

export const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background,
        borderRadius: setUnit(16),
        elevation: 2,
        marginLeft: setUnit(20),
        marginRight: setUnit(20),
        marginTop: setUnit(20),
        paddingBottom: setUnit(22),
        paddingLeft: setUnit(24),
        paddingRight: setUnit(24),
        paddingTop: setUnit(22),
        shadowColor: card.shadowColor,
        shadowOffset: {
            width: setUnit(4),
            height: setUnit(8)
        },
        shadowOpacity: 0.08,
        width: setUnit(702)
    },
    floor: {
        borderTopColor: colors.border,
        borderTopWidth: setUnit(2)
    },
    head: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: setUnit(20)
    },
    maxContent: {
        minHeight: setUnit(280)
    },
    minContent: {
        height: setUnit(280)
    },
    moreButton: {
        alignContent: "center",
        flexDirection: "row"
    },
    moreText: {
        color: card.tipsText,
        fontSize: setUnit(24)
    },
    title: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    }
})
