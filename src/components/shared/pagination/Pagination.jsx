
'use client'
import { useRouter } from 'next/navigation'
import styles from './pagination.module.css'

const Pagination = ({page, hasPrev, hasNext}) => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <button 
        disabled={!hasPrev}
        onClick={ () => router.push(`?page=${page-1}`) }
        className={styles.button}
        >
        Pervious
      </button>

      <button 
        disabled={!hasNext}
        onClick={ () => router.push(`?page=${page+1}`) }
        className={styles.button}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination