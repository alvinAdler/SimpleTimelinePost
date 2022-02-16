import React from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'

import './UserBox_master.css'

const UserBox = ({username, showAddButton=true, showRemoveButton=true}) => {
  return (
    <div className="userbox-container">
        <span>{username}</span>
        <div className="action-icons-container">
            {showAddButton && <FaPlus/>}
            {showRemoveButton && <FaTimes/>}
        </div>
    </div>
  )
}

export default UserBox