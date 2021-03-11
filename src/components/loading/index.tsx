/* eslint-disable react-native/no-unused-styles */
import React, { useRef, useEffect, useCallback } from "react"
import { Animated, StyleSheet, View, Easing, ViewProps } from "react-native"
import { ThemeContext } from "../../config"
import { setUnit } from "../../libs/utils"
import { tuple } from "../../libs/type"



const LOADING_SIZES = tuple("large", "small", "middle")
export type LOADING_SIZE = typeof LOADING_SIZES[number]

export interface LoadingProps extends ViewProps {
    size?: LOADING_SIZE
}

const animted_time = 600

const styles = StyleSheet.create({
    box: {
        margin: setUnit(20)
    },
    cell: {
        flexDirection: "row",
        flex: 1
    },
    item: {
        flex: 1
    },
    large: {
        height: setUnit(94),
        width: setUnit(94)
    },
    middle: {
        height: setUnit(64),
        width: setUnit(64)
    },
    small: {
        height: setUnit(32),
        width: setUnit(32)
    }
})

const itemStyle = StyleSheet.create({
    large: {
        margin: setUnit(3)
    },
    middle: {
        margin: setUnit(3)
    },
    small: {
        margin: setUnit(1.5)
    }
})

const animtedConfig = { duration: animted_time, useNativeDriver: true, isInteraction: false, easing: Easing.inOut(Easing.circle) }

const Loading: React.FC<LoadingProps> = ({ style, size = "middle", ...res }) => {
    const MOVE: Animated.ValueXY = useRef(new Animated.ValueXY()).current
    const MOVE2: Animated.ValueXY = useRef(new Animated.ValueXY()).current
    const MOVE3: Animated.ValueXY = useRef(new Animated.ValueXY()).current
    const MOVE4: Animated.ValueXY = useRef(new Animated.ValueXY()).current
    const animtedCap: React.MutableRefObject<Animated.CompositeAnimation | undefined> = useRef()
    const moveValue: number = styles[size].width * 0.6

    const satrt_animetd = useCallback(() => {
        return Animated.parallel([
            Animated.timing(MOVE, {
                toValue: moveValue,
                ...animtedConfig
            }),
            Animated.timing(MOVE2, {
                toValue: { x: -moveValue, y: moveValue },
                ...animtedConfig
            }),
            Animated.timing(MOVE3, {
                toValue: { x: moveValue, y: -moveValue },
                ...animtedConfig
            }),
            Animated.timing(MOVE4, {
                toValue: { x: -moveValue, y: -moveValue },
                ...animtedConfig
            })
        ])
    }, [])

    const end_animated = useCallback(() => {
        return Animated.parallel([
            Animated.timing(MOVE, {
                toValue: 0,
                ...animtedConfig
            }),
            Animated.timing(MOVE2, {
                toValue: 0,
                ...animtedConfig
            }),
            Animated.timing(MOVE3, {
                toValue: 0,
                ...animtedConfig
            }),
            Animated.timing(MOVE4, {
                toValue: 0,
                ...animtedConfig
            })
        ])
    }, [])

    const runAnimted = useCallback(() => {
        return Animated.loop(
            Animated.sequence([satrt_animetd(), end_animated()])
        )
    }, [])

    useEffect(() => {
        animtedCap.current = runAnimted()
        animtedCap.current.start()
        return () => {
            if (animtedCap.current) animtedCap.current.stop()
        }
    }, [])

    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => {
                    return (
                        <Animated.View style={[styles[size], styles.box, style, { transform: [{ rotate: "45deg" }] }]} {...res} >
                            <View style={styles.cell} >
                                <Animated.View style={[styles.item, itemStyle[size], { backgroundColor: theme.colors.primary, transform: MOVE.getTranslateTransform() }]} />
                                <Animated.View style={[styles.item, itemStyle[size], { backgroundColor: theme.colors.success, transform: MOVE2.getTranslateTransform() }]} />
                            </View>
                            <View style={styles.cell} >
                                <Animated.View style={[styles.item, itemStyle[size], { backgroundColor: theme.colors.warn, transform: MOVE3.getTranslateTransform() }]} />
                                <Animated.View style={[styles.item, itemStyle[size], { backgroundColor: theme.colors.error, transform: MOVE4.getTranslateTransform() }]} />
                            </View>
                        </Animated.View>
                    )
                }
            }
        </ThemeContext.Consumer>

    )
}

Loading.defaultProps = {
    size: "middle"
}

export default Loading
