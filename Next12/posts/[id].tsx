import React from 'react';
import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPostIds} from "@/lib/post";
import {getPostsData} from "@/lib/post";
import Head from "next/head";
import homeStyles from "../../styles/Home.module.css"
import postStyles from "../../styles/Post.module.css"

type postProps = {
    title: string
    date: string
    contentHtml: string
}


const Post = ({postData}: {postData: postProps}) => {
    return(
        <div className={postStyles.container}>
            <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={homeStyles.headingXl}>{postData.title}</h1>
            <div className={homeStyles.lightText}>
                {postData.date}
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
        </article>
        </div>
    )
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async({params}) => {
    const postData = await getPostsData(params!.id as string);
    return {
        props: {
            postData
        }
    }
}