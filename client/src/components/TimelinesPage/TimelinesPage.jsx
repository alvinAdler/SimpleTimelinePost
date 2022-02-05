import "./TimelinesPage_master.css"

import PostWriteBox from "../utilityComponents/PostWriteBox/PostWriteBox"
import PostBox from "../utilityComponents/PostBox/PostBox"

const TimelinesPage = () => {

    return (
        <div className="timelinespage-container">
            <h1>What's on your mind?</h1>
            <PostWriteBox/>
            <PostBox postTitle="Sample Title" 
            postDate="December 24, 2021"
            username="Admin"
            postContent="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam earum, enim similique molestias ex rem quo? Animi at cupiditate, cumque ipsum voluptatum nihil iste natus eum provident qui sint et."
            />
            <PostBox postTitle="Sample Title" 
            postDate="December 24, 2021"
            username="Admin"
            postContent="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam earum, enim similique molestias ex rem quo? Animi at cupiditate, cumque ipsum voluptatum nihil iste natus eum provident qui sint et."
            />
            <PostBox postTitle="Sample Title" 
            postDate="December 24, 2021"
            username="Admin"
            postContent="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam earum, enim similique molestias ex rem quo? Animi at cupiditate, cumque ipsum voluptatum nihil iste natus eum provident qui sint et."
            />
        </div>
    )
}

export default TimelinesPage
