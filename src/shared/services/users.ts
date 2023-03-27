import { TUser } from '../components'
import { api } from './api'

export const getUsers = async (
  start: number,
  limit: number
): Promise<TUser[]> => {
  const params = { _limit: limit, _start: start }
  try {
    const res = await api.get('users', { params })

    const users = res.data as TUser[]

    return users
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return []
  }
}

export const getUser = async (id: number | string): Promise<TUser | null> => {
  if (!id) return null
  try {
    const res = await api.get(`users/${id}`)

    const users = res.data as TUser

    return users
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return null
  }
}
