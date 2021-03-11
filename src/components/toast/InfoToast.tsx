import React, { useRef, useEffect } from "react"
import { StyleSheet, Animated, Text } from "react-native"
import { setUnit } from "../../libs/utils"
import PropsType from "prop-types"
import { ThemeContext } from "../../config"


export interface InfoToastProps {
    /** @public 标题 */
    title?: string | React.ReactNode
    /** @public 图标 */
    icon?: React.ReactNode
    /** @public 停留时间 */
    duration?: number
    /** @public 关闭回调 */
    onClose?: () => void
    onRemove?: () => void
}

export interface InfoToastListProps {
    /** @public toast数组 */
    list: Array<InfoToastProps & { id: string }>
    onRemove?: (id: string) => void
}

const style = StyleSheet.create({
    box: {
        alignItems: "center",
        flex: 1,
        position: "relative",
        top: "50%"
    },
    content: {
        alignItems: "center",
        borderRadius: setUnit(4),
        flexDirection: "row",
        height: setUnit(60),
        justifyContent: "center",
        marginTop: setUnit(20),
        maxWidth: setUnit(450),
        paddingLeft: setUnit(25),
        paddingRight: setUnit(25)
    },
    title: {
        fontSize: setUnit(24)
    }
})


const InfoToast: React.FC<InfoToastProps> = ({ title, icon, duration, onClose, onRemove }) => {
    const opacity: Animated.Value = useRef(new Animated.Value(0)).current
    const _hideAnimated = () => {

        Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
            isInteraction: false
        }).start(() => {
            if (onClose) onClose()
            if (onRemove) onRemove()
        })
    }

    useEffect(() => {
        let id: number

        Animated.timing(opacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
            isInteraction: false
        }).start(() => {
            id = setTimeout(_hideAnimated, duration)
        })

        return () => {
            clearTimeout(id)
            opacity.setValue(0)
        }
    }, [])


    return (
        <ThemeContext.Consumer>
        {
            ({ theme }) => (
                <Animated.View style={[style.content, { opacity, backgroundColor: theme.toast.infoBackground }]}>
                    {icon}
                    <Text numberOfLines={1} style={[{ color: theme.toast.color }, style.title]}>{title}</Text>
                </Animated.View>
            )
        }
        </ThemeContext.Consumer>
    )
}

InfoToast.propTypes = {
    /** @public 标题 */
    title: PropsType.oneOfType([PropsType.string, PropsType.element]).isRequired,
    /** @public 图标 */
    icon: PropsType.element,
    /** @public 停留时间 */
    duration: PropsType.number,
    /** @public 关闭回调 */
    onClose: PropsType.func,
    /** @public 移除触发 */
    onRemove: PropsType.func
}

InfoToast.defaultProps = {
    duration: 3000
}

const INFO_TOAST_HEIGHT = style.content.height + style.content.marginTop

const InfoToastList: React.FC<InfoToastListProps> = ({ list = [], onRemove }) => {
    const translateY: Animated.Value = useRef(new Animated.Value(0)).current
    const animtedCap: React.MutableRefObject<Animated.CompositeAnimation | undefined> = useRef()

    const move = () => {
        if (animtedCap.current) animtedCap.current.stop()
        const moveY = -list.length * INFO_TOAST_HEIGHT

        animtedCap.current = Animated.timing(translateY, {
            toValue: moveY,
            duration: 250,
            useNativeDriver: true,
            isInteraction: false
        })
        animtedCap.current.start()
    }

    useEffect(() => {
        return () => {
            if (animtedCap.current) animtedCap.current.stop()
            translateY.setValue(0)
        }
    }, [])

    useEffect(() => {
        move()
    }, [list.length])

    return (
        <Animated.View style={[style.box, { transform: [{ translateY }] }]} pointerEvents="none" >
            {list.map(e => <InfoToast {...e} onRemove={() => onRemove && onRemove(e.id)} key={e.id} />)}
        </Animated.View>
    )
}

export {
    InfoToastList
}
