import React from "react"
import { PortalEmit } from "../portal/manager"
import ActionsheetList, { ActionsheetListProps } from "./index"

class ActionsheetListMnangerController {
    private key = 0
    private props: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any

    show({ onCancel, ...props }: ActionsheetListProps) {
        // 初始化配置
        this.hide()
        const _visible = true

        // 弹出
        const key = PortalEmit.add(
            <ActionsheetList
                {...props}
                visible={_visible}
                onCancel={() => {
                    if (onCancel && onCancel() !== false) this.update(key, false, props)
                    else this.update(key, false, props)
                }}
                onDestory={() => PortalEmit.remove(key)}
            />
        )

        this.key = key
        this.props = props
    }

    update(key: number, visible: boolean, props: ActionsheetListProps) {
        PortalEmit.update(key, <ActionsheetList {...props} visible={visible} onDestory={() => PortalEmit.remove(key)} />)
    }

    /** 隐藏操作板面 */
    hide() {
        const key = this.key
        const props = this.props
        if (key === 0) return
        this.update(key, false, props)

        this.key = 0
        this.props = {}
    }
}

const ActionsheetListMnanger = new ActionsheetListMnangerController()

export default ActionsheetListMnanger
