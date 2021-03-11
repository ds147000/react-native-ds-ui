// 路由配置
import React from "react"
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"
import { headerStyle } from "../config"
import Home from "../../views/home"
import Button from "../../views/button"
import Actionsheet from "../../views/actionsheet"
import ActionsheetList from "../../views/actionsheet-list"
import Toast from "../../views/toast"
import Loading from "../../views/loading"
import Tag from "../../views/tag"
import Checkbox from "../../views/checkbox"
import Card from "../../views/card"
import Modal from "../../views/modal"
import DatePicker from "../../views/date-picker"
import Cell from "../../views/cell"
import AddressPicker from "../../views/address-picker"
import Result from "../../views/result"
import Switch from "../../views/switch"

const Stack = createStackNavigator()

const Route = (): JSX.Element => {
    return (
        <Stack.Navigator initialRouteName="Index" screenOptions={{ ...headerStyle } as StackNavigationOptions} mode="card">
            <Stack.Screen name="Index" options={{ title: "首页" }} component={Home} />
            <Stack.Screen name="Button" options={{ title: "按钮组件" }} component={Button} />
            <Stack.Screen name="Actionsheet" options={{ title: "操作板面" }} component={Actionsheet} />
            <Stack.Screen name="ActionsheetList" options={{ title: "操作选择列表" }} component={ActionsheetList} />
            <Stack.Screen name="Toast" options={{ title: "轻提示" }} component={Toast} />
            <Stack.Screen name="Loading" options={{ title: "loading" }} component={Loading} />
            <Stack.Screen name="Tag" options={{ title: "标签" }} component={Tag} />
            <Stack.Screen name="Checkbox" options={{ title: "复选框" }} component={Checkbox} />
            <Stack.Screen name="Result" options={{ title: "结果" }} component={Result} />
            <Stack.Screen name="Card" options={{ title: "卡片" }} component={Card} />
            <Stack.Screen name="Modal" options={{ title: "模态框" }} component={Modal} />
            <Stack.Screen name="datePicker" options={{ title: "日期选择器" }} component={DatePicker} />
            <Stack.Screen name="AddressPicker" options={{ title: "地址选择器" }} component={AddressPicker} />
            <Stack.Screen name="Cell" options={{ title: "单元格" }} component={Cell} />
            <Stack.Screen name="Switch" options={{ title: "开关" }} component={Switch} />
        </Stack.Navigator>
    )
}

export { Route }
