import React, { useRef, useEffect } from "react"
import { Animated } from "react-native"
import PropsType from "prop-types"
import { ThemeContext } from "../../config"

interface ContainerProps {
    children: React.ReactNode
    duration?: number
    onClose?: () => void
}

const Container: React.FC<ContainerProps> = ({ children, duration, onClose }) => {
    const opacity: Animated.Value = useRef(new Animated.Value(0)).current

    const _hide = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(onClose)
    }

    useEffect(() => {
        let id: number

        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            id = setTimeout(() => _hide(), duration)
        })

        return () => {
            clearTimeout(id)
            opacity.setValue(0)
        }
    }, [])

    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => (
                    <Animated.View style={[{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.mask }, { opacity }]} >
                        {children}
                    </Animated.View>
                )
            }
        </ThemeContext.Consumer>

    )
}

Container.propTypes = {
    duration: PropsType.number,
    onClose: PropsType.func
}

Container.defaultProps = {
    duration: 1500,
    onClose: () => {}
}


export {
    Container
}
