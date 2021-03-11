import React, { useRef, useEffect, useState } from "react"
import { Animated, TouchableWithoutFeedback, KeyboardAvoidingView, View, BackHandler, Platform, StyleProp, ViewProps, NativeEventSubscription } from "react-native"
import { styles } from "./styles"
import { getHeight } from "../../libs/utils"
import { PortalEmit } from "../portal/manager"
import Plane from "./plane"
import PropsTypes from "prop-types"

const height = getHeight()
const fadeAnimateDuration = 400

export interface BesisActionsheetProps {
    /** @param 是否可见 */
    visible?: boolean
    /** @param 标题内容 */
    title?: string | React.ReactNode
    /** @param 是否直角 */
    block?: boolean
    /** @param 是否显示头部 */
    headabel?: boolean
    /** @param 是否显示右上角取消按钮 */
    closable?: boolean
    /** @param 自定义右上角取消按钮 */
    closeExtra?: React.ReactNode
    /** @param 是否存在键盘输入行为，开启会自动处理键盘遮挡事件，注意此属性只能记录第一次值，不可变更 */
    isInput?: boolean
    /** @param 点击蒙层是否允许关闭 */
    maskClosabel?: boolean
    /** @param 遮罩样式 */
    maskStyle?: StyleProp<ViewProps>
    /** @param 点击遮罩层或右上角叉的回调 */
    onCancel?: () => void | boolean
    /** @param 操作板面显示后的回调 */
    onShow?: () => void
    /** @param 销毁后触发事件 */
    onDestory?: () => void
    children?: React.ReactNode
}

type BesisActionsheetState = {
    opacity: Animated.Value
    moveY: Animated.Value
}

class BesisActionsheet extends React.Component<ActionsheetProps, BesisActionsheetState> {
    private subScription: NativeEventSubscription | null = null

    constructor(props: ActionsheetProps) {
        super(props)
        this.state = {
            opacity: new Animated.Value(0),
            moveY: new Animated.Value(height)
        }

        this._clickMask = this._clickMask.bind(this)
        this._destory = this._destory.bind(this)
    }

    _clickMask() {
        if (this.props.maskClosabel && this.props.onCancel) this.props.onCancel()
    }

    _handleBackButton() {
        if (this.props.onCancel) this.props.onCancel()
        return true
    }

    /** 显示动画 */
    _showAnimated() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            }),
            Animated.timing(this.state.moveY, {
                toValue: 0,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            })
        ]).start(() => {
            this.subScription = BackHandler.addEventListener("hardwareBackPress", this._handleBackButton.bind(this))
            if (this.props.onShow) this.props.onShow()
        })
    }

    /** 隐藏动画 */
    _hideAnimated(callback: () => void) {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            }),
            Animated.timing(this.state.moveY, {
                toValue: height,
                useNativeDriver: true,
                duration: fadeAnimateDuration
            })
        ]).start(() => {
            if (callback) callback()
            this._destory()
        })
    }

    /** 销毁 */
    _destory() {
        if (this.subScription) this.subScription.remove()
    }

    /** 组件渲染完成 */
    componentDidMount() {
        this._showAnimated()
    }

    /** 组件卸 */
    componentWillUnmount() {
        this._destory()
    }

    render() {
        if (Platform.OS === "android") {
            return (
                <View style={styles.box} collapsable={false}>
                    <TouchableWithoutFeedback onPress={this._clickMask}>
                        <Animated.View style={[styles.mask, this.props.maskStyle, { opacity: this.state.opacity }]} />
                    </TouchableWithoutFeedback>
                    <Plane {...this.props} moveY={this.state.moveY} />
                </View>
            )
        } else {
            return (
                <View style={styles.box} collapsable={false}>
                    <TouchableWithoutFeedback onPress={this._clickMask}>
                        <Animated.View style={[styles.mask, this.props.maskStyle, { opacity: this.state.opacity }]} />
                    </TouchableWithoutFeedback>
                    <KeyboardAvoidingView
                        behavior="position"
                        contentContainerStyle={styles.flex}
                        enabled={this.props.isInput}
                        keyboardVerticalOffset={64}
                    >
                        <Plane {...this.props} moveY={this.state.moveY} />
                    </KeyboardAvoidingView>
                </View>
            )
        }
    }
}

export interface ActionsheetProps extends BesisActionsheetProps {
    onDestory?: () => void
}

const Actionsheet: React.FC<ActionsheetProps> = ({ isInput, visible, onDestory, ...res }) => {
    const [show, setShow] = useState(visible)
    const portalID: React.MutableRefObject<number> = useRef(0)
    const sheet: React.MutableRefObject<any> = useRef(null) // eslint-disable-line @typescript-eslint/no-explicit-any

    const _onDestory = () => {
        if (portalID.current) PortalEmit.remove(portalID.current)
        if (onDestory) onDestory()
        portalID.current = 0
        sheet.current = null
    }

    useEffect(() => {
        if (isInput && visible === false && sheet.current) sheet.current._hideAnimated(() => setShow(false))
        else setShow(visible)
    }, [visible, isInput])

    useEffect(() => {
        if (isInput) return

        if (show && portalID.current === 0 && sheet.current === null) portalID.current = PortalEmit.add(<BesisActionsheet ref={sheet} {...res} />)
        else if (show === false && portalID.current !== null && sheet.current !== null) sheet.current._hideAnimated(_onDestory)
    }, [show, isInput])

    useEffect(() => {
        if (!isInput && portalID.current) PortalEmit.update(portalID.current, <BesisActionsheet ref={sheet} {...res} />)
    }, [onDestory, res])

    useEffect(() => {
        return () => {
            if (!isInput && portalID.current) PortalEmit.remove(portalID.current)
        }
    }, [])

    if (isInput && show) return <BesisActionsheet ref={sheet} isInput={isInput} {...res} />
    else return null
}

Actionsheet.propTypes = {
    /** @param 是否可见 */
    visible: PropsTypes.bool,
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
    /** @param 是否存在键盘输入行为，开启会自动处理键盘遮挡事件 */
    isInput: PropsTypes.bool,
    /** @param 点击蒙层是否允许关闭 */
    maskClosabel: PropsTypes.bool,
    /** @param 遮罩样式 */
    maskStyle: PropsTypes.object,
    /** @param 点击遮罩层或右上角叉的回调	 */
    onCancel: PropsTypes.func,
    /** @param 显示后的回调 */
    onShow: PropsTypes.func
}

Actionsheet.defaultProps = {
    visible: false,
    title: "",
    block: false,
    headabel: true,
    closable: true,
    closeExtra: null,
    isInput: false,
    maskClosabel: true,
    maskStyle: null,
    onCancel: function () {}
}

export default Actionsheet
