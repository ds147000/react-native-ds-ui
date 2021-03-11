import React, { useState } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { Cell, AddressPickerMananger } from "react-native-ds-ui"

const styles = StyleSheet.create({
    page: { flex: 1 }
})

const Page: React.FC = () => {
    const [value, setValue] = useState<Array<string>>(["广东省", "广州市", "天河区"])

    const openAddress = () => {
        AddressPickerMananger.show({
            title: "选择发货地址",
            defaultValue: value,
            onPickerConfirm: (newVal: Array<string>) => setValue(newVal)
        })
    }

    return (
        <View style={styles.page}>
            <TextInput />
            <Cell label="发货地址" placeholder="请选择发货地址" onClick={openAddress} value={value.join("/")} />
        </View>
    )
}

export default Page
