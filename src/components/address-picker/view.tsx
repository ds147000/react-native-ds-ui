import React, { useRef, useEffect, useCallback, memo, useState } from "react"
import { Animated, View, ScrollView, TouchableWithoutFeedback, BackHandler, Text, ActivityIndicator, Keyboard, NativeEventSubscription } from "react-native"
import { getHeight, setUnit } from "../../libs/utils"
import Storage from "../../libs/storage"
import { Icons } from "../icons"
import { Touchable } from "../Touchble"
import Toast from "../toast"
import { styles } from "./styles"
import { findAddr, findAddrVersion, findStreet } from "./api"
import Plane from "../actionsheet/plane"
import PropTypes from "prop-types"
import { ThemeContext } from "../../config"

export interface AddressPickerProps {
    /** @public 标题 */
    title?: string
    /** @public 默认选中值 */
    defaultValue?: Array<string>
    /** @public 点击遮罩层是否可关闭 */
    maskble?: boolean
    /** @public 确认回调, 返回false可以阻止选择器关闭行为 */
    onPickerConfirm?: (value: Array<string>) => boolean | void
    /** @public 取消回调  */
    onPickerCancel?: () => void
    /** @public 选中回调 */
    onPickerSelect?: (value: Array<string>) => void
    onDestroy?: () => void
}

interface AddressItem {
    name: string
    id: string | number
    child?: Array<AddressItem>
}

interface ListProps {
    data: Array<AddressItem>
    selectValue?: string
    onSelect: (item: AddressItem) => void
    loading?: boolean
}

interface HeadItemProps {
    title: string
    onClick?: () => void
    active?: boolean
}

let datasuore: Array<AddressItem> = []
const name = "mb-ui-address-data"
const height: number = getHeight()
const fadeAnimateDuration = 400

/** 获取地址库数据 */
async function getAddressData(): Promise<Array<AddressItem>> {
    const cache = await Storage.getItem(name)
    const cacheVersion = await Storage.getItem(name + "version")
    if (cache && cacheVersion) {
        datasuore = cache as Array<AddressItem>
        findAddrVersion().then((res) => {
            if (res.data !== cacheVersion) fetchAddress()
        })
        return Promise.resolve(cache as Array<AddressItem>)
    }

    return fetchAddress()
}

async function fetchAddress(): Promise<Array<AddressItem>> {
    return findAddr()
        .then((res) => {
            Storage.setItem(name, res.data)
            Storage.setItem(name + "version", res.version)
            datasuore = res.data
            return res.data
        })
        .catch(() => Toast.info("获取地址库数据失败"))
}

if (datasuore.length === 0) getAddressData()

/** 头部选项 */
const HeadItem = memo(({ title, onClick, active }: HeadItemProps) => {
    return (
        <Touchable onPress={() => onClick && onClick()} disabled={active}>
            <View collapsable={false}>
                <Text style={[styles.title, styles.headItem, active ? null : styles.headItemTitle]} numberOfLines={1}>
                    {title}
                </Text>
                {active && (
                    <View style={styles.slider}>
                        <View style={styles.line} />
                    </View>
                )}
            </View>
        </Touchable>
    )
})

/** 地址列表组件 */
const List = ({ data = [], selectValue, onSelect, loading = false }: ListProps) => {
    return (
        <ScrollView style={styles.list}>
            {loading && <ActivityIndicator />}
            {data.map((item) => (
                <Touchable key={item.id} onPress={() => onSelect(item)}>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemTitle}>{item.name}</Text>
                        {selectValue === item.name && <Icons name="gouxuan" size={setUnit(38)} color="#1892FF" style={styles.icon} />}
                    </View>
                </Touchable>
            ))}
            {data.length === 0 && (
                <View>
                    <Text>暂无选项...</Text>
                </View>
            )}
        </ScrollView>
    )
}

const Page: React.FC<AddressPickerProps> = ({ onPickerConfirm, onPickerCancel, onPickerSelect, onDestroy, title, defaultValue, maskble }) => {
    const [value, setValue] = useState(defaultValue || [])
    const [list, setList] = useState<AddressItem[][]>([datasuore, [], []])
    const [street, setStreet] = useState([])
    const [loading, setLoading] = useState(false)
    const opacity: Animated.Value = useRef(new Animated.Value(0)).current
    const moveY: Animated.Value = useRef(new Animated.Value(height)).current
    const subScription: React.MutableRefObject<NativeEventSubscription | null> = useRef(null)
    const AnimatedObject: React.MutableRefObject<Animated.CompositeAnimation | null> = useRef(null)
    const scroll: React.MutableRefObject<ScrollView | null> = useRef(null)

    /** 显示动画 */
    const _showAnimated = () => {
        Keyboard.dismiss()
        AnimatedObject.current = Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            }),
            Animated.timing(moveY, {
                toValue: 0,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            })
        ])
        AnimatedObject.current.start(() => {
            subScription.current = BackHandler.addEventListener("hardwareBackPress", _handleBackButton)
        })
    }

    /** 隐藏动画 */
    const _hideAnimated = useCallback(() => {
        AnimatedObject.current = Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            }),
            Animated.timing(moveY, {
                toValue: height,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            })
        ])
        AnimatedObject.current.start(() => {
            if (subScription.current) subScription.current.remove()
            if (onDestroy) onDestroy()
        })
    }, [onDestroy, subScription])

    // 省市区选中值
    const _select = (item: AddressItem) => {
        const newValue = [...value, item.name]
        setValue(newValue)
        if (onPickerSelect) onPickerSelect(newValue)
    }

    // 街道选中值
    const _selectStreet = (item: AddressItem) => {
        const newValue = [...value, item.name]
        if (onPickerSelect) onPickerSelect(newValue)
        if (onPickerConfirm && onPickerConfirm(newValue) !== false) _hideAnimated()
    }

    // 删除值
    const _removeValue = (key: number) => {
        if (key < 3) setStreet([])
        setValue(value.slice(0, key))
    }

    // 点击取消按钮
    const _onPickerCancel = useCallback(() => {
        if (onPickerCancel) onPickerCancel()
        _hideAnimated()
    }, [onPickerCancel, _hideAnimated])
    // 点击蒙层
    const _clickMask = useCallback(() => {
        if (maskble) _hideAnimated()
    }, [maskble])

    /** 阻止安卓后退事件 */
    const _handleBackButton = () => {
        _hideAnimated()
        return true
    }

    /** 获取街道 */
    const getStreetData = (id: number | string) => {
        setLoading(true)

        const params = value.length === 3 ? "areaId" : value.length === 2 ? "cityId" : "provinceId"
        findStreet(`${params}=${id}`)
            .then((res) => {
                setLoading(false)
                if (res.data.streetList.length === 0) {
                    if (onPickerConfirm && onPickerConfirm(value) !== false) _hideAnimated()
                    return
                }
                setStreet(res.data.streetList)
            })
            .catch(() => {
                Toast.info("获取街道信息失败")
                setLoading(false)
            })
    }

    // 初始化钩子
    useEffect(() => {
        _showAnimated()
        if (datasuore.length === 0) getAddressData().then((res) => setList([res]))

        return () => {
            opacity.stopAnimation()
            moveY.stopAnimation()
            if (AnimatedObject.current) AnimatedObject.current.stop()
            if (subScription.current) subScription.current.remove()
        }
    }, [])

    // 监听value变化
    useEffect(() => {
        if (value.length === 0) setList([datasuore, [], []])
        // 选中值小于3，直接树结构查找
        else if (value.length < 4) {
            const copyList: Array<Array<AddressItem>> = [...list]

            value.map((valueItem, valueKey) => {
                copyList[valueKey].map((listItem) => {
                    if (listItem.name === valueItem) {
                        const child = listItem.child || []
                        // 如果子数组为0，直接进入街道选择页
                        if (child.length === 0) getStreetData(listItem.id)
                        // 如果子数组小于3，进入子树
                        else if (valueKey < 3) copyList[valueKey + 1] = child
                    }
                })
            })
            setList(copyList)
        } else setValue(value.slice(0, -1))
    }, [value])

    // 监听列表变化
    useEffect(() => {
        const x = street.length ? 4 * setUnit(750) : getMoveX(value.length)
        if (scroll.current) scroll.current.scrollTo({ x, animated: true })
    }, [list, street])

    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <View style={styles.box}>
                    <TouchableWithoutFeedback onPress={_clickMask}>
                        <Animated.View style={[styles.box, { backgroundColor: theme.colors.mask, opacity }]} />
                    </TouchableWithoutFeedback>
                    <Plane title={title} moveY={moveY} onCancel={_onPickerCancel}>
                        <View style={styles.head}>
                            {value.map((item, key) => (
                                <HeadItem title={item} key={item} onClick={() => _removeValue(key)} />
                            ))}
                            {value.length < 4 && <HeadItem title="请选择" active={true} />}
                        </View>
                        <ScrollView
                            style={styles.content}
                            ref={scroll}
                            keyboardDismissMode="on-drag"
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {list.map((item, key) => (
                                <List data={item} key={item?.length ? item[0].name : key} selectValue={value[key]} onSelect={_select} />
                            ))}
                            {/* 街道 */}
                            <List
                                data={street}
                                selectValue={value.length ? "" : value[value.length - 1]}
                                onSelect={_selectStreet}
                                loading={loading}
                            />
                        </ScrollView>
                    </Plane>
                </View>
            )}
        </ThemeContext.Consumer>
    )
}

function getMoveX(len: number) {
    return len === 0 ? 0 : len * setUnit(750)
}

Page.propTypes = {
    /** @public 标题 */
    title: PropTypes.string,
    /** @public 默认选中值 */
    defaultValue: PropTypes.array,
    /** @public 点击遮罩层是否可关闭 */
    maskble: PropTypes.bool,
    /** @public 确认回调, 返回false可以阻止选择器关闭行为 */
    onPickerConfirm: PropTypes.func,
    /** @public 取消回调  */
    onPickerCancel: PropTypes.func,
    /** @public 选中回调 */
    onPickerSelect: PropTypes.func
}

Page.defaultProps = {
    title: "选择省/市/区/街道",
    defaultValue: [],
    maskble: true,
    onPickerConfirm: () => { },
    onPickerCancel: () => { },
    onPickerSelect: () => { }
}

export default Page
