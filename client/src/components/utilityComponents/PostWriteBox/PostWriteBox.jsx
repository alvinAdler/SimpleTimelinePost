import React, { useState } from 'react'
import swal from 'sweetalert2'
import customAxios from '../../utilities/customAxios'
import Cookies from 'js-cookie'

import './PostWriteBox_master.css'

import BaseButton from '../Buttons/BaseButton/BaseButton'

const PostWriteBox = ({onPostSubmitCallback}) => {

	const [postTitle, setPostTitle] = useState("")
	const [postContent, setPostContent] = useState("")

	const handleSubmitPost = (ev) => {
		ev.preventDefault()

		if(postTitle === "" || postContent === ""){
			swal.fire({
				icon: "error",
				title: "Oops!",
				text: "You need to filll every field.",
				customClass: {
                    popup: "swal-custom-popup",
                    icon: "swal-icon",
                    confirmButton: "swal-custom-confirm",
                    cancelButton: "swal-custom-cancel"
                }
			})
			return
		}

		swal.fire({
			icon: "question",
			title: "Confirmation",
			text: "Are you sure to publish this post?",
			showCancelButton: true,
			customClass: {
				popup: "swal-custom-popup",
				icon: "swal-icon",
				confirmButton: "swal-custom-confirm",
				cancelButton: "swal-custom-cancel"
			}
		})
		.then((res) => {
			if(res.isConfirmed){

				customAxios({
					method: "POST",
					url: "/users/addPost",
					headers: {
						"Content-type": "application/json",
						"Authorization": `Bearer ${Cookies.get("authToken")}`
					},
					data: {
						postTitle: postTitle,
						postContent: postContent
					}
				})
				.then((res) => {
					if(res.status === 200){
						onPostSubmitCallback(res.data.post)
						setPostTitle("")
						setPostContent("")
						swal.fire({
							icon: "success",
							title: "Posted!",
							text: "Your post will appear shortly",
							customClass: {
								popup: "swal-custom-popup",
								icon: "swal-icon",
								confirmButton: "swal-custom-confirm",
								cancelButton: "swal-custom-cancel"
							}
						})
					}
				})
				.catch((err) => {
					console.log(err)
					swal.fire({
						icon: "error",
						title: "Error!",
						text: "Something went wrong while posting your post. Please try again later.",
						customClass: {
							popup: "swal-custom-popup",
							icon: "swal-icon",
							confirmButton: "swal-custom-confirm",
							cancelButton: "swal-custom-cancel"
						}
					})
				})

			}
		})
	}

	return(
	<div className="postwritebox-container">
		<input type="text" className="postwritebox-title" placeholder='Put post title here...'
		value={postTitle} onChange={(ev) => setPostTitle(ev.target.value)}/>
		<hr className='postwritebox-separator'/>
		<form className="post-container" onSubmit={handleSubmitPost}>
			<textarea className="postwrite-textarea" placeholder="Type something nice..."
			value={postContent} onChange={(ev) => setPostContent(ev.target.value)}
			/>
			<BaseButton type="submit" buttonText="Post" customClass="post-button"/>
		</form>
	</div>
	);
};

export default PostWriteBox;
