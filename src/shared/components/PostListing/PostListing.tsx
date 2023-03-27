import { FC, useState } from 'react'

import { PostCard, TPost } from '@/shared/components'
import { useLoadMore } from '@/shared/hooks'

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

  const { loadMorePosts, canLoadMore } = useLoadMore(limit, initialPosts.length)

  const handleLoadMore = async () => {
    const newPosts = await loadMorePosts()
    if (newPosts) {
      setPosts(prev => [...prev, ...newPosts])
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
