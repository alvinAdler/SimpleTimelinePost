import { useEffect, useState, useContext } from 'react'
import Cookies from 'js-cookie'

import "./TimelinesPage_master.css"

import usePagination from '../utilities/usePagination'
import customAxios from '../utilities/customAxios'
import PostWriteBox from "../utilityComponents/PostWriteBox/PostWriteBox"
import PostBox from "../utilityComponents/PostBox/PostBox"
import EmptyBanner from '../utilityComponents/EmptyBanner/EmptyBanner'
import AuthContext from '../utilityComponents/contexts/AuthContext'
import Pagination from '../utilityComponents/Pagination/Pagination'
import { 
    getDateObject, 
    customDate
} from '../utilities/utilityFunctions'

const TimelinesPage = () => {

    const [posts, setPosts] = useState([]);
    
    const authContext = useContext(AuthContext)

    const postPaginator = usePagination(5, posts)

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
            console.log(res.data.posts)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleSubmitPostCallback = (post) => {
        const newPost = {...post, username: authContext.user.username}

        setPosts([newPost, ...posts])
    }

    return (
        <div className="timelinespage-container">
            <h2>What's on your mind?</h2>
            <PostWriteBox onPostSubmitCallback={handleSubmitPostCallback}/>
            {
                posts.length > 0 ?                 
                <Pagination 
                itemsNum={posts.length}
                itemsPerPage={postPaginator.ITEMS_PER_PAGE}
                paginator={postPaginator}
                >
                    {postPaginator.paginatedItems.map((post, index) => (
                        <PostBox key={post._id} postTitle={post.postTitle}
                        postDate={customDate(getDateObject(post.createdAt))}
                        username={post.username}
                        postContent={post.postContent}
                        />
                    ))}
                </Pagination>

                :
                
                <EmptyBanner
                customClass="container-width"
                bannerTitle="There are no contents for now. . ."
                bannerDesc="Go ahead and post some stories!"
                />
            }
        </div>
    )
}

export default TimelinesPage
