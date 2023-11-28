"use client";
import Image from 'next/image'
import styles from './themeToggle.module.css'
import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const ThemeToggle = () => {
  const {mode, toggle} = useContext(ThemeContext)
  return (
    <div 
      className={styles.container} 
      onClick={toggle}
      style={
        mode === 'dark' ? { backgroundColor: '#fff' } : { backgroundColor: '#0f172a'}
      }
    >
      <Image src='/moon.png' alt='Theme Toggle' width={14} height={14} />
      <div 
        className={styles.ball}
        style={
          mode === 'dark' ? { left: 1, backgroundColor: '#0f172a' } : {right: 1, backgroundColor: '#fff'}
        }
      />
      <Image src='/sun.png' alt='Theme Toggle' width={14} height={14} />
    </div>
  )
}

export default ThemeToggle