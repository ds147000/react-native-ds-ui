import React from "react"
import { ScrollView, Text } from "react-native"
import { styles } from "./styles"
import { name as appName } from "../../../app.json"
import { Cell } from "react-native-ds-ui"
import type { NavigationContainerRef } from "@react-navigation/native"

const Page: React.FC<{ navigation: NavigationContainerRef }> = ({ navigation }) => {
    const go = (url: string): void => navigation.navigate(url)

    return (
        <ScrollView style={styles.page}>
            <Text style={styles.title}>{appName}</Text>
            <Cell label="按钮组件 Button" onClick={() => go("Button")} />
            <Cell label="操作板面 Actionsheet" onClick={() => go("Actionsheet")} />
            <Cell label="操作选择列表 ActionsheetList" onClick={() => go("ActionsheetList")} />
            <Cell label="轻提示 toast" onClick={() => go("Toast")} />
            <Cell label="加载中 Loading" onClick={() => go("Loading")} />
            <Cell label="标签 Tag" onClick={() => go("Tag")} />
            <Cell label="复选框 Checkbox" onClick={() => go("Checkbox")} />
            <Cell label="卡片 Card" onClick={() => go("Card")} />
            <Cell label="运单卡片 WaybillCard" onClick={() => go("WaybillCard")} />
            <Cell label="发车卡片 CarCard" onClick={() => go("CarCard")} />
            <Cell label="送货卡片 DeliveryCard" onClick={() => go("DeliveryCard")} />
            <Cell label="运单列表 WaybillList" onClick={() => go("WaybillList")} />
            <Cell label="发车列表 CarList" onClick={() => go("CarList")} />
            <Cell label="到车列表 EndCarList" onClick={() => go("EndCarList")} />
            <Cell label="送货列表 DeliveryList" onClick={() => go("DeliveryList")} />
            <Cell label="模态框 Modal" onClick={() => go("Modal")} />
            <Cell label="日期选择器 datePicker" onClick={() => go("datePicker")} />
            <Cell label="地址选择器 AddressPicker" onClick={() => go("AddressPicker")} />
            <Cell label="单元格 Cell" onClick={() => go("Cell")} />
            <Cell label="结果 Result" onClick={() => go("Result")} />
            <Cell label="开关 Switch" onClick={() => go("Switch")} />
        </ScrollView>
    )
}

export default Page
