import React from "react"
import { View } from "react-native"
import { Result, ERROR } from "react-native-ds-ui"

const Page: React.SFC = () => {
    return (
        <View>
            <Result title="开单成功" content="3s后自动返回首页" />
            <Result title="开单失败" content="3s后自动返回首页" type="error" />
            <ERROR />
        </View>
    )
}

export default Page
