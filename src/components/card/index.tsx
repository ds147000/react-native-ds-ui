import React, { useState, memo, useCallback } from "react"
import { View, Text, LayoutAnimation, ViewProps, ViewStyle } from "react-native"
import { Touchable } from "../Touchble"
import CheckBox from "../checkbox"
import { Icons } from "../icons"
import { styles } from "./styles"
import { setUnit } from "../../libs/utils"
import PropTypes from "prop-types"

export interface CardProps extends ViewProps {
    /** @public 是否启用展开收起功能 */
    selectble?: boolean,
    /** @public 默认是否展开 */
    defaultSelect?: boolean,
    /** @public 是否开启复选框 */
    checkble?: boolean,
    /** @public 是否禁用复选框 */
    disable?: boolean
    /** @public 头部内容 */
    head?: React.ReactNode,
    /** @public 卡片中间内容 */
    content?: React.ReactNode,
    /** @public 底部内容 */
    floor?: React.ReactNode,
    /** @public 初始化选中值 */
    defaultCheck?: boolean,
    /** @public 选中值 */
    check?: boolean,
    /** @public 是否开启动画 */
    Animated?: boolean,
    /** @public 自定义内容高度 */
    cHeight?: number,
    /** 选中修改改变值 */
    onChange?: (value: boolean) => void,
    /** 卡片内容被点击事件 */
    onClick?: () => void,
    children?: React.ReactNode
}

interface MoreButtonProps {
    onClick?: () => void,
    select?: boolean
}

const MoreButton = memo((props: MoreButtonProps) => {
    const { onClick, select } = props
    return (
        <Touchable onPress={onClick}>
            <View style={styles.moreButton} >
                <Text style={styles.moreText}>{select ? "收起信息" : "查看更多"}</Text>
                <Icons name={select ? "shouqi" : "xiala"} color="rgba(136, 137, 138, 1)" size={setUnit(24)} />
            </View>
        </Touchable>
    )
})

const Card: React.FC<CardProps> = (prosp) => {
    const {
        selectble,
        defaultSelect,
        head,
        floor,
        content,
        children,
        defaultCheck,
        checkble,
        check,
        onChange,
        onClick,
        Animated,
        disable,
        cHeight
    } = prosp
    const [select, setSelect] = useState(defaultSelect)

    const _animted = useCallback(() => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(250, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY)
        )
    }, [])

    const openMore = useCallback(BOOL => {
        if (Animated) _animted()
        setSelect(BOOL)
    }, [Animated])

    const contentStyle = getContentStyle(select, selectble, cHeight)

    return (
        <View style={styles.card}>
            <View style={styles.head}>
                <View style={styles.title}>
                    {checkble && <CheckBox
                        defaultValue={defaultCheck}
                        value={check}
                        onChange={onChange}
                        disabled={disable}
                                />
                    }
                    {head}
                </View>
                {selectble && <MoreButton select={select} onClick={() => openMore(!select)} />}
            </View>

            <Touchable onPress={onClick}>
                <View style={contentStyle} >
                    {content}{children}
                </View>
            </Touchable>

            {Boolean(floor) && <View style={styles.floor} >{floor}</View>}
        </View>
    )
}

function getContentStyle(select?: boolean, selectble?: boolean, height?: number): ViewStyle[] {
    let content = {}
    if (!selectble)
        content = styles.maxContent
    else if (selectble && select)
        content = styles.maxContent
    else if (selectble && !select)
        content = height ? { height } : styles.minContent

    return [{ overflow: "hidden" }, content]
}

Card.propTypes = {
    /** 是否启用展开收起功能 */
    selectble: PropTypes.bool,
    /** 是否默认展开 */
    defaultSelect: PropTypes.bool,
    /** 是否开启复选框 */
    checkble: PropTypes.bool,
    /** 标题 */
    head: PropTypes.element,
    /** 卡片中间内容 */
    content: PropTypes.element,
    /** 底部内容 */
    floor: PropTypes.element,
    /** 初始化选中值 */
    defaultCheck: PropTypes.bool,
    /** 选中值 */
    check: PropTypes.bool,
    /** 选中修改改变值 */
    onChange: PropTypes.func,
    /** 卡片内容被点击事件 */
    onClick: PropTypes.func,
    /** 是否开启动画 */
    Animated: PropTypes.bool,
    /** 自定义内容高度 */
    cHeight: PropTypes.number
}

Card.defaultProps = {
    selectble: true,
    defaultSelect: false,
    checkble: true,
    onClick: function () { },
    /** 是否开启动画 */
    Animated: true
}


export default Card
