import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Button, ActionsheetList, ActionsheetListMnanger, ButtonProps } from "react-native-ds-ui"

const styles = StyleSheet.create({
    page: { flex: 1 }
})

interface item {
    value: number
    label: string
}

const Page: React.FC = (): JSX.Element => {
    const [show, setShow] = useState(false)
    const [showCancel, setShowCancel] = useState(false)
    const [showLargeCancel, setShowLargeCancel] = useState(false)
    const [data, setData] = useState<Array<item>>([])
    const [selected, setSelected] = useState("")

    useEffect(() => {
        setData([
            { value: 0, label: "我是0" },
            { value: 1, label: "我是1" },
            { value: 2, label: "我是2" },
            { value: 3, label: "我是3" }
        ])
    }, [])

    const buttonProps: ButtonProps = { block: true, style: { marginTop: 20 }, size: "large" }

    const onSelect = (value: string) => {
        setSelected(value)
        setShow(false)
        setShowCancel(false)
        setShowLargeCancel(false)
        ActionsheetListMnanger.hide()
    }

    const api_show = () => {
        ActionsheetListMnanger.show({ dataSource: data, value: selected, onSelect, title: "api唤醒", onCancel: () => true })
    }

    return (
        <View style={styles.page}>
            <Text>选择了：{selected}</Text>

            <Button {...buttonProps} title="API方式调用" onPress={api_show} />

            <Button {...buttonProps} title="基础操作板面" onPress={() => setShow(true)} />
            <ActionsheetList
                visible={show}
                dataSource={data}
                title="基础操作板面"
                value={selected}
                onSelect={onSelect}
                onCancel={() => setShow(false)}
            />

            <Button {...buttonProps} title="底部取消按钮板面" onPress={() => setShowCancel(true)} />
            <ActionsheetList
                visible={showCancel}
                dataSource={data}
                title="底部取消按钮板面"
                onSelect={onSelect}
                cancelButtonable={true}
                onCancel={() => setShowCancel(false)}
            />

            <Button {...buttonProps} title="大号居中操作板面" onPress={() => setShowLargeCancel(true)} />
            <ActionsheetList
                visible={showLargeCancel}
                dataSource={data}
                title="大号居中操作板面"
                size="large"
                align="center"
                headabel={false}
                onSelect={onSelect}
                cancelButtonable={true}
                onCancel={() => setShowLargeCancel(false)}
            />
        </View>
    )
}

export default Page
