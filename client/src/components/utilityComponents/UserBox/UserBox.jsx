import React from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'

import './UserBox_master.css'

const defaultAddClick = () => {

}

const defaultRemoveClick = () => {

}

const UserBox = ({user, showAddButton=false, showRemoveButton=false, onAddClick=defaultAddClick, onRemoveClick=defaultRemoveClick}) => {
  return (
    <div className="userbox-container">
        <span>{user.username}</span>
        <div className="action-icons-container">
            {showAddButton && <FaPlus onClick={() => onAddClick(user)}/>}
            {showRemoveButton && <FaTimes onClick={() => onRemoveClick(user)}/>}
        </div>
    </div>
  )
}

export default UserBox