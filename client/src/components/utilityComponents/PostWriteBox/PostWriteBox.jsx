import React from 'react'

import './PostWriteBox_master.css'

const PostWriteBox = () => {
  return(
      <div className="postwritebox-container">
          <h2>Heading</h2>
          <hr/>
          <div className="post-container">
            <textarea></textarea>
            <button className="btn-primary">Submit</button>
          </div>
      </div>
  );
};

export default PostWriteBox;
