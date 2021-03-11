import React, { memo } from "react"
import { View, Image, StyleSheet, Text, ViewProps } from "react-native"
import { setUnit } from "../../libs/utils"
import PropTypes from "prop-types"
import { actionsheetList } from '../../config/theme/colors'

export interface EmptyProps extends ViewProps {
    title?: string,
    /** @public 自定义空列表内容 */
    icon?: React.ReactNode,
}

const styles = StyleSheet.create({
    box: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingTop: setUnit(20)
    },
    icon: {
        height: setUnit(219),
        width: setUnit(350)
    },
    text: {
        color: actionsheetList.text3,
        paddingTop: setUnit(20),
        textAlign: "center",
        width: setUnit(700)
    }
})

const Empty: React.SFC<EmptyProps> = (props) => {
    const { title, icon, style } = props
    if (icon)
        return <View style={[styles.box, style]} pointerEvents="none" >{icon}</View>
    else
        {return (
            <View style={[styles.box, style]} pointerEvents="none" >
                <Image source={require("../../assets/images/empty.png")} style={styles.icon} resizeMode="contain" />
                <Text style={styles.text} numberOfLines={2}>{title}</Text>
            </View>
        )}
}

Empty.propTypes = {
    title: PropTypes.string
}

Empty.defaultProps = {
    title: ""
}

export default memo(Empty)
