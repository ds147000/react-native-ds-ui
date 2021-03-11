import { StyleSheet } from "react-native"
import { UTILS } from "react-native-ds-ui"

export const styles = StyleSheet.create({
    button: {
        margin: UTILS.setUnit(10)
    },
    page: { flex: 1 },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: UTILS.setUnit(25),
        width: "100%"
    },
    title: {
        fontSize: UTILS.setUnit(40),
        padding: UTILS.setUnit(20),
        textAlign: "center"
    }
})
