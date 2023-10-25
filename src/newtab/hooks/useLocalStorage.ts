import { useEffect, useState } from 'react'

export const useLocalStorage = (key: string, initialValue?: string) => {
  const setItem = (value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getItem = () => {
    const fromStorage = localStorage.getItem(key)
    if (!fromStorage) {
      return null
    }
    return JSON.parse(fromStorage)
  }

  const remove = () => {
    localStorage.removeItem(key)
  }
  return { getItem, setItem, remove }
}
