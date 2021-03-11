import React, { useCallback, useState, useRef, forwardRef } from "react"
import { FlatList, View, ActivityIndicator, RefreshControl, FlatListProps as ListProps } from "react-native"
import Empty from "../empty"
import { styles } from "./styles"

interface Info {
    distanceFromEnd: number
}

export interface CFlatListProps extends ListProps<any> {  // eslint-disable-line @typescript-eslint/no-explicit-any
    /** @public 上拉刷新方法，需返回Promise */
    onRefresh: () => Promise<unknown>,
    /** @public 下来加载方法，需返回Promise */
    onEndReached: (info: Info) => Promise<unknown>,
    /** @public 数据源总数,当数据源大于或等于数据源总数后不会触发下来加载方法 */
    total: number,
    /** @public 数据源 */
    data: Array<unknown>
}


/** 底部加载组件 */
const FooterComponent = ({ show }: { show: boolean }) => {
    return (
        <View style={styles.floor}>
            <ActivityIndicator size="small" animating={show} />
        </View>
    )
}

/** 列表组件 */
const CFlatList: React.ForwardRefRenderFunction<FlatList<unknown>, CFlatListProps> = (props, ref) => {
    const { data, total, onEndReached, onRefresh, ...res } = props
    const [_loading, _setLoading] = useState(false)
    const [_refreshStatus, _setRefreshStatus] = useState(false)
    const timeCap: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef()


    /** 内部下拉刷新方法 */
    const _onRefresh = useCallback(() => {
        async function run() {
            _setRefreshStatus(true)
            await onRefresh()
            _setRefreshStatus(false)
        }
        run()
    }, [onRefresh])

    /** 内部上拉加载方法 */
    const _onEndReached = useCallback((info: Info) => {
        if (total === 0 || data.length >= total) {
            _setLoading(() => false)
            if (timeCap.current) clearTimeout(timeCap.current)
            return
        }

        async function run() {
            timeCap.current = setTimeout(() => _setLoading(true), 25)
            _setLoading(true)

            await onEndReached(info)
            _setLoading(() => false)
            clearTimeout(timeCap.current)
        }
        run()
    }, [onEndReached])

    return (
        <FlatList
            data={data}
            ListEmptyComponent={<Empty style={{ paddingTop: "40%" }} />}
            ListFooterComponent={<FooterComponent show={_loading} />}
            removeClippedSubviews={true}
            refreshControl={<RefreshControl refreshing={_refreshStatus} onRefresh={_onRefresh} />}
            onEndReachedThreshold={0.2}
            onEndReached={_onEndReached}
            initialNumToRender={5}
            ref={ref}
            {...res}
        />
    )
}

const OutFlatList = forwardRef(CFlatList)

export default OutFlatList
