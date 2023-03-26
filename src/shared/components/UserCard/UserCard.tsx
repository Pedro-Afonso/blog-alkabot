import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import styles from './UserCard.module.scss'
import { FC } from 'react'

export type TUser = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface IUserCardProps {
  user: TUser
}

export const UserCard: FC<IUserCardProps> = ({ user }) => {
  const { push } = useRouter()

  const { address, email, id, name, username } = user

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation()
    const noTextSelected = !window.getSelection()?.toString()
    if (noTextSelected) {
      push(`/users/${id}`)
    }
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */}
      <div className={styles.card} onClick={handleNavigate}>
        <Image
          title={name}
          src={`https://robohash.org/${id}`}
          alt={name}
          height={64}
          width={64}
        />
        <h2>
          {name} ({username})
        </h2>
        <address className="h3">{email}</address>
        <address className={styles.address}>
          Rua {address.street} {address.suite}
          <br />
          <span className="h4">
            {address.city} - {address.zipcode}
          </span>
        </address>
        <Link href={`/users/${id}`} className="btn btn-primary">
          Ver Mais
        </Link>
      </div>
    </>
  )
}
