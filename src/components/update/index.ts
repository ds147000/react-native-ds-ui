
import Storage from "../../libs/storage"
import ModalManager from "../modal"
import { Linking, Platform } from "react-native"
import Toast from "../toast"

const checkUpdateTimeName = "checkUpdateTime"
const isNotFirstInstallName = "isNotFirstInstall"

const gotoUpdate = (downUrl: string) => {
    Linking.openURL(downUrl).catch(() => Toast.info({ title: "打开下载地址失败，请重试" }))
}

const Update = async (url: string, versionCode: number): Promise<void> => {
    const notFirst = await Storage.getItem(isNotFirstInstallName)
    if (new Date().getTime() < (await Storage.getItem(checkUpdateTimeName) as number || 0) && notFirst === null) return

    fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res.data === null) return

            const { version_code, down, version, is_update, apple_id } = res.data
            const downUrl = Platform.OS === "android" ? down : "https://itunes.apple.com/cn/app/" + apple_id

            if (version_code > versionCode && is_update)
                {ModalManager.alert({
                    title: "重要提醒",
                    content: `发现新版本${version}，需要更新才能继续使用。请更新后重新进入APP`,
                    button: [{ text: "立即更新", onPress: () => {
                        gotoUpdate(downUrl)
                        return false
                    } }]
                })}

            else if (version_code > versionCode)
                {ModalManager.alert({
                    title: "重要提醒",
                    content: `发现新版本${version}需要更新，是否更新`,
                    button: [
                        { text: "一天后提醒", onPress: () => Storage.setItem(checkUpdateTimeName, new Date().getTime() + 86400000) },
                        { text: "取消" },
                        { text: "立即更新", onPress: () => gotoUpdate(downUrl) }
                    ]
                })}

        })
}

export {
    Update
}
