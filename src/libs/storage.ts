import AsyncStorage from "@react-native-community/async-storage"

/** 存储数据 */
const setItem = async (key: string, value: unknown): Promise<Error | boolean> => {
    if (key === undefined || key === null) return new Error("缺少key或value")

    try {
        const data = {
            type: typeof value,
            data: value
        }
        if (data.type !== "string")
            {switch (data.type) {
                case "number":
                    data.data += ""
                    break
                case "undefined":
                    data.data = ""
                    break
                case "boolean":
                    data.data = Number(data.data) + ""
                    break
                default:
                    data.data = JSON.stringify(data.data)
                    break
            }}

        await AsyncStorage.setItem(key, JSON.stringify(data))
        return true
    } catch (error) {
        return error
    }
}

/** 获取数据 */
const getItem = async (key: string): Promise<unknown> => {
    if (key === undefined || key === null) return null
    try {
        const cacheData = await AsyncStorage.getItem(key) || ""
        const data = JSON.parse(cacheData)
        switch (data.type) {
            case "string":
                return data.data
            case "number":
                return Number(data.data)
            case "undefined":
                return undefined
            case "boolean":
                return Boolean(Number(data.data))
            default:
                return JSON.parse(data.data)
        }
    } catch (error) {
        return null
    }
}

export default {
    getItem,
    setItem
}
