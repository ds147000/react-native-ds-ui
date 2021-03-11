import { StyleSheet } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { CardStyleInterpolators } from "@react-navigation/stack"
import { UTILS } from "react-native-ds-ui"
const color = "#6c6c6c"

const headerStyle = {
    headerTitleAlign: "center", // 文字居中
    headerStyle: {
        borderBottomColor: "#eee",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: Colors.white,
        elevation: 0
    }, // 标题栏样式
    headerTintColor: "#262626", // 标题栏字体颜色
    headerTitleStyle: {
        fontSize: UTILS.setUnit(38)
    },
    headerBackTitleVisible: true,

    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 设置左右滑动
    gestureDirection: "horizontal", // 初始化右滑手势配置
    gestureEnabled: true, // 启用右滑返回
    gestureResponseDistance: { horizontal: 20 }
}

const headerRightButton = StyleSheet.create({
    text: {
        color: color,
        fontSize: UTILS.setUnit(29),
        fontWeight: "400",
        paddingRight: UTILS.setUnit(25)
    }
})

export { headerStyle, headerRightButton }
