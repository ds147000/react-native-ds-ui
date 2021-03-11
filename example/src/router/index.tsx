// 路由配置
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { Route } from "./route"
import { navigateRef } from "./ref"

/** 路由视图 */
const RouterView: React.FC = (): JSX.Element => {
    return (
        <NavigationContainer ref={navigateRef}>
            <Route />
        </NavigationContainer>
    )
}

export { RouterView }
