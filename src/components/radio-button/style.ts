import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"


export const styles = StyleSheet.create({
    commonIcon: {
        bottom: setUnit(0),
        position: "absolute",
        right: setUnit(0)
    }
})

export const basisStyles = StyleSheet.create({
    block: {
        width: "100%"
    },
    button: {
        alignItems: "center",
        borderWidth: setUnit(2),
        flexDirection: "row",
        height: "100%",
        justifyContent: "center",
        overflow: "hidden"
    },
    disabled: {
        opacity: 0.3
    },
    title: {
        paddingLeft: setUnit(6),
        paddingRight: setUnit(6)
    }
})

export const btnOutersizeStyle = StyleSheet.create({
    large: {
        height: setUnit(99),
        marginLeft: setUnit(24),
        marginTop: setUnit(24),
        width: setUnit(340)
    },
    middle: {
        height: setUnit(72),
        marginLeft: setUnit(24),
        marginTop: setUnit(24),
        width: setUnit(218)
    },
    small: {
        height: setUnit(64),
        marginLeft: setUnit(20),
        marginTop: setUnit(20),
        width: setUnit(160)
    }
})
export const sizeStyle = StyleSheet.create({
    large: {
        borderRadius: setUnit(10)
    },
    middle: {
        borderRadius: setUnit(8)
    },
    small: {
        borderRadius: setUnit(5)
    }
})

export const fontSizeStyle: { [key: string]: number } = {
    large: setUnit(32),
    middle: setUnit(29),
    small: setUnit(24)
}

export const iconSizeStyle: { [key: string]: number } = {
    large: setUnit(50),
    middle: setUnit(40),
    small: setUnit(30)
}
