"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { app } from "@/utils/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useSWR from "swr";
import dynamic from "next/dynamic";

const fetcher = async (url) => {
    const res = await fetch(url)
  
    if(!res.ok) throw new Error('Failed')
    
    return res.json()
}

const Page = () => {
    const ReactQuill = dynamic(()=> import('react-quill'), {ssr:false})
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState('')
    const [value, setValue] = useState(false);
    const [title, setTitle] = useState("");
    const [catSlug, setCatSlug] = useState("");
    const {status} = useSession()
    const router = useRouter()

    const {data} = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/categories`, fetcher)
    console.log(data)

    useEffect(() => {
        const storage = getStorage(app);
        const upload = () => {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
                case "paused":
                console.log("Upload is paused");
                break;
                case "running":
                console.log("Upload is running");
                break;
            }
            },
            (error) => {},
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUploadedFile(downloadURL);
            });
            }
        );
        };

        file && upload()
    },[file])
  
    if(status === 'loading') {
      return <div>Loading...</div>
    }
  
    if(status === 'unauthenticated') {
      router.push('/')
    }

    const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const handleSubmit = async () => {
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                desc: value,
                img: uploadedFile,
                slug: slugify(title),
                catSlug
            })
        })

        if (res.status === 200) {
            const data = await res.json();
            router.push(`/posts/${data.slug}`);
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.inputsHolder}>
            <input 
                type="text"
                placeholder="Title..."
                className={styles.input} 
                onChange={(e) => setTitle(e.target.value)}
            />

            <select className={styles.slctBox} onChange={(e) => setCatSlug(e.target.value)}>
                <option disabled selected>Select Category</option>
                {data?.map((cat) => (
                    <option value={cat.slug} key={cat._id}>{cat.title}</option>
                ))}
            </select>
        </div>

        <div className={styles.editor}>
            <button className={styles.button} onClick={() => setOpen(!open)}>
                <Image src='/plus.png' alt='' width={16} height={16} />
            </button>
            {open && (
                <div className={styles.add}>
                    <input
                        type="file"
                        id="image"
                        style={{display: 'none'}}
                        onChange={ (e) => setFile(e.target.files[0]) }
                    />
                    <button className={styles.addButton}>
                        <label htmlFor="image" className={styles.label}>
                            <Image src='/image.png' alt='' width={16} height={16} />
                        </label>
                    </button>
                    <button className={styles.addButton}>
                        <Image src='/external.png' alt='' width={16} height={16} />
                    </button>
                    <button className={styles.addButton}>
                        <Image src='/video.png' alt='' width={16} height={16} />
                    </button>
                </div>
            )}
            <ReactQuill 
                className={styles.textArea}
                theme="bubble" 
                value={value} 
                onChange={setValue} 
                placeholder="blog your post ..."
            />
        </div>
        <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
}

export default Page