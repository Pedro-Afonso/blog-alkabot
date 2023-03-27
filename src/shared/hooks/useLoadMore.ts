import { useState } from 'react'

import { getPosts } from '../services/posts'
import { getUsers } from '../services/users'

export const useLoadMore = (limit: number, start: number) => {
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [nextPage, setNextPage] = useState(0)

  const loadMorePosts = async () => {
    setIsLoading(true)

    try {
      const skip = start + nextPage * limit
      const posts = await getPosts(skip, limit)
      if (posts?.length < limit) {
        setCanLoadMore(false)
      }
      return posts
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      setCanLoadMore(false)
      return []
    } finally {
      setNextPage(prev => prev + 1)
      setIsLoading(false)
    }
  }

  const loadMoreUsers = async () => {
    setIsLoading(true)

    try {
      const skip = start + nextPage * limit
      const users = await getUsers(skip, limit)
      if (users?.length < limit) {
        setCanLoadMore(false)
      }
      return users
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      setCanLoadMore(false)
      return []
    } finally {
      setNextPage(prev => prev + 1)
      setIsLoading(false)
    }
  }

  return { loadMorePosts, loadMoreUsers, isLoading, canLoadMore }
}
