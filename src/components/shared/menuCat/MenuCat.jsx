import Link from 'next/link';
import styles from './menuCat.module.css';

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: 'no-store'
  })

  if(!res.ok) throw new Error('Failed')

  return res.json()
}

const MenuCat = async () => {
  const data = await getData()
  return (
    <div className={styles.categoryList}>
      {data?.map((cat) => (
        <Link
          key={cat._id}
          href={`/blog?cat=${cat.slug}`}
          className={`${styles.categoryItem} ${styles[cat.slug]}`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  )
}

export default MenuCat