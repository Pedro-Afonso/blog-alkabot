import Image from 'next/image'
import { FC } from 'react'

import styles from './PostCard.module.scss'

export type TPost = {
  userId: number
  id: number
  title: string
  body: string
}

interface IPostCardProps {
  post: TPost
}

export const PostCard: FC<IPostCardProps> = ({ post }) => {
  return (
    <div className={styles.container}>
      <article>
        <div className={styles['card-header']}>
          <Image
            src={`https://robohash.org/${post.userId}`}
            alt={post.userId.toString()}
            height={50}
            width={50}
          />
          <div>
            <h2>{post.title}</h2>
            <h3>Autor: {post.userId}</h3>
          </div>
        </div>
        <div className={styles['card-body']}>{post.body}</div>
        <div className={styles['card-footer']}>comentários</div>
      </article>
    </div>
  )
}
