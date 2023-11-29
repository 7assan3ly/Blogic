import styles from './page.module.css'
import SideMenu from '@/components/shared/sideMenu/SideMenu'
import Image from 'next/image'
import Comments from '@/components/post/comments/Comments'

const getData = async (slug) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${slug}`, {
        cache: 'no-store'
    })

    if(!res.ok) throw new Error('Failed')

    return res.json()
}

const page = async ({params}) => {
    const {slug} = params
    const post = await getData(slug)
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post?.title}</h1>
                <div className={styles.user}>
                    {post?.user?.image && (
                        <div className={styles.userImageContainer}>
                            <Image src={post.user.image} alt={post.user.name} fill className={styles.avatar} />
                        </div>
                    )}
                    <div className={styles.userTextContainer}>
                        <span className={styles.username}>{post?.user?.name}</span>
                        <span className={styles.date}>{post?.createdAt.substring(0,10)}</span>
                    </div>
                </div>
            </div>
            {post?.img && (
                <div className={styles.imageContainer}>
                    <Image src={post.img} alt={post.title} fill className={styles.image} />
                </div>
            )}
        </div>
        <div className={styles.content}>
            <div className={styles.post}>
                <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: post?.desc }}
                />
                <div className={styles.comment}>
                    <Comments postSlug={slug}/>
                </div>
            </div>
            <SideMenu />
        </div>
    </div>
  )
}

export default page