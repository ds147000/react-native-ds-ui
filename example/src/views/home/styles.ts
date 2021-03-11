import { StyleSheet } from "react-native"
import { UTILS } from "react-native-ds-ui"

export const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    title: {
        fontSize: UTILS.setUnit(40),
        padding: UTILS.setUnit(50),
        textAlign: "center"
    }
})
