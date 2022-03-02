import { useState, useEffect, useRef } from 'react';
import BaseButton from '../Buttons/BaseButton/BaseButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import './PostBox_master.css'

const PostBox = ({postTitle, postDate, username, postContent}) => {

	const [expandPost, setExpandPost] = useState(false)
	const [showExpandButton, setShowExpandButton] = useState(false)
	const postContentRef = useRef()

	useEffect(() => {

		const handleExpandButtonDisplay = () => {
			if(postContentRef.current.scrollWidth > postContentRef.current.clientWidth){
				setShowExpandButton(true)
				return
			}
			setShowExpandButton(false)
		}

		handleExpandButtonDisplay()

		window.addEventListener("resize", handleExpandButtonDisplay)

		return () => {
			window.removeEventListener("resize", handleExpandButtonDisplay)
		}

	}, [])
	
	return(
		<div className="postbox-container">
			<div className="postbox-header">
				<p className="post-username">{username}</p>
				<p className="post-date">{postDate}</p>
				{showExpandButton && 
				<BaseButton type="button" 
				buttonText={expandPost ? <FaEyeSlash/> : <FaEye/>} 
				customClass="toggle-post-content"
				onClick={() => setExpandPost(!expandPost)}
				/>
				}
			</div>
			<hr className="postcontent-separator"/>
			<div className="postbox-body">
				<h2 className="post-title">{postTitle}</h2>
				<p ref={postContentRef} 
				className={`post-content ${!expandPost && "hide"}`}>
					{postContent}
				</p>
			</div>
		</div>
	);
};

export default PostBox;
