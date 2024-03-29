import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import homeStyles from "@/styles/Home.module.css";
import {GetStaticProps} from "next";
import {getSortedPostsData} from "@/lib/post";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type postsData = {
    date: string
    title: string
    id: string
};

const Home = ({allPostsData}: {
    allPostsData: postsData[]
}) => {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Lukas Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <section>
            <p>
                [Lukas Park Introduction]
            </p>
            <p>
                (This is a blog)
            </p>
        </section>
        <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
            <h2 className={homeStyles.haeadingLg}>Blog</h2>
            <ul className={homeStyles.list}>
                {
                   allPostsData.map(({date, title, id}) =>
                       <li className={homeStyles.listItem} key={id}>
                           <Link href={`posts/${id}`}>
                               {title}
                           </Link>
                           <br/>
                           <small className={homeStyles.lightText}>
                               {date}
                           </small>
                       </li>
                   )
                }
            </ul>
        </section>
    </div>
  );
}

export default Home;
export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return{
        props: {allPostsData}
    }
}
