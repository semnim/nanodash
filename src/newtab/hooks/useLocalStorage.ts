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

  const getItemKeys = () => {
    return Object.keys(localStorage).filter((savedKey) => savedKey.startsWith(initialKey))
  }

  const getMultipleItems = () => {
    const fromStorageKeys = getItemKeys()
    const items = fromStorageKeys.map((itemKey) => getItem(itemKey))

    return items
  }

  const remove = (key?: string) => {
    const itemKey = key ?? initialKey
    localStorage.removeItem(itemKey)
  }
  return { getItem, getMultipleItems, setItem, remove, getItemKeys }
}
