import React, { useRef, useEffect, useCallback, useMemo } from "react"
import { View, Animated, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { styles, sizeStyles, dotStyles } from "./styles"
import { tuple } from "../../libs/type"
import PropTypes from "prop-types"
import { ThemeContext } from "../../config"
import { setUnit } from "../../libs/utils"

const SWITCH_SIZES = tuple("large", "default")
export type SWITCH_SIZE = typeof SWITCH_SIZES[number]

interface SwitchProps {
    /** @public 开关大小，可选值：default large */
    size?: SWITCH_SIZE
    /** @public 指定当前是否选中	 */
    checked?: boolean
    /** @public 变化时回调函数	 */
    onChange?: (value: boolean) => void
    /** @public 是否禁用	 */
    disabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({ size = "default", checked, onChange, disabled }) => {
    const value = useRef(new Animated.Value(0)).current

    const _open = useCallback(() => {
        Animated.timing(value, {
            toValue: 1,
            useNativeDriver: true,
            duration: 250
        }).start()
    }, [])

    const _close = useCallback(() => {
        Animated.timing(value, {
            toValue: 0,
            useNativeDriver: true,
            duration: 250
        }).start()
    }, [])

    const _onChange = () => {
        if (disabled) return

        if (onChange) onChange(!checked)
    }

    useEffect(() => {
        if (checked)
            _open()
        else
            _close()
    }, [checked])

    const maxMove = useMemo(() => (
        sizeStyles[size].width - setUnit(6) - dotStyles[size].width - dotStyles[size].left
    ), [size])


    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => {

                    const boxStyle = StyleSheet.flatten([
                        styles.box,
                        sizeStyles[size],
                        disabled ? {  opacity: 0.6, backgroundColor: theme.colors.disabled } : undefined
                    ])

                    return (
                        <TouchableWithoutFeedback style={styles.box} onPress={_onChange}>
                            <View style={boxStyle}>
                                <Animated.View style={[dotStyles[size], checked ? styles.open : styles.close,
                                {
                                    transform: [{
                                        translateX: value.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, maxMove]
                                        })
                                    }]
                                }]} />
                                <Animated.View style={[sizeStyles[size], { backgroundColor: theme.colors.primary, transform: [{ scale: value }] }]} />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
            }
        </ThemeContext.Consumer>

    )
}

Switch.propTypes = {
    checked: PropTypes.bool,
    size: PropTypes.oneOf(["large", "default"]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool
}

Switch.defaultProps = {
    checked: false,
    size: "default",
    onChange: () => { },
    disabled: false
}

export default Switch
