import { InferGetStaticPropsType } from 'next'

import { UserListing, TUser, AppHead } from '@/shared/components'
import { getUsers } from '@/shared/services/users'

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
  let users: TUser[]

  try {
    users = await getUsers(0, limit)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    users = []
  }

  return {
    props: { users }
  }
}
