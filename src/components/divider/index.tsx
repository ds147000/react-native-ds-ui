import React from "react"
import { View, StyleSheet, ViewProps } from "react-native"
import PropTypes from "prop-types"
import { ThemeContext } from "../../config"

interface DividerProps extends ViewProps {
    height?: number
    color?: string
}

const Divider: React.SFC<DividerProps> = (props) => {
    const { style, height, color, ...rest } = props

    const customStyle: Record<string, unknown> = {}

    if (height !== undefined)
        customStyle.height = height
    if (color !== undefined)
        customStyle.backgroundColor = color

    return (
        <ThemeContext.Consumer>
            {({ theme }) => {
                const dividerStyle = StyleSheet.flatten([
                    styles.container(theme),
                    { ...customStyle },
                    style
                ])

                return <View style={dividerStyle} {...rest} />
            }}
        </ThemeContext.Consumer>
    )
}

Divider.propTypes = {
    height: PropTypes.number,
    color: PropTypes.string
}

const styles = {
    container: (theme: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        backgroundColor: theme.colors.divider,
        height: StyleSheet.hairlineWidth
    })
}

export default Divider
