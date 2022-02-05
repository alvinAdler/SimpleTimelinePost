import React from 'react';

import './PostBox_master.css'

const PostBox = ({postTitle, postDate, username, postContent}) => {
  return(
      <div className="postbox-container">
          <p className="post-username">{username}</p>
          <p className="post-date">{postDate}</p>
          <hr className="postcontent-separator"/>
          <h2 className="post-title">{postTitle}</h2>
          <p className="post-content">{postContent}</p>
      </div>
  );
};

export default PostBox;
