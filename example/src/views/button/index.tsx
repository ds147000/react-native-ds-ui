import React from "react"
import { View, Text, Alert, ScrollView } from "react-native"
import { styles } from "./styles"
import { Button, Icons } from "react-native-ds-ui"
import { SafeAreaView } from "react-native-safe-area-context"

const Page: React.FC = () => {
    return (
        <SafeAreaView style={styles.page} edges={["bottom"]}>
            <ScrollView style={styles.page}>
                <Text style={styles.title}>基本用法</Text>
                <View style={styles.row}>
                    <Button title="primary" type="primary" style={styles.button} />
                    <Button title="default" type="default" style={styles.button} />
                    <Button title="success" type="success" style={styles.button} />
                    <Button title="warn" type="warn" style={styles.button} />
                    <Button title="error" type="error" style={styles.button} />
                </View>
                <Text style={styles.title}>幽灵按钮 ghost</Text>
                <View style={styles.row}>
                    <Button title="primary" type="primary" style={styles.button} ghost={true} />
                    <Button title="default" type="default" style={styles.button} ghost={true} />
                    <Button title="success" type="success" style={styles.button} ghost={true} />
                    <Button title="warn" type="warn" style={styles.button} ghost={true} />
                    <Button title="error" type="error" style={styles.button} ghost={true} />
                </View>

                <Text style={styles.title}>体积Size</Text>
                <View style={styles.row}>
                    <Button title="samll" size="small" style={styles.button} />
                    <Button title="middle" size="middle" style={styles.button} />
                    <Button title="large" size="large" style={styles.button} />
                </View>

                <Text style={styles.title}>铺满</Text>
                <Button title="middle" size="large" block={true} />

                <Text style={styles.title}>loading</Text>
                <View style={styles.row}>
                    <Button title="primary" type="primary" style={styles.button} loading={true} />
                    <Button title="default" type="default" style={styles.button} loading={true} />
                    <Button title="success" type="success" style={styles.button} loading={true} />
                    <Button title="middle" size="large" style={styles.button} loading={true} />
                    <Button title="error" type="error" size="large" style={styles.button} loading={true} />
                </View>

                <Text style={styles.title}>禁用和启用点击</Text>
                <View style={styles.row}>
                    <Button title="可点击的" type="primary" style={styles.button} onPress={() => Alert.alert("点击了primary...")} />
                    <Button title="可点击的" type="default" style={styles.button} onPress={() => Alert.alert("点击了default...")} />
                    <Button title="禁用的" type="primary" style={styles.button} disabled={true} onPress={() => Alert.alert("点击了primary...")} />
                    <Button title="禁用的" type="default" style={styles.button} disabled={true} onPress={() => Alert.alert("点击了default...")} />
                </View>

                <Text style={styles.title}>使用图标</Text>
                <View style={styles.row}>
                    <Button title="可点击的" type="primary" style={styles.button} icon={<Icons name="tianjia" />} />
                    <Button title="可点击的" type="default" style={styles.button} icon={<Icons name="wangdianluyou2" />} />
                    <Button title="success" type="success" style={styles.button} icon={<Icons name="quanping" />} />
                </View>

                <Text style={styles.title}>自定义内容</Text>
                <View style={styles.row}>
                    <Button>
                        <Text>123456</Text>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Page
