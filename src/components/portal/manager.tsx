import React, { useState, useEffect } from "react"
import { View, NativeEventEmitter, DeviceEventEmitter, StyleSheet } from "react-native"
import { ADD_METCH_TYPE, REMOVE_METCH_TYPE, UPDATE_METCH_TYPE } from "./config"

interface Item {
    key: number,
    children: React.ReactNode
}

const Event = DeviceEventEmitter || new NativeEventEmitter()

const Manager: React.FC = () => {
    const [list, setList] = useState<Array<Item>>([])

    useEffect(() => {
        const _addList = (item: Item) => {
            setList((state: Array<Item>) => [...state, item])
        }

        const _update = ({ key, children }: Item) => {
            setList((state: Array<Item>) => state.map(e => e && e.key === key ? { key, children } : e))
        }

        const _removeList = (key: number) => {
            setList((state: Array<Item>) => state.filter(e => e && e.key !== key))
        }

        // 订阅事件
        const ADD_METCH_TYPE_OF_LISTEN =  Event.addListener(ADD_METCH_TYPE, _addList)
        const REMOVE_METCH_TYPE_OF_LISTEN = Event.addListener(REMOVE_METCH_TYPE, _removeList)
        const UPDATE_METCH_TYPE_OF_LISTEN = Event.addListener(UPDATE_METCH_TYPE, _update)

        return () => {
            ADD_METCH_TYPE_OF_LISTEN.remove()
            REMOVE_METCH_TYPE_OF_LISTEN.remove()
            UPDATE_METCH_TYPE_OF_LISTEN.remove()
        }
    }, [])


    return (
        <>
            {
                list.map((item: Item, itemKey) => (
                    <View collapsable={false} key={item.key} pointerEvents="box-none" style={[StyleSheet.absoluteFill, { zIndex: Number(itemKey) }]}>
                        {item.children}
                    </View>
                ))
            }
        </>
    )

}

class PortalGuard {
    private nextZIndex = 10000

    add(children: React.ReactNode): number {
        const key = this.nextZIndex++
        Event.emit(ADD_METCH_TYPE, { key, children })
        return key
    }

    remove(key: number) {
        Event.emit(REMOVE_METCH_TYPE, key)
    }

    update(key: number, children: React.ReactNode) {
        Event.emit(UPDATE_METCH_TYPE, { key, children })
    }
}

const PortalEmit: PortalGuard = new PortalGuard()

export {
    Manager,
    PortalEmit
}
