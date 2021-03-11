import React, { useMemo, useState } from "react"
import { View, TouchableWithoutFeedback, ViewStyle, ViewProps } from "react-native"
import { styles, checkBoxStyle, SizeStyle } from "./styles"
import { Icons } from "../icons"
import { tuple } from "../../libs/type"
import { ThemeContext } from "../../config"
import PropTypes from "prop-types"

const CHECKBOX_TYPES = tuple("top", "right", "bottom", "left")
export type CHECKBOX_TYPE = typeof CHECKBOX_TYPES[number]

const CHECKBOX_SIZES = tuple("samll", "middle")
export type CHECKBOX_SIZE = typeof CHECKBOX_SIZES[number]

interface CheckBoxProps extends ViewProps {
    /** 表单值 */
    value?: boolean,
    /** 默认值 */
    defaultValue?: boolean,
    /** 发生改变的回调 */
    onChange?: (val: boolean) => void,
    /** 是否禁用 */
    disabled?: boolean,
    /** 选中的颜色 */
    activeColor?: string,
    /** 设置文字方向 */
    placement?: CHECKBOX_TYPE,
    /** @public 风格大小 */
    size?: CHECKBOX_SIZE,
    children?: React.ReactNode,
}

const CheckBox: React.FC<CheckBoxProps> = ({
    value,
    defaultValue,
    onChange,
    disabled,
    activeColor,
    children,
    placement,
    size = 'middle',
    style,
    ...res
}) => {
    const [_value, _setValue] = useState(defaultValue)

    const _check = value !== undefined ? value : _value
    const boxStyle = useMemo(() => getBoxStyle(placement || "right"), [placement])
    const iconSize = useMemo(() => SizeStyle[size], [size])
    const activeIconSize = useMemo(() => iconSize.width - iconSize.borderWidth * 2, [iconSize])

    const _change = () => {
        if (disabled) return

        if (value !== undefined && onChange) {
            onChange(!_check)
            return
        }

        _setValue(!_check)
        if (onChange) onChange(!_check)
    }

    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => {
                    const _disable_style: ViewStyle | undefined = disabled ?
                        { backgroundColor: theme.colors.disabled } :
                        undefined

                    return (
                        <TouchableWithoutFeedback onPress={_change}>
                            <View style={boxStyle}>
                                <View style={[iconSize, styles.icon, _disable_style, style]} {...res} >
                                    {_check && <Icons name="checked" color={activeColor || theme.colors.primary} size={activeIconSize} />}
                                </View>
                                {children}
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
            }
        </ThemeContext.Consumer>
    )
}

function getBoxStyle(placement:CHECKBOX_TYPE) {
    return checkBoxStyle[placement]
}

CheckBox.propTypes = {
    /** 表单值 */
    value: PropTypes.bool,
    /** 默认值 */
    defaultValue: PropTypes.bool,
    /** 发生改变的回调 */
    onChange: PropTypes.func,
    /** 是否禁用 */
    disabled: PropTypes.bool,
    /** 选中的颜色 */
    activeColor: PropTypes.string,
    /** 设置文字方向 */
    placement: PropTypes.oneOf(CHECKBOX_TYPES)
}

CheckBox.defaultProps = {
    placement: "right"
}

export default CheckBox
