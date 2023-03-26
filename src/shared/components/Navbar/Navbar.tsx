import styles from './Navbar.module.scss'
import cls from 'classnames'
import { useState } from 'react'
import { Navlinks } from './components/Navlinks'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Alkabot</h1>

      <nav className={cls(styles.menu, { [styles.menu__open]: isMenuOpen })}>
        <Navlinks />
      </nav>

      <button
        className={cls(styles['btn-nav'], {
          [styles['btn-nav__open']]: isMenuOpen
        })}
        onClick={handleToggleMenu}
      ></button>
    </header>
  )
}
