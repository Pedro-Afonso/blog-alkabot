import { FC, useState } from 'react'

import { UserCard, TUser } from '@/shared/components'
import { useLoadMore } from '@/shared/hooks'

import styles from './UserListing.module.scss'

interface IUserListingProps {
  users: TUser[]
  limit: number
}

export const UserListing: FC<IUserListingProps> = ({
  users: initialUsers,
  limit
}) => {
  const [users, setUsers] = useState(initialUsers)

  const { loadMore, canLoadMore } = useLoadMore<TUser>(
    'users',
    limit,
    initialUsers.length
  )

  const handleLoadMore = async () => {
    const newUsers = await loadMore()
    if (newUsers) {
      setUsers(prev => [...prev, ...newUsers])
    }
  }

  return (
    <section className={styles.users}>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}

      {canLoadMore && (
        <div className={styles.loadMore}>
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Carregar Mais
          </button>
        </div>
      )}
    </section>
  )
}
