/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from "react"
import { View, Text, StyleSheet, ActivityIndicator, ViewProps, ViewStyle, TextStyle } from "react-native"
import { Touchable } from "../Touchble"
import { basisStyles, sizeStyle } from "./styles"
import { ThemeContext } from "../../config"
import { tuple } from "../../libs/type"
import PropTypes from "prop-types"

const ButtonSizes = tuple("large", "middle", "small")
export type ButtonSize = typeof ButtonSizes[number]

const ButtonTypes = tuple("default", "primary", "warn", "success", "error")
export type ButtonType = typeof ButtonTypes[number]

export interface ContentProps extends ViewProps {
    title?: string
    type?: ButtonType
    size?: ButtonSize
    icon?: string | React.ReactNode
    loading?: boolean
    ghost?: boolean
    block?: boolean
    children?: React.ReactNode
}

export interface ButtonProps extends ContentProps {
    disabled?: boolean
    onPress?: () => void
}

/** 获取标题样式 */
function getTitleStyle(theme: any, size: ButtonSize = "small", type: ButtonType = "primary", ghost = false): TextStyle {
    const color = ghost && type !== "default" ? theme.colors[type] : theme.colors.textColor(type)
    const styleArray = [
        basisStyles.title,
        {
            fontSize: theme.fontSize.button[size],
            color
        }
    ]

    return StyleSheet.flatten(styleArray)
}
/** 获取按钮样式 */
function getButtonStyle(theme: any, size: ButtonSize = "small", type: ButtonType = "primary", block = false, ghost = false): ViewStyle {
    const backgroundColor = ghost ? "#00000000" : theme.colors[type]
    const borderColor = type === 'default' ? theme.colors.textColor(type) : theme.colors[type]
    const styleArray = [basisStyles.button, sizeStyle[size], { backgroundColor, borderColor }, block ? basisStyles.block : undefined]

    return StyleSheet.flatten(styleArray)
}

const Content = memo((props: ContentProps) => {
    const { title, type, size, block, icon, loading, ghost, children, style } = props

    return (
        <ThemeContext.Consumer>
            {({ theme }) => {
                const titleStyle = getTitleStyle(theme, size, type, ghost)
                const buttonStyle = getButtonStyle(theme, size, type, block, ghost)

                if (loading)
                    {return (
                        <View style={[buttonStyle, style]}>
                            {icon}
                            {children}
                            <ActivityIndicator animating={true} size="small" color={titleStyle.color} />
                        </View>
                    )}
                else
                    {return (
                        <View style={[buttonStyle, style]}>
                            {icon}
                            {children}
                            {title !== null && (
                                <Text style={titleStyle} numberOfLines={1}>
                                    {title}
                                </Text>
                            )}
                        </View>
                    )}
            }}
        </ThemeContext.Consumer>
    )
})

/** 组件 */
const Button: React.FC<ButtonProps> = ({ onPress, disabled, loading, ...res }) => {
    const style = disabled ? basisStyles.disabled : undefined

    return (
        <Touchable onPress={onPress} disabled={disabled || loading} style={style}>
            <Content {...res} loading={loading} />
        </Touchable>
    )
}

Button.propTypes = {
    /** @param 按钮标题 */
    title: PropTypes.string,
    /** @param 是否出现加载状态 */
    loading: PropTypes.bool,
    /** @param 按钮类型 */
    type: PropTypes.oneOf(ButtonTypes),
    /** @param 是否禁用 */
    disabled: PropTypes.bool,
    /** @param 按钮图标 */
    icon: PropTypes.any,
    /** @param 按钮大型类型 */
    size: PropTypes.oneOf(ButtonSizes),
    /** @param 是否铺满父亲 */
    block: PropTypes.bool,
    /** @param 幽灵属性，背景颜色透明 */
    ghost: PropTypes.bool,
    onPress: PropTypes.func
}

Button.defaultProps = {
    loading: false,
    type: "primary",
    disabled: false,
    icon: null,
    onPress: () => {},
    size: "small",
    block: false
}

export default Button
