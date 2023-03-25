import { FC, useState } from 'react'
import { PostCard, TPost } from '../PostCard'

import styles from './PostListing.module.scss'

interface IPostListingProps {
  posts: TPost[]
}

export const PostListing: FC<IPostListingProps> = ({ posts: initialPosts }) => {
  const [posts] = useState(initialPosts)
  return (
    <section className={styles.posts}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  )
}
