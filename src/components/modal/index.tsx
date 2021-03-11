import React from "react"
import Modal, { ModalProps } from "./Modal"
import { PortalEmit } from "../portal/manager"

class ModalController {
    private key: Array<number> = []

    alert({ onClose, ...props }: ModalProps) {

        const key = PortalEmit.add(
            <Modal {...props} onClose={() => {
                if (onClose && onClose() === false) return

                PortalEmit.remove(key)
                this.key = this.key.filter(e => e !== key)
            }} />
        )

        this.key.push(key)
    }

    closeAll() {
        this.key.map(e => {
            PortalEmit.remove(e)
        })
    }
}

const ModalManager = new ModalController()


export default ModalManager
