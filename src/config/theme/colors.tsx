type TextColorFun = (type: string) => string

export interface Colors {
    default?: string
    success?: string
    error?: string
    warn?: string
    primary?: string // 主题色
    textColor?: string | TextColorFun // 按钮标题演示
    divider?: string // 分割线
    disabled?: string // 禁用色
    actionsheetColor?: string // 操作板面背景颜色
    mask?: string // 蒙层颜色
}

const colors = {
    default: "#fff",
    success: "#38C897",
    error: "#F65B52",
    warn: "#F1B12C",
    primary: "#1892FF", // 主题色
    textColor: (type: string): string => type === "default" ? "#333" : "#fff", // 按钮标题演示
    divider: "#eee", // 分割线
    disabled: "#EBEEF5", // 禁用色
    actionsheetColor: "#ffffff", // 操作板面背景颜色
    mask: "rgba(0,0,0,0.6)", // 蒙层颜色
    background: "#fff",
    border: "#F2F2F2",
    placeholder: "rgba(177, 176, 176, 1)",
    text: "#333",
    checkBack: '#F5F6F7'
}

// 操作板面颜色
export const actionsheetList = {
    borderTop: "#f5f5f5",
    borderBotttom: "#f2f2f2",
    ItemBorderTop: "#e5e5e5",
    itemText: "#262626",
    text3: "#333",
    text2: "#666",
    line: "#1892FF",
    itemTitle: "#444444"
}

export const card = {
    contactLabel: "rgba(67, 67, 67, 1)",
    contactText: "rgba(86, 90, 97, 1)",
    contactSingleText: "#565A61",
    contactSingleName: "#262626",
    costLabel: "#727375",
    floatTagBorder: "#EB6A0D",
    floatTagBack: "#FFF6F0",
    floatTitle: "#8C8C8C",
    floatValue: "#FF8833",
    listItemLabel: "#434343",
    shadowColor: "rgb(6, 105, 195)",
    tipsText: "rgba(136, 137, 138, 1)",
    floorContentBack: "#FBFCFC",
    floorborder: "#EEEEEE"
}

export const cell = {
    color: "rgba(10, 10, 10, 1)",
    label: "rgba(38, 38, 38, 1)",
    bottom: "rgba(242, 242, 242, 1)"
}

export const checkbox = {
    nornlBack: "#F5F6F7",
    nornl: "#D7D7D7"
}

export const button = {
    none: "#8C8C8C",
    border: "#e5e5e5",
    shadowColor: "#000"
}

export default colors
