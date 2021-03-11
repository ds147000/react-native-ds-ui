import React from "react"
import { Animated, View, Text } from "react-native"
import { Icons } from "../icons"
import { styles } from "./styles"
import PropsTypes from "prop-types"
import { ThemeContext } from "../../config"

export interface PlaneProps {
    /** @param 标题内容 */
    title?: string | React.ReactNode
    /** @param 是否直角 */
    block?: boolean
    /** @param 是否显示头部 */
    headabel?: boolean
    /** @param 是否显示右上角取消按钮 */
    closable?: boolean
    /** @param 自定义是否右上角取消按钮 */
    closeExtra?: React.ReactNode
    /** @param 右上角叉的回调	 */
    onCancel?: () => void
    /** @public y轴移动距离 */
    moveY: Animated.Value
    children?: React.ReactNode
}

const Plane: React.SFC<PlaneProps> = (props) => {
    const { moveY, title, block, headabel, closable, closeExtra, children, onCancel } = props
    return (
        <ThemeContext.Consumer>
            {({ theme }) => {
                const planeStyle = getPlaneStyle(block, theme.colors.actionsheetColor)
                const closeIcon = closeExtra ?
                            closeExtra :
                            <Icons name="guanbi_qianse" size={theme.fontSize.large} color="#444444" onPress={onCancel} />


                const titleNode = ["string", "number"].includes(typeof title) ? <Text style={styles.headTitle}>{title}</Text> : title

                return (
                    <Animated.View style={[planeStyle, { transform: [{ translateY: moveY }] }]}>
                        {Boolean(headabel) && (
                            <View style={styles.head}>
                                {titleNode}
                                {Boolean(closable) && closeIcon}
                            </View>
                        )}
                        <View style={styles.content}>{children}</View>
                    </Animated.View>
                )
            }}
        </ThemeContext.Consumer>
    )
}

/**
 * 获取板面样式
 * @param {*} block
 * @param {*} safe
 * @param {*} bottom
 */
function getPlaneStyle(block?: boolean, backgroundColor?: string) {
    const radius = block ? styles.planeBlock : styles.planeRedius

    return [styles.plane, radius, { backgroundColor }]
}

Plane.propTypes = {
    /** @param 标题内容 */
    title: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.element]),
    /** @param 是否直角 */
    block: PropsTypes.bool,
    /** @param 是否显示头部 */
    headabel: PropsTypes.bool,
    /** @param 是否显示右上角取消按钮 */
    closable: PropsTypes.bool,
    /** @param 自定义是否右上角取消按钮 */
    closeExtra: PropsTypes.element,
    /** @param 点击遮罩层或右上角叉的回调	 */
    onCancel: PropsTypes.func,
    /** @public y轴移动距离 */
    moveY: PropsTypes.any
}

Plane.defaultProps = {
    title: "",
    block: false,
    headabel: true,
    closable: true,
    closeExtra: null
}

export default Plane
