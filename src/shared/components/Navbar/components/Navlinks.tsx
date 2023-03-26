import Link from 'next/link'
import cls from 'classnames'
import styles from './Navlinks.module.scss'
import { useRouter } from 'next/router'

type TLinks = { [key: string]: { title: string; href: string[] } }

const LINKS: TLinks = {
  '/posts': { title: 'Postagens', href: ['/posts', '/'] },
  '/users': { title: 'Usuários', href: ['/users'] }
}

export const Navlinks = () => {
  const { route } = useRouter()
  const activePath = (href: string) => LINKS[href].href.includes(route)
  return (
    <ul className={styles.links}>
      {Object.values(LINKS).map(link => (
        <li key={link.href[0]}>
          <Link
            className={cls('btn ', {
              [styles.active]: activePath(link.href[0])
            })}
            href={link.href[0]}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
