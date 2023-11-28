import Featured from "@/components/home/featured/Featured";
import styles from "./homepage.module.css";
import CatList from "@/components/home/catList/CatList";
import CardList from "@/components/home/cardList/CardList";
import SideMenu from "@/components/shared/sideMenu/SideMenu";

export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1
  return (
    <div className={styles.container}>
      <Featured/>
      <CatList/>
      <div className={styles.content}>
        <CardList page={page}/>
        <SideMenu/>
      </div>
    </div>
  )
}
