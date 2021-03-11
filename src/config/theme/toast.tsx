import React from "react"
import { StyleSheet } from "react-native"
import { setUnit } from "../../libs/utils"
import { Image } from "react-native"

const styles = StyleSheet.create({
    icon: {
        height: setUnit(240),
        width: setUnit(240)
    }
})

export interface Toast {
    fontSize?: number,
    infoBackground?: string,
    color?: string,
    icon: { success: React.ReactNode | string, warn: React.ReactNode | string, error: React.ReactNode | string }
}

const toast = {
    fontSize: setUnit(40),
    infoBackground: "rgba(0,0,0,0.6)",
    color: "#ffffff",
    icon: {
        success: <Image style={styles.icon} source={require("../../assets/images/success.png")} resizeMode="contain" />,
        warn: <Image style={styles.icon} source={require("../../assets/images/warn.png")} resizeMode="contain" />,
        error: <Image style={styles.icon} source={require("../../assets/images/error.png")} resizeMode="contain" />
    }
}

export default toast
