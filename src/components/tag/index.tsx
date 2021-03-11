import React from "react"
import { View, Text, StyleSheet, ViewProps } from "react-native"
import { setUnit } from "../../libs/utils"
import { tuple } from "../../libs/type"
import { ThemeContext } from "../../config"
import PropTypes from "prop-types"

const TagTypes = tuple("success", "error", "warn", "primary")
export type TagType = typeof TagTypes[number]

const TagSizes = tuple("middle", "large")
export type TagSize = typeof TagSizes[number]

export interface TagProps extends ViewProps {
    text: string
    type?: TagType
    color?: string
    size?: TagSize
}

const Tag: React.FC<TagProps> = ({ text = '', type = "primary", color, style, size = "middle", ...res }) => {
    return (
        <ThemeContext.Consumer>{
            ({ theme }) => {
                const inColor = color || theme.colors[type]
                const boxStyle = getBoxStyle(size, inColor)
                const textStyle = getTextStyle(size, inColor)
                return (
                    <View style={[boxStyle, style]} {...res} >
                        <Text numberOfLines={1} style={textStyle} >{text}</Text>
                        { size === "large" && <View style={[styles.mask, { backgroundColor: inColor }]} />}
                    </View>
                )
            }
        }</ThemeContext.Consumer>
    )
}

function getBoxStyle(size: TagSize, color: string) {
    if (size === "middle")
        return [{ backgroundColor: color }, styles.tag]
    else
        return [styles.largeTag, { borderColor: color }]
}

function getTextStyle(size: TagSize, color: string) {
    if (size === "middle")
        return styles.text
    else
        return [styles.text, { color: color }]
}

const textColor = "#fff"

const styles = StyleSheet.create({
    largeTag: {
        alignItems: "center",
        borderRadius: setUnit(4),
        borderWidth: setUnit(2),
        height: setUnit(40),
        justifyContent: "center",
        overflow: "hidden"
    },
    mask: {
        height: "100%",
        left: setUnit(0),
        opacity: 0.3,
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: -1
    },
    tag: {
        alignItems: "center",
        borderRadius: setUnit(4),
        height: setUnit(32),
        justifyContent: "center",
        overflow: "hidden"
    },
    text: {
        color: textColor,
        fontSize: setUnit(24),
        paddingLeft: setUnit(4),
        paddingRight: setUnit(4)
    }
})

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(TagTypes),
    color: PropTypes.string,
    size: PropTypes.oneOf(TagSizes)
}

Tag.defaultProps = {
    type: "primary",
    size: "middle"
}

export default Tag
