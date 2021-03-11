import React from "react"
import { BackHandler,  NativeEventSubscription } from "react-native"
import { PortalEmit } from "../portal/manager"
import Mask from './mask'
import Picker from "react-native-picker"
import DateData from "./date.json"
import TimeData from "./time.json"
import YearData from "./year.json"
import MonthData from "./month.json"
import DateTimeData from "./datetime.json"
import moment from "moment"
import { tuple } from "../../libs/type"

export const PICKERS = tuple("time", "month", "year", "datetime", "date")
export type PICKER_TYPE = typeof PICKERS[number]

interface DateConfig {
    /** @public 返回时间字符串格式 */
    format?: string
    /** @public 标题 */
    pickerTitleText?: string
    /** @public 日期选择类型 */
    picker?: PICKER_TYPE
    /** @public 默认选中值 */
    defaultValue?: Date | string | number
    /** @public 点击遮罩层是否可关闭 */
    maskble?: boolean
    /** @public 确认回调 */
    onPickerConfirm?: (value: string) => void
    /** @public 取消回调  */
    onPickerCancel?: () => void | boolean
    /** @public 选中回调 */
    onPickerSelect?: (value: string) => void
}


interface DefaultListem {
    BackHandlerSub: NativeEventSubscription | null,
    topViewKey: number
}

const defualtListen: DefaultListem = {
    BackHandlerSub: null,
    topViewKey: 0
}

class Manager {
    private format = "YYYY-MM-DD H:m:s"
    private picker: PICKER_TYPE = "date"
    private maskble = true
    private pickerTitleText = "选择日期"
    private pickerConfirmBtnText = "确认"
    private pickerCancelBtnText = "取消"
    private onPickerConfirm: (value: string) => void = () => { }
    private onPickerCancel: () => void | boolean = () => { }
    private onPickerSelect: (value: string) => void = () => { }
    private listen: DefaultListem = defualtListen

    constructor() {
        this.listen = new Proxy(defualtListen, {
            set(target, key, value) {
                if (key === 'BackHandlerSub' && target[key])
                    target[key]?.remove()
                else if (key === 'topViewKey' && target[key])
                    PortalEmit.remove(target[key])

                return Reflect.set(target, key, value)
            }
        })
    }

    /**
     * 打开日期选择器
     */
    show(param: DateConfig = {}) {
        this.hide()

        Object.assign(this, param)
        this._show(param.defaultValue)
    }

    /** 初始化并显示 */
    _show(defaultSelectedValue?: Date | string | number) {
        // 组装基础配置
        const basisConfig = {
            pickerConfirmBtnText: this.pickerConfirmBtnText,
            pickerCancelBtnText: this.pickerCancelBtnText,
            pickerTitleText: this.pickerTitleText,
            pickerBg: [255, 255, 255, 1],
            pickerCancelBtnColor: [136, 136, 136, 1],
            pickerConfirmBtnColor: [30, 30, 30, 1],
            pickerTitleColor: [3, 3, 3, 1]
        }

        // 组装数据源
        let pickerData: any = [] // eslint-disable-line @typescript-eslint/no-explicit-any
        switch (this.picker) {
            case "time":
                pickerData = TimeData
                break
            case "month":
                pickerData = MonthData
                break
            case "year":
                pickerData = YearData
                break
            case "datetime":
                pickerData = DateTimeData
                break
            default:
                pickerData = DateData
                break
        }

        // 组装事件
        const onPickerConfirm = (params: string[]) => {
            const value = this._handleValue(params)
            this.onPickerConfirm(value)
            this.hide()
        }
        const onPickerCancel = () => {
            this.onPickerCancel()
            this.hide()

        }
        const onPickerSelect = (params: string[]) => {
            if (this.picker === "datetime") {

                const targetValue = params.map((e: string) => Number(e.slice(0, -1)))

                if (targetValue[1] === 2) {
                    if (targetValue[0] % 4 === 0 && targetValue[2] > 29)
                        targetValue[2] = 29
                    else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28)
                        targetValue[2] = 28
                }
                else if (targetValue[1] in { 4: 1, 6: 1, 9: 1, 11: 1 } && targetValue[2] > 30)
                    targetValue[2] = 30

                const targetValueToString = [`${targetValue[0]}年`, `${targetValue[1]}月`, `${targetValue[2]}日`, `${targetValue[3]}时`, `${targetValue[4]}分`]

                Picker.select(targetValueToString)
                this.onPickerSelect(this._handleValue(targetValueToString))
                return
            }
            const value = this._handleValue(params)
            this.onPickerSelect(value)
        }

        const selectedValue = this._nowTime(defaultSelectedValue)

        Picker.init({ ...basisConfig, selectedValue, pickerData, onPickerCancel, onPickerConfirm, onPickerSelect })
        // 添加蒙层
        const maskKey = PortalEmit.add(
            <Mask
                onClick={() => {
                    if (this.maskble === false) return
                    this.hide()
                    this.onPickerCancel()
                }}
                onShow={() => this.listen.topViewKey = maskKey}
            />
        )
        Picker.show()
        this.listen.BackHandlerSub = BackHandler.addEventListener("hardwareBackPress", this._handleBack)

    }

    /**
     * 设置选中值
     * @param {*} value  日期字符串或时间戳或日期对象
     */
    setValue(value?: Date | string | number) {
        const newValue = this._nowTime(value)
        Picker.select(newValue)
    }

    /** 返回当前值 */
    _nowTime(defaultValue?: Date | string | number) {
        const timer = defaultValue ? moment(defaultValue) : moment()

        switch (this.picker) {
            case "time":
                return [timer.hour() + "时", timer.minute() + "分", timer.second() + "秒"]
            case "month":
                return [timer.year() + "年", timer.month() + 1 + "月"]
            case "year":
                return [timer.year() + "年"]
            case "datetime":
                return [timer.year() + "年", timer.month() + 1 + "月", timer.date() + "日", timer.hour() + "时", timer.minute() + "分"]
            default:
                return [timer.year() + "年", timer.month() + 1 + "月", timer.date() + "日"]
        }
    }

    /** 关闭日期选择器 */
    hide() {
        Picker.hide()
        this.format = "YYYY-MM-DD H:m:s"
        this.listen.BackHandlerSub = null
        this.listen.topViewKey = 0
        this.picker = "date"
        this.maskble = true
        this.pickerTitleText = "选择日期"
        this.pickerConfirmBtnText = "确认"
        this.pickerCancelBtnText = "取消"
        this.onPickerConfirm = () => { }
        this.onPickerCancel = () => { }
        this.onPickerSelect = () => { }
    }

    /** 处理选中值 */
    _handleValue(value: Array<string>): string {
        if (this.picker === "time") {
            const valueArray = value.map(e => e.slice(0, -1)).join(":")
            return valueArray
        }
        else {
            const valueArray = value.map(e => e.slice(0, -1)).join("-")
            const timer = moment(valueArray, this.format).format(this.format)
            return timer
        }
    }

    /** 处理安卓返回键 */
    _handleBack() {
        this.hide()
        return true
    }
}

const DatePickerManager = new Manager()

export default DatePickerManager
