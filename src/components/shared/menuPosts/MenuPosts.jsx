import Image from 'next/image'
import styles from './menuPosts.module.css'
import Link from 'next/link'

const getData = async (page) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}`, {
    cache: 'no-store'
  })

  if(!res.ok) throw new Error('Failed')

  return res.json()
}

const MenuPosts = async ({withImg}) => {
  const {posts} = await getData(3)
  return (
    <div className={styles.container}>
      {posts?.map((post) => (
        <div className={styles.post} key={post._id}>
          {withImg && post.img && (
            <div className={styles.imgContainer}>
              <Image
                src={post.img}
                alt={post.title}
                fill={true}
                className={styles.image}
              />
            </div>
          )}

          <div className={styles.txtContainer}>
            <span className={styles.postCat}>{post.catSlug}</span>
            <Link href={`/posts/${post.slug}`} className={styles.postTitle}>{post.title}</Link>
            <p className={styles.postEditor}>
              {post.user?.name} <span className={styles.postDate}> - {post.createdAt.substring(0,10)}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuPosts