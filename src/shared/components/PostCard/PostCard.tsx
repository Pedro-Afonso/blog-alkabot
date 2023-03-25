import Image from 'next/image'
import { FC, useState } from 'react'
import { Comments } from '@/shared/components'

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
  const [showComments, setShowComments] = useState(false)

  const handleShowComments = (e: React.MouseEvent) => {
    e.stopPropagation()
    const noTextSelected = !window.getSelection()?.toString()
    if (noTextSelected) {
      setShowComments(prev => !prev)
    }
  }

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <article onClick={handleShowComments}>
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
        <div className={styles['card-footer']}>
          <button className="btn btn-primary" onClick={handleShowComments}>
            Comentários
          </button>
        </div>
      </article>
      {showComments && <Comments postId={post.id} />}
    </div>
  )
}
