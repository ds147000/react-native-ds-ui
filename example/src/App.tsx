/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react"
import { StatusBar, Platform } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { RouterView } from "./router"
import { PortalHot } from "react-native-ds-ui"

const App = (): JSX.Element => {
    return (
        <>
            {Platform.OS === "ios" && <StatusBar translucent={true} backgroundColor="rgba(255,255,255,0)" barStyle="dark-content" />}
            <SafeAreaProvider>
                <PortalHot>
                    <RouterView />
                </PortalHot>
            </SafeAreaProvider>
        </>
    )
}

export default App
