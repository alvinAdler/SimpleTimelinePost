import React from 'react'

import './PostWriteBox_master.css'

import BaseButton from '../Buttons/BaseButton/BaseButton'

const PostWriteBox = () => {
  return(
      <div className="postwritebox-container">
          <input type="text" className="postwritebox-title" placeholder='Put post title here...'/>
          <hr className='postwritebox-separator'/>
          <div className="post-container">
            <textarea className="postwrite-textarea" placeholder="Type something nice..."/>
            <BaseButton buttonText="Post" customClass="post-button"/>
          </div>
      </div>
  );
};

export default PostWriteBox;
