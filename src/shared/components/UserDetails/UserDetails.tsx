import { FC } from 'react'

import { TUser } from '@/shared/components'
import Image from 'next/image'

import styles from './UserDetails.module.scss'
import Link from 'next/link'

interface IUserDetailsProps {
  user: TUser
}

export const UserDetails: FC<IUserDetailsProps> = ({ user }) => {
  const { address, email, id, name, username, company, phone, website } = user

  return (
    <section className={styles.section}>
      <div className={styles.user}>
        <Image
          title={name}
          src={`https://robohash.org/${id}?size=160x160`}
          alt={name}
          height={160}
          width={160}
        />
        <div className={styles.info}>
          <p className="h1">
            <span>Nome: </span>
            {name}
          </p>
          <p>
            <span>Apelido: </span>
            {username}
          </p>

          <p className="h3">
            <span>Email: </span>
            {email}
          </p>
          <p>
            <span>Endereço: </span>Rua {address.street} {address.suite}
          </p>
          <p>
            <span>Cidade: </span>
            {address.city}
          </p>
          <p>
            <span>Zipcode: </span>
            {address.zipcode}
          </p>
        </div>
        <div className={styles.company}>
          <p>
            <span>Empresa: </span>
            {company.name}
          </p>
          <p>
            <span>Bordão: </span>
            {company.catchPhrase}
          </p>
          <p>
            <span>Seguimento: </span>
            {company.bs}
          </p>
          <p>
            <span>Telefone: </span>
            {phone}
          </p>
          <p>
            <span>Website: </span>
            {website}
          </p>
        </div>
        <div className={styles.footer}>
          <Link href="/users" className="btn btn-primary">
            Voltar
          </Link>
        </div>
      </div>
    </section>
  )
}
