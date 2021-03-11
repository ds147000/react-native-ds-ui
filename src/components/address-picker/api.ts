/* eslint-disable @typescript-eslint/no-explicit-any */

const defaultUrl = process.env.NODE_ENV === "development" ? "https://gateway-test.b2bwings.com" : "https://gateway.b2bwings.com"

/** 获取地址库 */
export const findAddr = async (): Promise<any> => {
    return (await fetch(`${defaultUrl}/tms/open/addr/findAddr`)).json()
}

/** 获取地址库最新版本 */
export const findAddrVersion = async (): Promise<any> => {
    return (await fetch(`${defaultUrl}/tms/open/addr/findVersion`)).json()
}

export const findStreet = async (params: string): Promise<any> => {
    return (await fetch(`${defaultUrl}/tms/open/addr?${params}`)).json()
}
