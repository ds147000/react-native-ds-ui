import { StyleSheet } from 'react-native'
import colors from '../../config/theme/colors'
import { setUnit } from '../../libs/utils'

export const styles = StyleSheet.create({
    icon: {
        height: setUnit(434),
        width: setUnit(604)
    },
    page: {
        alignItems: 'center',
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center'
    },
    tips: {
        color: colors.disabled,
        fontSize: setUnit(32),
        paddingBottom: setUnit(54),
        paddingTop: setUnit(14)
    },
    title: {
        color: colors.text,
        fontSize: setUnit(44),
        paddingTop: setUnit(38)
    }
})
