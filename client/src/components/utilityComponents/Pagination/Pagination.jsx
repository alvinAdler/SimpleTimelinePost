import React from 'react'

import './Pagination_master.css'

const Pagination = ({children, itemsNum, itemsPerPage, paginator}) => {

    return (
        <div className="container-width pagination-container">
            {children}
            <div className="pagination-buttons">
                {!(itemsNum <= itemsPerPage) && Array.from(Array(Math.ceil(itemsNum / itemsPerPage))).map((_, index) => (
                    <button key={index+1} className="pagination-button"
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