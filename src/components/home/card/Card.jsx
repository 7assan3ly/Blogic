import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({post}) => {
  return (
    <div className={styles.post} key={post._id}>
        {post.img && (
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
        <p className={styles.postDate}>
          {post.createdAt.substring(0,10)} - <Link href={`/blog?cat=${post.catSlug}`} className={styles.postCat}>{post.catSlug}</Link>
        </p>
        <Link href={`/posts/${post.slug}`}>
          <h1 className={styles.postTitle}>
            {post.title}
          </h1>
        </Link>
        <p className={styles.postDesc} dangerouslySetInnerHTML={{ __html: post?.desc }} />
        <Link href={`/posts/${post.slug}`} className={styles.postBtn}>Read More</Link>
      </div>
    </div>
  );
};

export default Card;
