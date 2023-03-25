import { useState } from 'react'

export const useLoadMore = <T>(
  endpoint: string,
  limit: number,
  start: number
) => {
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [nextPage, setNextPage] = useState(0)

  const loadMore = async () => {
    setIsLoading(true)

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}?_start=${
          start + nextPage * limit
        }&_limit=${limit}`
      )
      const data = (await res.json()) as T[]
      if (data?.length < limit) {
        setCanLoadMore(false)
      }
      return data
    } catch (error) {
      setCanLoadMore(false)
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      setNextPage(prev => prev + 1)
      setIsLoading(false)
    }
  }

  return { loadMore, isLoading, canLoadMore }
}
