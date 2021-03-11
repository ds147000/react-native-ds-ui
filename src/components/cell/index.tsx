import React, { memo, ReactNode, useMemo } from "react"
import { View, Text, TextInput, StyleProp, ViewProps, ViewStyle, StyleSheet } from "react-native"
import { Icons } from "../icons"
import { Touchable } from "../Touchble"
import { styles } from "./style"
import PropTypes from "prop-types"
import { setUnit } from "../../libs/utils"
import { tuple } from "../../libs/type"
import { ThemeContext } from "../../config"

const LAYOUTS = tuple("row", "column")
export type LAYOUT = typeof LAYOUTS[number]

export interface CellProps {
    /** @public 标签文本或标签区域内容 */
    label?: string | React.ReactNode
    /** @public 自定义标签区域样式 */
    labelStyle?: StyleProp<ViewProps>
    /** @public 值 */
    value?: string
    /** @public 值为空时候显示的文本 */
    placeholder?: string
    /** @public 是否禁用状态，默认为 false */
    disabled?: boolean
    /** @public 自定义图标名称 */
    icon?: string
    /** @public 有右侧区域的内容 */
    suffix?: React.ReactNode
    /** @public 是否可输入，开启输入会失去点击事件触发，默认false */
    editable?: boolean
    /** @public 是否显示图标 */
    iconable?: boolean
    /** 输入内容发生变化回调 */
    onChange?: (text: string) => void
    /** 点击事件回调 */
    onClick?: () => void
    /** @public 自定义内容区域 */
    content?: React.ReactNode
    /** @public 是否显示顶部边框，默认false */
    topBorder?: boolean
    /** @public 是否显示底部边框，默认true */
    bottomBorder?: boolean
    /** @public 布局风格，默认row */
    layout?: LAYOUT
    /** @public 是否开启点击事件，默认true */
    clickable?: boolean
    children?: React.ReactNode
}


function getCellStyle(layout?: string, bottom?: boolean) {
    return [
        styles.cell,
        layout === "column" ? styles.clounsCell : null,
        bottom === false ? { borderBottomWidth: 0 } : null
    ]
}


function getSlotStyle(top?: boolean, bottom?: boolean, column?: boolean) {
    if (column)
        return styles.slotClouns
    else {
        return [
            styles.slot,
            top ? styles.slotTopBorder : null,
            bottom ? styles.slotBottomBorder : null
        ]
    }
}

const Content = memo(({ value, placeholder }: CellProps) => {
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => {
                    return (
                        <View style={styles.content}>
                            { value !== null && value !== "" ?
                                <Text style={styles.value} numberOfLines={1} >{value}</Text> :
                                <Text numberOfLines={1} style={[styles.placeholder, { color: theme.colors.placeholder }]}>{placeholder}</Text>}
                        </View>
                    )
                }
            }
        </ThemeContext.Consumer>

    )
})

const InputContent = (props: CellProps) => {
    const { disabled, onChange, ...res } = props
    return (
        <TextInput style={styles.inputContent} onChangeText={onChange} editable={!disabled} {...res} />
    )
}

const Cell: React.FC<CellProps> = (props) => {
    const {
        label,
        labelStyle,
        value,
        placeholder,
        disabled,
        icon,
        iconable,
        suffix,
        editable,
        onChange,
        onClick,
        content,
        topBorder,
        bottomBorder,
        children,
        layout,
        clickable,
        ...res
    } = props

    const disableStyle: ViewStyle | undefined = useMemo(() => disabled ? { opacity: 0.5 } : undefined, [disabled])

    // 标签
    const memoLabelStyle = useMemo(() => (
        StyleSheet.flatten([styles.label, labelStyle, layout === 'row' ? undefined : { width: "100%" }, disableStyle])
    ), [labelStyle, layout, disableStyle])

    const labelElement: string | ReactNode = typeof label === "string" ?
        <Text style={memoLabelStyle}>{label}</Text> :
        label

    // 内容
    const contentProps: CellProps = { value, placeholder, disabled, onChange }

    const contentElement: string | ReactNode = children || content || (editable ?
        <InputContent {...contentProps} {...res} /> :
        <Content {...contentProps} />
    )

    // 图标
    const iconElement = iconable && editable === false ? <Icons name={String(icon)} size={setUnit(40)} color="#727375" /> : null

    let cell: React.ReactNode
    if (layout === "row") {
        cell = (
            <View style={getSlotStyle(topBorder, bottomBorder)}>
                {labelElement}
                <View style={[styles.page, disableStyle]}>{contentElement}</View>
                {iconElement}
                {suffix}
            </View>
        )
    }
    else {
        cell = (
            <View style={getSlotStyle(topBorder, bottomBorder, true)}>
                <View style={styles.clounsLabel}>
                    {labelElement}
                </View>
                <View style={styles.clounsContent}>
                    <View style={[styles.page, disableStyle]}>{contentElement}</View>
                    {iconElement}
                    {suffix}
                </View>
            </View>
        )
    }

    const memoStyles = useMemo(() => getCellStyle(layout, bottomBorder), [layout, bottomBorder])

    if (editable || !clickable)
        return <View style={memoStyles}>{cell}</View>
    else {
        return (
            <Touchable onPress={onClick} disabled={disabled} >
                <View style={memoStyles}>{cell}</View>
            </Touchable>
        )
    }
}

Cell.propTypes = {
    /** @public 标签文本或标签区域内容 */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /** @public 自定义标签区域样式 */
    labelStyle: PropTypes.object,
    /** @public 值 */
    value: PropTypes.any,
    /** @public 值为空时候显示的文本 */
    placeholder: PropTypes.string,
    /** @public 是否禁用状态，默认为 false */
    disabled: PropTypes.bool,
    /** @public 自定义图标名称 */
    icon: PropTypes.string,
    /** @public 有右侧区域的内容 */
    suffix: PropTypes.element,
    /** @public 是否可输入，开启输入会失去点击事件触发，默认false */
    editable: PropTypes.bool,
    /** @public 是否显示图标 */
    iconable: PropTypes.bool,
    /** 输入内容发生变化回调 */
    onChange: PropTypes.func,
    /** 点击事件回调 */
    onClick: PropTypes.func,
    /** @public 自定义内容区域 */
    content: PropTypes.element,
    /** @public 是否显示顶部边框，默认false */
    topBorder: PropTypes.bool,
    /** @public 是否显示底部边框，默认true */
    bottomBorder: PropTypes.bool,
    /** @public 布局风格，默认row */
    layout: PropTypes.oneOf(LAYOUTS),
    /** @public 是否开启点击事件，默认true */
    clickable: PropTypes.bool
}

Cell.defaultProps = {
    label: "",
    disabled: false,
    editable: false,
    iconable: true,
    topBorder: false,
    bottomBorder: true,
    icon: "you",
    onClick: () => { },
    onChange: () => { },
    layout: "row",
    clickable: true
}

export default Cell
