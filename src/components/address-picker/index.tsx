import React from "react"
import AddressPicker, { AddressPickerProps } from "./view"
import { PortalEmit } from "../portal/manager"

class AddressPickerManagerController {
    private key: number | null = null
    private props: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any

    /** 打开操作版 */
    show(props: AddressPickerProps = {}) {
        this._hide(this.key)
        this.props = props

        // 显示
        const key = PortalEmit.add(<AddressPicker {...this.props} onDestroy={() => this._hide(key)} />)

        this.key = key
    }

    hide() {
        this._hide(this.key)
    }

    _hide(key: number | null) {
        if (key) PortalEmit.remove(key)

        if (this.key === key) this.key = null
    }
}

/** 地址选择管理器 */
const AddressPickerMananger = new AddressPickerManagerController()

export default AddressPickerMananger
