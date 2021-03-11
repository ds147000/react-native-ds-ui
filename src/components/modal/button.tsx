import React, { memo } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { setUnit } from "../../libs/utils"
import { styles, ButtonTextStyle } from "./styles"
import { ThemeContext } from "../../config"
import { tuple } from "../../libs/type"

const BUTTON_STYLES = tuple("cancel", "ok", "none")
export type BUTTON_STYLE = typeof BUTTON_STYLES[number]

export interface ButtonItem {
    /** 按钮文档 */
    text: string,
    style?: BUTTON_STYLE,
    /** @public 按钮点击事件 */
    onPress?: () => void | boolean
}

export interface ButtonList {
    list?: Array<ButtonItem>,
    onClick: () => void
}


const Button = ({ text, style = "ok", onPress }: ButtonItem) => {
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => (
                    <TouchableHighlight
                        style={[
                            styles.button,
                            {
                                borderRightColor: theme.colors.border,
                                borderTopColor: theme.colors.border
                            }]}
                        onPress={onPress}
                        underlayColor="rgba(0,0,0,0.3)"
                    >
                        <Text style={[{ color: theme.colors.primary }, ButtonTextStyle[style]]}>{text}</Text>
                    </TouchableHighlight>
                )
            }
        </ThemeContext.Consumer>
    )
}

/** 竖向按钮列表 */
const ListButton = memo(({ list = [], onClick }: ButtonList) => {
    return (
        <View style={[styles.listButton, { height: list.length * setUnit(96) }]}>
            {list.map(e => (<Button key={e.text} text={e.text} style={e.style} onPress={() => {
                if (e.onPress && e.onPress() === false) return
                onClick()
            }} />))}
        </View>
    )
})

/** 横向型按钮列表 */
const CellButton = memo(({ list = [], onClick }: ButtonList) => {
    return (
        <View style={styles.CellButton}>
            {list.map(e => (<Button key={e.text} text={e.text} style={e.style} onPress={() => {
                if (e.onPress && e.onPress() === false) return
                onClick()
            }} />))}
        </View>
    )
})

export {
    CellButton,
    ListButton
}
