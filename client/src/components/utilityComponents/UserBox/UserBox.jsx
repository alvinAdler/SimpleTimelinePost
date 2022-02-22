import React from 'react'
import { FaPlus, FaTimes, FaClock } from 'react-icons/fa'

import './UserBox_master.css'

const defaultAddClick = () => {

}

const defaultRemoveClick = () => {

}

const UserBox = ({user, showAddButton=false, showRemoveButton=false, showLoadingIcon=false, onAddClick=defaultAddClick, onRemoveClick=defaultRemoveClick}) => {
  return (
    <div className="userbox-container">
        <span>{user.username}</span>
        <div className="action-icons-container">
            {showAddButton && <FaPlus className="userbox-icon clickable-icon" onClick={() => onAddClick(user)}/>}
            {showRemoveButton && <FaTimes className="userbox-icon clickable-icon" onClick={() => onRemoveClick(user)}/>}
            {showLoadingIcon && <FaClock className="userbox-icon"/>}
        </div>
    </div>
  )
}

export default UserBox