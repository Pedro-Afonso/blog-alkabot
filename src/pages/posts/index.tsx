import { InferGetStaticPropsType } from 'next'

import { PostListing, TPost } from '@/shared/components'

export default function Posts({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <PostListing posts={posts} />
    </main>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  )
  const posts = (await res.json()) as TPost[]

  return {
    props: { posts }
  }
}
