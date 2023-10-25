export const useLocalStorage = (initialKey: string, initialValue?: string) => {
  const setItem = (value: unknown, newKey?: string) => {
    const itemKey = newKey ?? initialKey

    localStorage.setItem(itemKey, JSON.stringify(value))
  }

  const getItem = (key?: string) => {
    const itemKey = key ?? initialKey
    const fromStorage = localStorage.getItem(itemKey)
    if (!fromStorage) {
      return null
    }
    return JSON.parse(fromStorage)
  }

  const getMultipleItems = () => {
    const fromStorageKeys = Object.keys(localStorage).filter((savedKey) =>
      savedKey.startsWith(initialKey),
    )
    const items = fromStorageKeys.map((itemKey) => getItem(itemKey))

    return items
  }

  const remove = () => {
    localStorage.removeItem(initialKey)
  }
  return { getItem, getMultipleItems, setItem, remove }
}
