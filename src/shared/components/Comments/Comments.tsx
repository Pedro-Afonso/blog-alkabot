import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import styles from './Comments.module.scss'

type TComment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

interface ICommentsProps {
  postId: number | string
}

export const Comments: FC<ICommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<TComment[]>([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(res => res.json())
      .then(setComments)
      // eslint-disable-next-line no-console
      .catch(res => console.log(res))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.comments}>
      {comments.map(comment => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles['comment-header']}>
            <Image
              src={`https://robohash.org/${comment.email}`}
              alt={comment.name}
              height={50}
              width={50}
            />
            <div>
              <h2>{comment.name}</h2>
              <h3>{comment.email}</h3>
            </div>
          </div>
          <div className={styles['comment-body']}>{comment.body}</div>
        </div>
      ))}
    </div>
  )
}
