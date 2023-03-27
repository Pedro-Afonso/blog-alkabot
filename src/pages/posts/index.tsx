import { InferGetStaticPropsType } from 'next'

import { PostListing, AppHead, TPost } from '@/shared/components'
import { getPosts } from '@/shared/services/posts'

const limit = 9

export default function Posts({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AppHead />
      <main>
        <PostListing posts={posts} limit={limit} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  let posts: TPost[]

  try {
    posts = await getPosts(0, limit)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    posts = []
  }

  return {
    props: { posts }
  }
}
