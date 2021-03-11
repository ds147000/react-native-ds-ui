import React from "react"
import { View, ViewProps } from "react-native"
import { Manager } from "./manager"

interface PortalHotProps extends ViewProps {
    children: React.ReactNode
}


const PortalHot: React.FC<PortalHotProps> = ({ children, ...props }) => {
    return (
        <View {...props} collapsable={false} style={{ flex: 1 }} >
            {children}
            <Manager />
        </View>
    )
}

export {
    PortalHot
}
