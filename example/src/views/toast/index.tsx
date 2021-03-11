import React from "react"
import { View, StyleSheet } from "react-native"
import { Button, Toast } from "react-native-ds-ui"

const styles = StyleSheet.create({
    button: {
        marginBottom: 5
    },
    page: {
        padding: 20
    }
})

const Page: React.SFC = () => {
    const openSuccess = () => {
        Toast.success({ title: "成功支付" })
    }

    const openError = () => {
        Toast.error({ title: "你失败了..." })
    }

    const openWarn = () => {
        Toast.warn({ title: "加载中..." })
    }

    const openInfo = () => {
        Toast.info({ title: "测试一下..." })
    }

    return (
        <View style={styles.page}>
            <Button type="success" onPress={openSuccess} title="成功提示" style={styles.button} />
            <Button onPress={openWarn} type="warn" title="警告提示" style={styles.button} />
            <Button onPress={openError} type="error" title="失败提示" style={styles.button} />
            <Button type="primary" onPress={openInfo} title="普通提示" style={styles.button} />
        </View>
    )
}

export default Page
