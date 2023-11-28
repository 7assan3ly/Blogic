import CardList from '@/components/home/cardList/CardList'
import styles from './page.module.css'
import SideMenu from '@/components/shared/sideMenu/SideMenu'

const page = ({searchParams}) => {
  const page = parseInt(searchParams.page) || 1
  const {cat} = searchParams
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{cat} Blog</h1>
        <div className={styles.content}>
            <CardList page={page} cat={cat} />
            <SideMenu />
        </div>
    </div>
  )
}

export default page