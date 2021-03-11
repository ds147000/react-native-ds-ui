import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { Cell, Icons, Loading } from "react-native-ds-ui"

const styles = StyleSheet.create({
    page: { flex: 1 }
})

const Page: React.FC = () => {
    return (
        <ScrollView style={styles.page}>
            <Cell label="运单号" placeholder="请选择运单号" icon="sousuochanggui" />
            <Cell label="地址" value="自定义图标" icon="dingwei-ditu" />
            <Cell label="运单号" placeholder="请选择运单号" value="被禁用的" disabled={true} />
            <Cell label="隐藏按钮" placeholder="请选择运单号" iconable={false} />
            <Cell label="名字" placeholder="可输入的" value="" editable={true} />
            <Cell label="自定义内容" placeholder="请输入名称">
                <Loading />
            </Cell>
            <Cell label={<Icons name="dingwei-ditu" />} placeholder="请输入名称" value="自定义label" />

            <Cell label="运单号运单号运单号运单号运单号" placeholder="请选择运单号" editable={true} layout="column" />
        </ScrollView>
    )
}

export default Page
