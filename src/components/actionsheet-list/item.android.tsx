import React from "react"
import { TouchableNativeFeedback, View, Text, TextStyle, StyleSheet } from "react-native"
import { styles, ItemHeight } from "./styles"
import { combItemData, ItemData } from "./utils"
import { ThemeContext } from "../../config"
import { setUnit } from "../../libs/utils"
import { tuple } from "../../libs/type"
import { Icons } from "../icons"

const ITEM_SIZES = tuple("large", "middle")
export type ITEM_SIEZ = typeof ITEM_SIZES[number]

const ITEM_ALIGNS = tuple("auto", "left", "right", "center", "justify")
export type ITEM_ALIGN = typeof ITEM_ALIGNS[number]

export interface ItemProps {
    item: ItemData
    onSelect: () => void
    selectValue: any // eslint-disable-line @typescript-eslint/no-explicit-any
    align?: ITEM_ALIGN
    size: ITEM_SIEZ
}

const Item: React.FC<ItemProps> = ({ item, onSelect, selectValue, align, size }) => {
    const newItem = combItemData(item)

    let icon: React.ReactNode = null
    if (typeof item.icon === "string") icon = <Icons name={item.icon} size={setUnit(38)} color="#444444" />
    else if (item.icon) icon = item.icon

    return (
        <ThemeContext.Consumer>
            {({ theme }) => {
                const style: TextStyle = StyleSheet.flatten([{ fontSize: theme.fontSize[size], textAlign: align }, ItemHeight[size]])
                return (
                    <TouchableNativeFeedback onPress={onSelect}>
                        <View style={styles.item}>
                            {icon}
                            <Text style={style} numberOfLines={1}>
                                {newItem.label}
                            </Text>
                            {selectValue === newItem.value && <Icons name="gouxuan" size={setUnit(38)} color="#1892FF" />}
                        </View>
                    </TouchableNativeFeedback>
                )
            }}
        </ThemeContext.Consumer>
    )
}

export { Item }
