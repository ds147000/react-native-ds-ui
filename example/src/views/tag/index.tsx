import React from "react"
import { View, StyleSheet } from "react-native"
import { Tag } from "react-native-ds-ui"

const styles = StyleSheet.create({
    page: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 }
})

const Page: React.SFC = () => {
    return (
        <View style={styles.page}>
            <Tag text="不需提货" />
            <Tag text="需要提货" type="warn" />
            <Tag text="拒绝签收" type="error" />
            <Tag text="已签收" type="success" />
            <Tag text="自定义" color="rgba(12, 58, 35, 1)" />
        </View>
    )
}

export default Page
