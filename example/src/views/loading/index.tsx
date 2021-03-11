import React, { useState } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { Loading, Button, Toast } from "react-native-ds-ui"

const styles = StyleSheet.create({
    button: {
        marginTop: 10
    }
})

const Page: React.FC = () => {
    const [loadingChildren, setLoadingChildren] = useState<boolean>(false)

    const openMaskLoading = () => {
        Toast.loading('', true)
        setTimeout(() => Toast.hideLoading(), 3000)
    }

    return (
        <ScrollView>
            <Button title="loading节点" block={true} onPress={() => setLoadingChildren(!loadingChildren)} />
            <Button title="全屏loading" block={true} style={styles.button} onPress={() => Toast.loading()} />
            <Button title="打开遮罩层loading" block={true} style={styles.button} onPress={openMaskLoading} />
            <Button title="带有标题的loading" block={true} style={styles.button} onPress={() => Toast.loading("加载中...")} />
            <Button title="关闭loading" block={true} style={styles.button} onPress={() => Toast.hideLoading()} />
            {loadingChildren && <Loading size="large" />}
            {loadingChildren && <Loading />}
            {loadingChildren && <Loading size="small" />}
        </ScrollView>
    )
}

export default Page
