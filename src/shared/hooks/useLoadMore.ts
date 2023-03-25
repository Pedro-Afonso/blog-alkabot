import { useState } from 'react'

export const useLoadMore = <T>(
  endpoint: string,
  limit: number,
  start: number
) => {
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = async () => {
    setIsLoading(true)

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}?_start=${start}&_limit=${limit}`
      )
      const data = (await res.json()) as T[]
      return data
      setIsLoading(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return { isLoading, loadMore }
}
