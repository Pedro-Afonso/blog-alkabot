import { InferGetStaticPropsType } from 'next'

import { PostListing, TPost, AppHead } from '@/shared/components'

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
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
  )
  const posts = (await res.json()) as TPost[]

  return {
    props: { posts }
  }
}
