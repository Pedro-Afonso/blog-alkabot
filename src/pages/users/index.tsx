import { InferGetStaticPropsType } from 'next'

import { UserListing, TUser, AppHead } from '@/shared/components'

const limit = 4

export default function Users({
  users
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AppHead />
      <main>
        <UserListing users={users} limit={limit} />
      </main>
    </>
  )
}
export async function getStaticProps() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  )
  const users = (await res.json()) as TUser[]

  return {
    props: { users }
  }
}
