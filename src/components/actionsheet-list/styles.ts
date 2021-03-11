import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"
import { actionsheetList } from '../../config/theme/colors'

export const styles = StyleSheet.create({
    cancelItem: {
        alignItems: "center",
        borderTopColor: actionsheetList.borderTop,
        borderTopWidth: setUnit(16),
        height: setUnit(114),
        justifyContent: "center",
        width: "100%"
    },
    item: {
        alignItems: "center",
        borderTopColor: actionsheetList.ItemBorderTop,
        borderTopWidth: setUnit(1),
        flexDirection: "row",
        paddingLeft: setUnit(24),
        paddingRight: setUnit(24),
        width: "100%"
    },
    itemText: {
        color: actionsheetList.itemText,
        flex: 1,
        fontWeight: "400"
    },
    list: {
        maxHeight: setUnit(545)
    }
})

export const ItemHeight = StyleSheet.create({
    large: {
        flex: 1,
        height: setUnit(114),
        lineHeight: setUnit(114)
    },
    middle: {
        flex: 1,
        height: setUnit(96),
        lineHeight: setUnit(96)
    }
})
