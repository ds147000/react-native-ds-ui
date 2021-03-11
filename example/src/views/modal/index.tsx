import React, { useState } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { Button, Modal, ModalManager } from "react-native-ds-ui"
const borderColor = "#000000"

const styles = StyleSheet.create({
    button: { marginTop: 10 },
    input: { borderColor, borderWidth: 1, height: 40, marginTop: 150, width: 100 },
    page: {
        flex: 1
    }
})

const Page: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)

    const alert = () => {
        ModalManager.alert({ title: "提示", content: "您好呀", onClose: () => true })
    }

    const confim = () => {
        ModalManager.alert({
            title: "警告",
            content: "是否删除",
            button: [{ text: "取消", style: "none" }, { text: "确定" }]
        })
    }

    const more = () => {
        ModalManager.alert({ title: "提示", content: "请选择购买类型", button: [{ text: "5个" }, { text: "10个" }, { text: "15个" }] })
    }

    const all = () => {
        more()
        confim()
        alert()
    }

    return (
        <View style={styles.page}>
            <Button style={styles.button} block={true} title="提示" onPress={alert} />
            <Button style={styles.button} block={true} title="两个按钮" onPress={confim} />
            <Button style={styles.button} block={true} title="多个按钮" onPress={more} />
            <Button style={styles.button} block={true} title="同步出现多个弹窗" onPress={all} />
            <Button style={styles.button} block={true} title="自定义弹窗内容" onPress={() => setShow(true)} />
            <Modal visible={show} onClose={() => setShow(false)}>
                <TextInput style={styles.input} />
            </Modal>
        </View>
    )
}

export default Page
