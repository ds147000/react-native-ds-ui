import React, { useState } from "react"
import { View } from "react-native"
import { Switch } from "react-native-ds-ui"

const Page: React.FC = () => {
    const [value, setValue] = useState<boolean>(false)
    return (
        <View>
            <Switch checked={value} onChange={(val) => setValue(val)} />
            <Switch checked={!value} onChange={(val) => setValue(!val)} size="large" />
            {/* <Switch disabled={true} size="large" /> */}
        </View>
    )
}

export default Page
