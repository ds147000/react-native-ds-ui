import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Button, Actionsheet, Toast, ButtonProps } from "react-native-ds-ui"
import { ScrollView } from "react-native-gesture-handler"

const styles = StyleSheet.create({
    input: { borderWidth: 1, height: 40, width: 100 },
    page: { flex: 1 },
    scroll: { height: 300 }
})

const arr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const Page: React.FC = () => {
    const [show, setShow] = useState(false)
    const [blockShow, setBlockShow] = useState(false)
    const [contentShow, setContentShow] = useState(false)
    const [customIconShow, setCustomIconShow] = useState(false)
    const [customCloseExtra, setCustomCloseExtra] = useState(false)
    const [value, setValue] = useState("12345")

    const buttonProps: ButtonProps = { block: true, style: { marginTop: 30 }, size: "large" }

    return (
        <View style={styles.page}>
            <Button {...buttonProps} title="基础操作板面" onPress={() => setShow(true)} />
            <Actionsheet visible={show} title="基础操作板面" onCancel={() => setShow(false)} />

            <Button {...buttonProps} title="直角操作板面" onPress={() => setBlockShow(true)} />
            <Actionsheet visible={blockShow} title="直角操作板面" block={true} onCancel={() => setBlockShow(false)} />

            <Button {...buttonProps} title="定义操作板面内容" onPress={() => setContentShow(true)} />
            <Actionsheet visible={contentShow} title="定义操作板面内容" onCancel={() => setContentShow(false)}>
                <ScrollView style={styles.scroll}>
                    {arr.map((e) => (
                        <View key={e}>
                            <Text>我是{e}行</Text>
                        </View>
                    ))}
                </ScrollView>
            </Actionsheet>

            <Button {...buttonProps} title="隐藏取消按钮" onPress={() => setCustomIconShow(true)} />
            <Actionsheet visible={customIconShow} title="隐藏取消按钮" closable={false} onCancel={() => setCustomIconShow(false)}>
                <ScrollView style={styles.scroll}>
                    {arr.map((e) => (
                        <View key={e}>
                            <Text>我是{e}行</Text>
                        </View>
                    ))}
                </ScrollView>
            </Actionsheet>

            <Button {...buttonProps} title="自定义输入区域" onPress={() => setCustomCloseExtra(true)} />
            <Actionsheet
                visible={customCloseExtra}
                isInput={true}
                title="自定义取消区域"
                closeExtra={<Text onPress={() => setCustomCloseExtra(false)}>取消</Text>}
                onCancel={() => setCustomCloseExtra(false)}
            >
                <View>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={(newVal) => {
                            setValue(newVal)
                            Toast.info(newVal)
                        }}
                    />
                </View>
            </Actionsheet>
        </View>
    )
}

export default Page
