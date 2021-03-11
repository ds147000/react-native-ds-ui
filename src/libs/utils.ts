import { Dimensions } from "react-native"

/** 窗口属性 */
export const WINDOWS = Dimensions.get("window")

/** UI图缩放比例 */
const UI_SACEL = WINDOWS.width / 750

/**
 * 设置px单位
 * @param {*} num
 */
export const setUnit = (num: number): number => {
    return num * UI_SACEL
}

/** 获取屏幕高度 */
export const getHeight = (): number => WINDOWS.height


/**
 * 分单位的金额转换成元单位
 * @param  {[type]} fen [description]
 */
export function minuteToDollar(minute: number | string | null): number | string {
    if (minute === null) return "获取中..."
    if (typeof minute !== "number") minute = Number(minute)

    const doller = minute / 100
    if (Number.isNaN(doller))
        return "金额错误"
    else
        return Number(doller.toFixed(2))
}
