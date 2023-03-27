import { TComment, TPost } from '../components'
import { api } from './api'

export const getPosts = async (start: number, limit: number) => {
  const params = { _limit: limit, _start: start }
  try {
    const res = await api.get('posts', { params })

    const posts = res.data as TPost[]

    return posts
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return []
  }
}

export const getComments = async (id: number): Promise<TComment[]> => {
  try {
    const res = await api.get(`users/${id}/comments`)

    const comments = res.data as TComment[]

    return comments
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return []
  }
}
