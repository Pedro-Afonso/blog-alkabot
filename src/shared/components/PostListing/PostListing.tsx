import { useLoadMore } from '@/shared/hooks'
import { FC, useState } from 'react'
import { PostCard, TPost } from '../PostCard'

import styles from './PostListing.module.scss'

interface IPostListingProps {
  posts: TPost[]
  limit: number
}

export const PostListing: FC<IPostListingProps> = ({
  posts: initialPosts,
  limit
}) => {
  const [posts, setPosts] = useState(initialPosts)

  const { loadMore, canLoadMore } = useLoadMore<TPost>(
    'posts',
    limit,
    initialPosts.length
  )

  const handleLoadMore = async () => {
    const posts = await loadMore()
    if (posts) {
      setPosts(prev => [...prev, ...posts])
    }
  }

  return (
    <section className={styles.posts}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
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
