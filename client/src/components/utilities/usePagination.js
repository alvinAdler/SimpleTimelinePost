import { useState, useEffect } from 'react'

const usePagination = (itemsPerPage, itemsList) => {
    const ITEMS_PER_PAGE = itemsPerPage
    const [itemIndex, setItemIndex] = useState(0)
    const [paginatedItems, setPaginatedItems] = useState(itemsList.slice(itemIndex, itemIndex + itemsPerPage))

    useEffect(() => {

        setPaginatedItems(itemsList.slice(itemIndex, itemIndex + itemsPerPage))
        
    }, [itemsList, itemIndex])

    return{
        itemIndex,
        setItemIndex,
        paginatedItems,
        setPaginatedItems,
        ITEMS_PER_PAGE
    }
    
}

export default usePagination