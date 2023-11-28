import MenuCat from '../menuCat/MenuCat'
import MenuPosts from '../menuPosts/MenuPosts'
import styles from './sideMenu.module.css'

const SideMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <h3 className={styles.postsHead}>{"What's hot"}</h3>
        <h2 className={styles.postsTitle}>Most Popular</h2>
        <MenuPosts withImg={false}/>
      </div>

      <div className={styles.posts}>
        <h3 className={styles.postsHead}>Discover by topic</h3>
        <h2 className={styles.postsTitle}>Categories</h2>
        <MenuCat />
      </div>

      <div className={styles.posts}>
        <h3 className={styles.postsHead}>Chosen by the editor</h3>
        <h2 className={styles.postsTitle}>{"Editor's pick"}</h2>
        <MenuPosts withImg={true}/>
      </div>
    </div>
  )
}

export default SideMenu