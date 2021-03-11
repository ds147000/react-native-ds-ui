import React from "react"
import type { NavigationContainerRef } from "@react-navigation/native"

export const navigateRef: React.RefObject<NavigationContainerRef> = React.createRef()

/**
 * 直接导航方式，用于无法访问导航道具场景下使用
 * @param {*} name
 * @param {*} params
 */
export const navigate = (name: string, params: Record<string, unknown> | undefined): void => {
   if (navigateRef.current) navigateRef.current.navigate(name, params)
}
