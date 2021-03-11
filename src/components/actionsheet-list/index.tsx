import React, { useCallback, useEffect } from "react"
import { FlatList, View, TouchableOpacity, Text, Keyboard } from "react-native"
import Actionsheet from "../actionsheet"
import { styles, ItemHeight } from "./styles"
import PropsTypes from "prop-types"
import { setUnit } from "../../libs/utils"
import { Item } from "./item"
import type { ActionsheetProps } from "../actionsheet"
import type { ItemData } from "./utils"
import { tuple } from "../../libs/type"

const LIST_ALIGNS = tuple("center", "left", "right")
export type LIST_ALIGN = typeof LIST_ALIGNS[number]

const LIST_SIZES = tuple("large", "middle")
export type LIST_SIZE = typeof LIST_SIZES[number]

export interface ActionsheetListProps extends ActionsheetProps {
    /** @public 选中值 */
    value?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    /** @param 列表数据 */
    dataSource: readonly ItemData[]
    /** @param 是否显示底部取消按钮 */
    cancelButtonable?: boolean
    /** @param 列表项大小风格 */
    size?: LIST_SIZE
    /** @param 列表项文字方向 */
    align?: LIST_ALIGN
    /** @param 当列表被选择的回调 */
    onSelect?: (...params: [any, ItemData, number]) => void // eslint-disable-line @typescript-eslint/no-explicit-any
}

const ActionsheetList: React.FC<ActionsheetListProps> = ({
    dataSource,
    onSelect,
    cancelButtonable,
    size = "middle",
    align = "left",
    value,
    ...props
}) => {
    const ITEM_HEIGHT = ItemHeight[size].height + styles.item.borderTopWidth

    const _renderItem = ({ item, index }: { item: ItemData; index: number }) => (
        <Item item={item} size={size} align={align} selectValue={value} onSelect={() => onSelect && onSelect(item.value, item, index)} />
    )
    const _keyExtractor = useCallback((item) => String(item.value) + String(item.value), [])

    /** 优化 */
    const _getItemLayout = useCallback((_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }), [ITEM_HEIGHT])

    useEffect(() => {
        if (props.visible) Keyboard.dismiss()
    }, [props.visible])

    return (
        <Actionsheet {...props}>
            <FlatList style={styles.list} data={dataSource} renderItem={_renderItem} keyExtractor={_keyExtractor} getItemLayout={_getItemLayout} />
            {cancelButtonable && (
                <TouchableOpacity onPress={props.onCancel}>
                    <View style={styles.cancelItem}>
                        <Text style={[styles.itemText, { fontSize: setUnit(36), lineHeight: styles.cancelItem.height }]}>取消</Text>
                    </View>
                </TouchableOpacity>
            )}
        </Actionsheet>
    )
}

ActionsheetList.propTypes = {
    /** @public 默认选中值 */
    value: PropsTypes.any,
    /** @param 列表数据 */
    dataSource: PropsTypes.array.isRequired,
    /** @param 当列表被选择的回调 */
    onSelect: PropsTypes.func,
    /** @param 是否显示底部取消按钮 */
    cancelButtonable: PropsTypes.bool,
    /** @param 列表项大小风格 */
    size: PropsTypes.oneOf(LIST_SIZES),
    /** @param 列表项文字方向 */
    align: PropsTypes.oneOf(LIST_ALIGNS)
}

ActionsheetList.defaultProps = {
    dataSource: [],
    onSelect: function () {},
    cancelButtonable: false,
    size: "middle",
    align: "left"
}

export default ActionsheetList
