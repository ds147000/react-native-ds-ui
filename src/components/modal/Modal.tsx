import React, { useRef, useEffect } from "react"
import { Animated, View, Text, KeyboardAvoidingView, BackHandler, Platform, NativeEventSubscription } from "react-native"
import { styles } from "./styles"
import { ThemeContext } from "../../config"
import { ListButton, ButtonItem, CellButton, ButtonList } from './button'
import PropTypes from "prop-types"

export interface ModalProps {
    /** @public 是否可见 */
    visible?: boolean,
    /** @public 弹窗按钮数组 */
    button?: Array<ButtonItem>,
    /** @public 关闭的事件回调 */
    onClose?: () => void | boolean,
    /** @public 弹窗标题 */
    title?: string,
    /** @public 弹窗内容，可以是字符串或组件 */
    content?: string | React.ReactNode,
    /** @public 是否处理返回事件 */
    handleBack?: boolean,
    children?: React.ReactNode,
}


/** 内容 */
const Content = ({ title, content }: ModalProps) => {
    return (
        <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1} >{title}</Text>
            {typeof content === "string" ? <Text style={styles.contentText}>{content}</Text> : content}
        </View>
    )
}

/** 模态框 */
const Modal: React.FC<ModalProps> = ({
    visible,
    button,
    onClose,
    title,
    content,
    children,
    handleBack = true
}) => {
    const opacity: Animated.Value = useRef(new Animated.Value(0)).current
    const scale: Animated.Value = useRef(new Animated.Value(0.3)).current
    const Subscription: React.MutableRefObject<NativeEventSubscription | undefined> = useRef()
    const AnimtedCap: React.MutableRefObject<Animated.CompositeAnimation | undefined> = useRef()

    if (button && button.length === 0) button = [{ text: "确定", style: "cancel" }]

    const _show = () => {
        AnimtedCap.current = Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 250
            }),
            Animated.timing(scale, {
                toValue: 1,
                useNativeDriver: true,
                duration: 200
            })
        ])
        AnimtedCap.current.start()
    }

    const _hide = () => {
        AnimtedCap.current = Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                useNativeDriver: true,
                duration: 160
            }),
            Animated.timing(scale, {
                toValue: 0,
                useNativeDriver: true,
                duration: 200
            })
        ])
        AnimtedCap.current.start(() => onClose && onClose())
    }

    const _handleClose = () => {
        _hide()
        return true
    }

    useEffect(() => {
        if (visible) {
            _show()
            if (handleBack) Subscription.current = BackHandler.addEventListener("hardwareBackPress", _handleClose)
        }
        else if (Subscription.current)
            Subscription.current.remove()

        return () => {
            if (Subscription.current) Subscription.current.remove()
            if (AnimtedCap.current) AnimtedCap.current.stop()
        }
    }, [visible])

    const buttonProps: ButtonList = { list: button, onClick: () => _handleClose() }

    if (visible)
        {return (
            <ThemeContext.Consumer>
                {
                    ({ theme }) => (
                        <Animated.View style={[styles.mask, { backgroundColor: theme.colors.mask, opacity }]} >
                            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                                <Animated.View style={[styles.modal, { transform: [{ scale }] }]}>
                                    <Content title={title} content={content || children} />
                                    {button && button.length < 3 ? <CellButton {...buttonProps} /> : <ListButton {...buttonProps} />}
                                </Animated.View>
                            </KeyboardAvoidingView>
                        </Animated.View>
                    )
                }
            </ThemeContext.Consumer>
        )}
    else
        return null
}

Modal.propTypes = {
    visible: PropTypes.bool,
    button: PropTypes.array,
    onClose: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
}

Modal.defaultProps = {
    visible: true,
    button: [],
    onClose: () => { },
    title: "提示",
    content: ""
}

export default Modal
