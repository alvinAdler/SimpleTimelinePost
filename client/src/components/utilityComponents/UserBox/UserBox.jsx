import React from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'

import './UserBox_master.css'

const UserBox = ({username, showAddButton=false, showRemoveButton=false}) => {
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