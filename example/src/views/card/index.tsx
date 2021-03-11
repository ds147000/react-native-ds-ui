import React from "react"
import { ScrollView, Text, StyleSheet } from "react-native"
import { Card, Button } from "react-native-ds-ui"

const styles = StyleSheet.create({
    buttonView: {
        marginTop: 10
    }
})

const Page: React.FC = () => {
    return (
        <ScrollView>
            <Card head={<Text>基本使用</Text>}>
                <Text>你好</Text>
            </Card>
            <Card head={<Text>关闭选中功能</Text>} checkble={false}>
                <Text>你好</Text>
            </Card>
            <Card head={<Text>取消展开功能</Text>} selectble={false}>
                <Text>你好</Text>
            </Card>
            <Card disable={true} head={<Text>插入底部内容</Text>} floor={<Button title="取消" style={styles.buttonView} />}>
                <Text>具有底部到</Text>
            </Card>
        </ScrollView>
    )
}

export default Page
