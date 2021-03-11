import React from 'react'
import { PortalEmit } from '../portal/manager'
import { NetError } from './view'

const data: { id: number | null } = {
    id: null
}

const ProxyData = new Proxy(data, {
    set(target, key, value) {
        const id = Reflect.get(target, key)

        if (key === 'id' && id !== null)
            PortalEmit.remove(id)
        Reflect.set(target, key, value)
        return true
    }
})

export const hide = () => {
    ProxyData.id = null
}

export const open= (refresh: () => void) => {
    if (ProxyData.id === null)
        ProxyData.id = PortalEmit.add(<NetError onRefresh={refresh} onHide={hide} />)
}

export { NetError }
