import React, { useRef, useEffect } from "react"
import { Animated, TouchableWithoutFeedback } from "react-native"
import { ThemeContext } from "../../config"

interface MaskProp {
    onClick: () => void
    onShow: () => void
}

const Mask = ({ onClick, onShow }: MaskProp) => {
    const opacity: Animated.Value = useRef(new Animated.Value(0)).current
    useEffect(() => {
        const animatedStack = Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: true,
            isInteraction: false,
            duration: 250
        })

        animatedStack.start(onShow)

        return () => animatedStack.stop()
    }, [])

    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => (
                    <TouchableWithoutFeedback onPress={onClick}>
                        <Animated.View style={{ flex: 1, opacity, backgroundColor: theme.colors.mask }} />
                    </TouchableWithoutFeedback>
                )
            }
        </ThemeContext.Consumer>
    )
}

export default Mask
