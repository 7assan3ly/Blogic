import styles from './cardList.module.css'
import Card from '../card/Card'
import Pagination from '@/components/shared/pagination/Pagination'

const getData = async (page, cat) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?page=${page}&cat=${cat || ''}`, {
    cache: 'no-store'
  })

  if(!res.ok) throw new Error('Failed')

  return res.json()
}

const CardList = async ({page, cat}) => {

  const {posts, count} = await getData(page, cat)

  const POSTS_PER_PAGE = 3

  const hasPrev = POSTS_PER_PAGE * (page-1) > 0
  const hasNext = POSTS_PER_PAGE * (page-1) + POSTS_PER_PAGE < count

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Recent Posts
      </h1>

      <div className={styles.posts}>
        {posts?.map((post) => (
          <Card key={post._id} post={post}/>
        ))}
        {!posts.length && <div className={styles.noPosts}>{`There's no Posts right now for this category`}</div>}
      </div>

      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}

export default CardList