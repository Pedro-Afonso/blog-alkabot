import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getUser, getUsers } from '@/shared/services/users'
import { UserDetails, AppHead } from '@/shared/components'

export default function User({
  user
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!user) return <p>Carregando...</p>

  if (!user.id) return <>Error</>

  return (
    <>
      <AppHead />
      <main>
        <UserDetails user={user} />
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const users = await getUsers(0, 4)
  const paths = users.map(({ id }) => ({ params: { id: id.toString() } }))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const id = typeof params?.id === 'string' ? params?.id : ''

  const user = await getUser(id)

  return {
    props: { user }
  }
}
