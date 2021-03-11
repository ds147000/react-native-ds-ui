import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"
import colors from '../../config/theme/colors'

export const styles = StyleSheet.create({
    box: {
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
    },
    content: {
        flex: 1
    },
    flex: {
        flex: 1
    },
    head: {
        alignItems: "center",
        flexDirection: "row",
        padding: setUnit(32)
    },
    headTitle: {
        flex: 1,
        fontSize: setUnit(32),
        fontWeight: "500"
    },
    mask: {
        backgroundColor: colors.mask,
        flex: 1
    },
    plane: {
        bottom: 0,
        left: 0,
        overflow: "hidden",
        paddingBottom: setUnit(30),
        position: "absolute",
        width: "100%",
        zIndex: 100
    },
    planeBlock: {
        borderRadius: 0
    },
    planeRedius: {
        borderTopLeftRadius: setUnit(32),
        borderTopRightRadius: setUnit(32)
    }
})
