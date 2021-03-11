import React, { useState } from "react"
import { View, Text } from "react-native"
import { CheckBox } from "react-native-ds-ui"

const Page: React.FC = () => {
    const [check, setCheck] = useState<boolean>(false)
    return (
        <View >
            <CheckBox>
                <Text>正常按钮</Text>
            </CheckBox>
            <CheckBox disabled={true} defaultValue={check}>
                <Text>禁用按钮</Text>
            </CheckBox>
            <CheckBox value={check} onChange={(val: boolean) => setCheck(val)}>
                <Text>外部控制</Text>
            </CheckBox>
            <CheckBox placement="bottom">
                <Text>文字在底部</Text>
            </CheckBox>
            <CheckBox placement="top">
                <Text>文字在顶部</Text>
            </CheckBox>
            <CheckBox placement="left">
                <Text>文字在左边</Text>
            </CheckBox>
            <View style={{ flexDirection: 'row' }}>
            <CheckBox size="samll">
                <Text>文字在左边</Text>
            </CheckBox>
            <CheckBox size="samll">
                <Text>文字在左边</Text>
            </CheckBox>
            <CheckBox size="samll">
                <Text>文字在左边</Text>
            </CheckBox>
            </View>
        </View>
    )
}

export default Page
