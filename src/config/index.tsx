import React from "react"
import deepmerge from "deepmerge"
import colors, { Colors } from "./theme/colors"
import fontSize, { FontSize } from "./theme/fontSize"
import toast, { Toast } from "./theme/toast"

interface DefaultTheme {
    colors?: Colors,
    fontSize?: FontSize,
    toast?: Toast
}

const defaultTheme = { colors, fontSize, toast }

export interface DefaultValue {
    theme: typeof defaultTheme,
    updateTheme?: (theme: DefaultTheme) => void,
    replaceTheme?: (theme: DefaultTheme) => void,
}

const defaultValue: DefaultValue = {
    theme: defaultTheme,
    updateTheme: () => { },
    replaceTheme: () => { },
}

type State = {
    theme: typeof defaultTheme
}

export const ThemeContext = React.createContext(defaultValue)

export class MbProvider extends React.Component<State, State> {
    static defaultProps: typeof defaultValue
    private defaultTheme = defaultTheme

    constructor(props: State) {
        super(props)
        this.defaultTheme = deepmerge(defaultTheme, props.theme)
        this.updateTheme = this.updateTheme.bind(this)
        this.replaceTheme = this.replaceTheme.bind(this)

        this.state = {
            theme: this.defaultTheme
        }

    }

    updateTheme(updates: DefaultTheme): void {
        this.setState(({ theme }) => ({ theme: deepmerge(theme, updates) }))
    }

    replaceTheme(theme: DefaultTheme): void {
        this.setState(() => ({ theme: deepmerge(this.defaultTheme, theme) }))
    }


    render(): JSX.Element {
        return (
            <ThemeContext.Provider
                value={{
                    theme: this.state.theme,
                    updateTheme: this.updateTheme,
                    replaceTheme: this.replaceTheme
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        )
    }

    static createTheme(theme: DefaultTheme): unknown {
        return theme as typeof defaultTheme
    }

}

MbProvider.defaultProps = {
    theme: defaultTheme
}
