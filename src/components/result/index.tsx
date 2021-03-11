import React, { memo } from "react"
import { View, Text } from "react-native"
import { Icons } from "../icons"
import { tuple } from "../../libs/type"
import PropTypes from "prop-types"
import { styles } from "./styles"
import { setUnit } from "../../libs/utils"
import { ThemeContext } from "../../config"

const RESULT_TYPES = tuple("success", "error")
export type RESULT_TYPE = typeof RESULT_TYPES[number]

interface ResultProps {
    /** @public 类型风格，可选 success, error */
    type?: RESULT_TYPE
    /** @public 标题 */
    title?: string
    /** @public 内容 */
    content?: string
}

const TYPE_NAMES = {
    "success": "chenggong",
    "error": "jinggao"
}

const SUCCESS = memo(() => {
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => (<Icons name={TYPE_NAMES.success} size={setUnit(160)} color={theme.colors.success} />)
            }
        </ThemeContext.Consumer>
    )
})

const ERROR = memo(() => {
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => (<Icons name={TYPE_NAMES.error} size={setUnit(160)} color={theme.colors.error} />)
            }
        </ThemeContext.Consumer>
    )
})

const Result: React.FC<ResultProps> = ({ type, title, content }) => {
    return (
        <ThemeContext.Consumer>
            {
                ({ theme }) => (
                    <View style={styles.box}>
                        {type === "success" ? <SUCCESS /> : <ERROR />}
                        { title !== undefined && <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>}
                        { content !== undefined && <Text style={styles.content}>{content}</Text>}
                    </View>
                )
            }
        </ThemeContext.Consumer>

    )
}


Result.propTypes = {
    type: PropTypes.oneOf(["success", "error"]),
    title: PropTypes.string,
    content: PropTypes.string
}

Result.defaultProps = {
    type: "success"
}

export default Result
export { SUCCESS, ERROR }
