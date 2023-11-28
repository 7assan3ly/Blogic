import Image from 'next/image'
import styles from './navbar.module.css'
import Logo from '../Logo/Logo'
import Link from 'next/link'
import AuthLinks from '../authLinks/AuthLinks'
import ThemeToggle from '../themeToggle/ThemeToggle'

const Navbar = () => {
  return (
    <div className={styles.container}>
      {/* Social Icons */}
      <div className={styles.social}>
        <Image
          src='/facebook.png'
          alt='Blogic Facebook'
          width={16}
          height={16}
        />
        <Image
          src='/instagram.png'
          alt='Blogic Instagram'
          width={16}
          height={16}
        />
        <Image
          src='/tiktok.png'
          alt='Blogic Tiktok'
          width={16}
          height={16}
        />
        <Image
          src='/youtube.png'
          alt='Blogic Youtube'
          width={16}
          height={16}
        />
      </div>

      {/* Blogic Logo */}
      <div className={styles.logo}>
        <Logo width={100} height={44}/>
      </div>

      {/* Links */}
      <div className={styles.links}>
        <ThemeToggle/>
        <Link href='/' className={styles.link}>Home</Link>
        <Link href='/' className={styles.link}>Contact</Link>
        <Link href='/' className={styles.link}>About</Link>
        <AuthLinks/>
      </div>
    </div>
  )
}

export default Navbar