'use client'
import styles from './comments.module.css'
import Link from "next/link";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = async (url) => {
  const res = await fetch(url)

  if(!res.ok) throw new Error('Failed')
  
  return res.json()
}

const Comments = ({postSlug}) => {
  const {status} = useSession()

  const {data, mutate, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?postSlug=${postSlug}`, fetcher)
  
  const [comment, setComment] = useState('')

  const postComment = async () => {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({desc:comment, postSlug})
    })
    mutate()
  }
  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Comments</h1>
    {status === "authenticated" ? (
      <div className={styles.write}>
        <textarea
          placeholder="write a comment..."
          className={styles.input}
          onChange={ (e) => setComment(e.target.value)}
        />
        <button 
          className={styles.button}
          onClick={postComment}
        >
          Send
        </button>
      </div>
    ) : (
      <Link href="/login">Login to write a comment</Link>
    )}
    <div className={styles.comments}>
      {isLoading ? (<p>Loading ...</p>) : (
        data.map((comment) => (
          <div className={styles.comment} key={comment._id}>
            <div className={styles.user}>
              {comment?.user.image && (
                <Image
                  src={comment.user.image}
                  alt={comment.user.name}
                  width={50}
                  height={50}
                  className={styles.image}
                />
              )}
              <div className={styles.userInfo}>
                <span className={styles.username}>{comment.user.name}</span>
                <span className={styles.date}>{comment.createdAt.substring(0,10)}</span>
              </div>
            </div>
            <p className={styles.desc}>
              {comment.desc}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
  )
}

export default Comments