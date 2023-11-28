"use client"
import Link from 'next/link'
import styles from './authLinks.module.css'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const AuthLinks = () => {
  const [mobMenu, setMobMenu] = useState(false)
  const {data, status} = useSession()
  return (
    <>
      {/* auth links in desktop view */}
      {status === 'unauthenticated' ? (
        <Link href='/login' className={styles.link}>Login</Link>
      ) : (
        <>
          <Link href='/write' className={styles.link}>Write</Link>
          <span className={styles.link} onClick={signOut}>Logout</span>
        </>
      )}

      {/* site menu in mobile view */}
      <div className={styles.burger} onClick={ () => setMobMenu(!mobMenu)}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      {
        mobMenu && (
          <div className={styles.mobMenu}>
            <Link href='/'>Home</Link>
            <Link href='/contact'>Contact</Link>
            <Link href='/about'>About</Link>
            
            {status === 'notAuthenticated' ? (
              <Link href='/login'>Login</Link>
            ) : (
              <>
                <Link href='/write'>Write</Link>
                <span>Logout</span>
              </>
            )}
          </div>
        )
      }
    </>
  )
}

export default AuthLinks