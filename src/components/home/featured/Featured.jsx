import Image from 'next/image'
import styles from './featured.module.css'

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Welcome to BLOGIC</b> Discover our stories and creative ideas.
      </h1>

      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src='/p1.jpeg'
            alt='Featured Post Image'
            fill={true}
            className={styles.image}
          />
        </div>

        <div className={styles.txtContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
          <p className={styles.postDesc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti molestias necessitatibus eveniet minima, dolores, eum fugiat illo iusto voluptatum iure facere repudiandae. Exercitationem necessitatibus, obcaecati nisi excepturi error repudiandae reiciendis?</p>
          <button className={styles.postBtn}>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default Featured