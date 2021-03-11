import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Button, DatePickerManager, PICKER_TYPE } from "react-native-ds-ui"

const styles = StyleSheet.create({
    button: { marginTop: 10 },
    page: { flex: 1 }
})

const Page: React.FC = () => {
    const [value, setValue] = useState("")
    const _show = (picker: PICKER_TYPE) => {
        DatePickerManager.show({ picker, onPickerConfirm: (val) => setValue(val) })
    }

    return (
        <View style={styles.page}>
            <TextInput />
            <Text>{value}</Text>
            <Button title="打开年份选择器" block={true} style={styles.button} onPress={() => _show("year")} />
            <Button title="打开年月份选择器" block={true} style={styles.button} onPress={() => _show("month")} />
            <Button title="打开年月日选择器" block={true} style={styles.button} onPress={() => _show("date")} />
            <Button title="打开年月日时分秒选择器" block={true} style={styles.button} onPress={() => _show("datetime")} />
            <Button title="打开时分秒选择器" block={true} style={styles.button} onPress={() => _show("time")} />
        </View>
    )
}

export default Page
