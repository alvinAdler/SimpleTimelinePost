import React from 'react'

import './Pagination_master.css'

const Pagination = ({children, itemsNum, itemsPerPage, paginator, customClass}) => {

    return (
        <div className={`${customClass} pagination-container`}>
            {children}
            <div className="pagination-buttons">
                {!(itemsNum <= itemsPerPage) && Array.from(Array(Math.ceil(itemsNum / itemsPerPage))).map((_, index) => (
                    <button key={index+1} 
                    className={`${paginator.itemIndex === (index * itemsPerPage) && "current"} pagination-button`}
                    onClick={() => paginator.setItemIndex(index * itemsPerPage)}
                    >
                        {index+1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Pagination