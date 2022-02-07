import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import "./TimelinesPage_master.css"

import customAxios from '../utilities/customAxios'
import PostWriteBox from "../utilityComponents/PostWriteBox/PostWriteBox"
import PostBox from "../utilityComponents/PostBox/PostBox"
import { getDateObject, customDate } from '../utilities/utilityFunctions'

const TimelinesPage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        customAxios({
            method: "GET",
            url: "/users/getPosts",
            headers: {
                "Authorization": `Bearer ${Cookies.get("authToken")}`
            }
        })
        .then((res) => {
            setPosts(res.data.posts)
            res.data.posts.map((item) => {
                console.log(getDateObject(item.createdAt))
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="timelinespage-container">
            <h1>What's on your mind?</h1>
            <PostWriteBox/>
            {posts.map((post, index) => (
                <PostBox key={index} postTitle={post.postTitle}
                postDate={customDate(getDateObject(post.createdAt))}
                username={post.username}
                postContent={post.postContent}
                />
            ))}
        </div>
    )
}

export default TimelinesPage
