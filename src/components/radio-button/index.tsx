import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableWithoutFeedback, ViewStyle, TextStyle } from "react-native"
import { basisStyles, sizeStyle, fontSizeStyle, styles, btnOutersizeStyle, iconSizeStyle } from "./style"
import { Icons } from "../icons"
import { tuple } from "../../libs/type"
import { ThemeContext } from "../../config"

const TYPES = tuple("large", "middle", "small")
export type TYPE = typeof TYPES[number]

interface ItemRow {
    label: string,
    index: number,
    selected: boolean,
    rawItem: Item,
}

interface Item {
    label: string,
    value: unknown
}

interface UseRadioButtonHookProps {
    onPressCallback?: (item: unknown, index: number) => void,
    options: Array<Item>,
    value?: unknown
}

const isObject = (value: unknown) => typeof value === "object" && !Array.isArray(value)
const isArry = (value: unknown) => Array.isArray(value)

const useRadioButtonHook = ({ onPressCallback, options, value }: UseRadioButtonHookProps) => {
    const [optionsList, setOptionsList] = useState<Array<ItemRow>>([])
    const [selectedItem, setSelectedItem] = useState<ItemRow>()

    // options格式化
    const optionsFormateFunc = (_options: Array<Item>, selectedValue: unknown): Array<ItemRow> => {
        if (!_options || !isArry(_options) || _options.length < 0) return []

        let hasSelected = false
        const formate_options: Array<ItemRow> = []
        for (let i = 0; i < _options.length; i++) {
            const item: Item = _options[i]
            let label: string
            let selected = false

            if (isObject(item)) {
                if (item.value === selectedValue && !hasSelected) {
                    hasSelected = true
                    selected = true
                }
                label = item.label
            } else {
                if (item === selectedValue && !hasSelected) {
                    hasSelected = true
                    selected = true
                }
                label = String(item)
            }
            const formate_option: ItemRow = {
                label: label,
                index: i,
                selected: selected,
                rawItem: item
            }
            if (selected) setSelectedItem(formate_option)

            formate_options.push(formate_option)
        }
        return formate_options
    }

    const setSelectedRadioFunc = (item: ItemRow) => {
        if (!selectedItem) {
            optionsList.splice(item.index, 1, item)
            setOptionsList(optionsList)
            setSelectedItem(item)
            if (onPressCallback) onPressCallback(item.rawItem, item.index)
        } else if (item.index !== selectedItem.index) {
            selectedItem.selected = false
            optionsList.splice(selectedItem.index, 1, selectedItem)
            optionsList.splice(item.index, 1, item)
            setOptionsList(optionsList)
            setSelectedItem(item)
            if (onPressCallback) onPressCallback(item.rawItem, item.index)
        }
    }

    useEffect(() => {
        const _optionsList = optionsFormateFunc(options, value)
        setOptionsList(_optionsList)
    }, [options, value])

    return {
        optionsList,
        setSelectedRadioFunc
    }
}


// 单选组件
const RadioButton: React.FC<UseRadioButtonHookProps> = ({ onPressCallback, options, value, ...res }) => {
    const { optionsList, setSelectedRadioFunc } = useRadioButtonHook({ onPressCallback, options, value })

    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }}>
            {
                optionsList.map((item) => {
                    return (
                        <Button item={item} {...res} onPress={setSelectedRadioFunc} key={item.label} block={false} />
                    )
                })
            }
        </View>
    )
}

interface ButtonProps {
    onPress?: (params: ItemRow) => void,
    item: ItemRow,
    size?: TYPE,
    block?: boolean,
    buttonStyle?: ViewStyle
}

const Button: React.FC<ButtonProps> = ({ onPress: callback, item, size, block, ...res }) => {
    const { selected } = item
    const btnOuterStyle = geBtnOuterStyle(size, block, res.buttonStyle)
    return (
        <TouchableWithoutFeedback onPress={() => { if (!selected && callback) callback({ ...item, "selected": true }) }} >
            <View style={btnOuterStyle} >
                <Content item={item} size={size} block={block} {...res} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const Content: React.FC<ButtonProps> = ({ item: { label, selected }, size, block, buttonStyle: custom_buttonStyle }) => {
    const iconStyle = getIconStyle(size)
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => {
                    const buttonStyle = getButtonStyle(size, block, selected, theme.colors.primary, theme.colors.text)
                    const titleStyle = getTitleStyle(size, selected, theme.colors.primary, theme.colors.text)
                    return (
                        <>
                            <View style={[buttonStyle, custom_buttonStyle]}>
                                <Text style={titleStyle} numberOfLines={1} >{label}</Text>
                            </View>
                            {selected === true ? <Icons style={iconStyle} name="jiaobiao" color={theme.colors.primary} /> : <></>}
                        </>
                    )
                }
            }
        </ThemeContext.Consumer>
    )
}

/** 获取标题样式 */
function getIconStyle(size: TYPE = "small") {
    const styleArray = [
        {
            fontSize: iconSizeStyle[size]
        },
        styles.commonIcon
    ]
    return StyleSheet.flatten(styleArray)
}
/** 获取标题样式 */
function getTitleStyle(size: TYPE = "small", selected: boolean, activeColor: string, unselectText: string) {
    const styleArray: TextStyle[] = [
        {
            fontSize: fontSizeStyle[size]
        },
        selected ? { color: activeColor } : { color: unselectText}
    ]

    return StyleSheet.flatten(styleArray)
}
/** 获取包裹按钮的样式 */
function geBtnOuterStyle(size: TYPE = "small", block?: boolean, buttonStyle?: ViewStyle) {
    const customStyle: ViewStyle = {}

    if (buttonStyle && buttonStyle.width) customStyle.width = buttonStyle.width
    if (buttonStyle && buttonStyle.height) customStyle.height = buttonStyle.height

    const styleArray = [
        btnOutersizeStyle[size],
        block ? basisStyles.block : undefined,
        customStyle
    ]

    return StyleSheet.flatten(styleArray)
}
/** 获取按钮样式 */
function getButtonStyle(size: TYPE = "small", block?: boolean, selected?: boolean, activeColor?: string, unselectColor?: string) {
    const styleArray = [
        basisStyles.button, // 基础按钮
        sizeStyle[size], // 按钮弧度
        selected ?
            { backgroundColor: "#fff", borderColor: activeColor } :
            { backgroundColor: "#fff", borderColor: unselectColor }, // 按钮颜色
        block ? basisStyles.block : undefined // 宽度占满
    ]
    return StyleSheet.flatten(styleArray)
}


export default RadioButton
