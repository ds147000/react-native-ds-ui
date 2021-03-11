import React from "react"
import { Text, TextStyle } from "react-native"
import { PortalEmit } from "../portal/manager"
import { Container } from "./container"
import { setUnit } from "../../libs/utils"
import { InfoToastList, InfoToastProps } from "./InfoToast"
import { LoadingToast } from "./loadingToast"
import { ThemeContext } from "../../config"
import PropsType from "prop-types"
import { tuple } from "../../libs/type"

const TOAST_TYPES = tuple("success", "error", "warn")
export type TOAST_TYPE = typeof TOAST_TYPES[number]

interface StatusToastConfig {
    /** @public 标题 */
    title: string
    /** @public 停留时间 */
    duration?: number
    /** @public 消失回调 */
    onClose?: () => void
}

interface StatusToastProps extends StatusToastConfig {
    type: TOAST_TYPE
}

const StatusToast = (props: StatusToastProps) => {
    const { title, type, ...res } = props
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => {
                    const style: TextStyle = {
                        fontWeight: "500",
                        fontSize: theme.toast.fontSize,
                        textAlign: "center",
                        color: theme.colors[type],
                        paddingTop: setUnit(30)
                    }
                    return (
                        <Container {...res}>
                            {theme.toast.icon[type]}
                            <Text style={style}>{title}</Text>
                        </Container>
                    )
                }
            }
        </ThemeContext.Consumer>
    )
}

StatusToast.propTypes = {
    type: PropsType.string,
    title: PropsType.string,
    duration: PropsType.number,
    onClose: PropsType.func
}

StatusToast.defaultProps = {
    type: "success"
}


class ToastManager {
    private infoToastList: Array<InfoToastProps & { id: string }> = []
    private infoToastListKey = 0
    private loadingKey: { key: Array<number>, title?: string | null, maskble?: boolean | null } = { key: [], title: null, maskble: null }

    info(config: InfoToastProps | string) {
        if (config === undefined || config === '' || config === null) return
        if (typeof config === "string") config = { title: config }

        this.infoToastList.push({ ...config, id: `${new Date().getTime()}-${Math.random()}` })

        if (this.infoToastListKey === 0)
            this.infoToastListKey = PortalEmit.add(<InfoToastList list={this.infoToastList} onRemove={this.removeToastList.bind(this)} />)
        else
            PortalEmit.update(this.infoToastListKey, <InfoToastList list={this.infoToastList} onRemove={this.removeToastList.bind(this)} />)
    }

    removeToastList(id: string) {
        this.infoToastList = this.infoToastList.filter(e => e.id !== id)

        if (this.infoToastList.length === 0) {
            PortalEmit.remove(this.infoToastListKey)
            this.infoToastListKey = 0
        }
    }

    success({ onClose, ...props }: StatusToastConfig) {
        const key = PortalEmit.add(<StatusToast {...props} type="success" onClose={() => {
            PortalEmit.remove(key)
            if (onClose) onClose()
        }} />)
    }

    warn({ onClose, ...props }: StatusToastConfig) {
        const key = PortalEmit.add(<StatusToast {...props} type="warn" onClose={() => {
            PortalEmit.remove(key)
            if (onClose) onClose()
        }} />)
    }

    error({ onClose, ...props }: StatusToastConfig) {
        const key = PortalEmit.add(<StatusToast {...props} type="error" onClose={() => {
            PortalEmit.remove(key)
            if (onClose) onClose()
        }} />)
    }

    loading(title?: string, maskble?: boolean) {
        if (this.loadingKey.key.length > 0 && this.loadingKey.title === title && this.loadingKey.maskble === maskble) return
        this.hideLoading()

        const key = PortalEmit.add(
            <LoadingToast
                title={title}
                maskble={maskble}
                onShow={() => {
                    this.loadingKey.key.push(key)
                    this.loadingKey.title = title
                    this.loadingKey.maskble = maskble
                }}
            />
        )
    }

    hideLoading() {
        if (this.loadingKey.key.length === 0) return

        this.loadingKey.key.forEach(key => PortalEmit.remove(key))

        this.loadingKey.key = []
        this.loadingKey.title = null
        this.loadingKey.maskble = null
    }
}

const Toast = new ToastManager()


export default Toast
