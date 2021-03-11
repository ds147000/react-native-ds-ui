import React, { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Loading from "../loading"
import { setUnit } from "../../libs/utils"
import PropTypes from "prop-types"
import { ThemeContext } from "../../config"

const styles = StyleSheet.create({
    box: {
        alignItems: "center"
    },
    opaMask: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    text: {
        maxWidth: "80%",
        paddingTop: setUnit(8)
    }
})

interface LoadingToastProp {
    title?: string
    maskble?: boolean
    onShow: () => void
}

const LoadingContainer = ({ title }: { title?: string }) => {
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => (
                    <View style={styles.box}>
                        <Loading />
                        <Text style={[styles.text, { fontSize: theme.fontSize.middle, color: theme.colors.primary }]}>{title}</Text>
                    </View>
                )
            }
        </ThemeContext.Consumer>
    )
}

LoadingContainer.propTypes = {
    title: PropTypes.string
}

const LoadingToast: React.FC<LoadingToastProp> = ({ title, maskble, onShow }) => {

    useEffect(() => onShow(), [])

    return (
        <View style={styles.opaMask} collapsable={false} pointerEvents={maskble ? "auto" : "none"} >
            {title ? <LoadingContainer title={title} /> : <Loading />}
        </View>
    )
}

export {
    LoadingToast
}
