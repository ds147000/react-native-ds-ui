import React, { useCallback, useState } from 'react'
import { View, Image, Text, Modal } from 'react-native'
import Button from '../button'
import { styles } from './styles'
import NetInfo from '@react-native-community/netinfo'

interface NetErrorProp {
    onHide: () => void
    onRefresh: () => void
}

const NetError: React.FC<NetErrorProp> = ({ onHide, onRefresh }) => {
    const [loading, setLoading] = useState(false)

    const refresh = () => {
        setLoading(true)
        NetInfo.fetch()
            .then(res => {
                if (res.isConnected !== false) {
                    onRefresh()
                    onHide()
                } else {
                    setTimeout(() => setLoading(false), 1500)
                }
            })
            .catch(() => {
                setTimeout(() => setLoading(false), 1500)
            })
    }

    const onRequestClose = useCallback(() => {}, [])

    return (
        <Modal
            presentationStyle="fullScreen"
            visible={true}
            hardwareAccelerated={true}
            animationType="slide"
            onRequestClose={onRequestClose}
        >
            <View style={styles.page} >
                <Image style={styles.icon} source={require('../../assets/images/net-error.png')} />
                <Text style={styles.title}>网络竟然奔溃了</Text>
                <Text style={styles.tips}>别紧张，试试看刷新页面或检测网络设置</Text>
                <Button title="刷新" ghost={true} type="default" loading={loading} onPress={refresh} />
            </View>
        </Modal>
    )
}

export { NetError }
