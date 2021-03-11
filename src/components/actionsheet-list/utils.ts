export interface ItemData {
    label: string
    value: unknown
    icon?: string | React.ReactNode
}

export function combItemData(item: ItemData | string): ItemData {
    if (typeof item === "object") {
        if (item.value !== undefined && item.label !== undefined) return item
        item.label = item.value as string
        return item
    }
    return { label: item, value: item }
}
