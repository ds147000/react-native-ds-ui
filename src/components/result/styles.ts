import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"
import { button } from '../../config/theme/colors'

export const styles = StyleSheet.create({
    box: {
        alignItems: "center",
        padding: setUnit(32)
    },
    content: {
        color: button.none,
        fontSize: setUnit(28),
        paddingTop: setUnit(18)
    },
    title: {
        fontSize: setUnit(40),
        fontWeight: "600",
        paddingTop: setUnit(32)
    }
})
