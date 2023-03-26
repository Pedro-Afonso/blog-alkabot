import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { UserDetails, AppHead, TUser } from '@/shared/components'

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
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4')
  const users = (await res.json()) as TUser[]
  const paths = users.map(({ id }) => ({ params: { id: id.toString() } }))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const id = params?.id ?? ''

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = (await res.json()) as TUser

  return {
    props: { user }
  }
}
