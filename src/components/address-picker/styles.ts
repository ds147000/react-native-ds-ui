import { StyleSheet } from "react-native"
import { actionsheetList } from "../../config/theme/colors"
import { setUnit } from "../../libs/utils"

export const styles = StyleSheet.create({
    box: {
        flex: 1
    },
    content: {
        height: setUnit(808),
        width: setUnit(750)
    },
    head: {
        alignItems: "center",
        borderBottomColor: actionsheetList.borderBotttom,
        borderBottomWidth: setUnit(2),
        flexDirection: "row"
    },
    headItem: {
        maxWidth: setUnit(200),
        paddingBottom: setUnit(12),
        paddingLeft: setUnit(16),
        paddingRight: setUnit(16),
        paddingTop: setUnit(12)
    },
    headItemTitle: {
        color: actionsheetList.text2,
        fontWeight: "400"
    },
    icon: {
        position: "absolute",
        right: setUnit(32),
        top: 6
    },
    line: {
        backgroundColor: actionsheetList.line,
        borderRadius: setUnit(2),
        height: setUnit(4),
        width: setUnit(52)
    },
    list: {
        height: setUnit(808),
        paddingTop: setUnit(16),
        width: setUnit(750)
    },
    listItem: {
        paddingBottom: setUnit(16),
        paddingLeft: setUnit(32),
        paddingRight: setUnit(32),
        paddingTop: setUnit(16)
    },
    listItemTitle: {
        color: actionsheetList.itemTitle,
        fontSize: setUnit(28)
    },
    slider: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        left: 0,
        position: "absolute",
        width: "100%"
    },
    title: {
        color: actionsheetList.text3,
        fontSize: setUnit(32),
        fontWeight: "500"
    }
})
