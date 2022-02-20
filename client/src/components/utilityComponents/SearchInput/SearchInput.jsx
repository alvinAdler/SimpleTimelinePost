import { useState, useRef } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

import './SearchInput_master.css'

import BaseButton from '../Buttons/BaseButton/BaseButton'

const SearchInput = ({mainClass, inputClass, placeholderText="Search here", searchCallback, ...rest}) => {

    const [searchInput, setSearchInput] = useState("")
    
    const searchInputRef = useRef(null)

    const handleResetSearch = () => {
        setSearchInput("")
        searchInputRef.current.focus()
    }

    return (
        <div className={`${mainClass} search-input-container`}>
            <input {...rest} className={`${inputClass}`}
            placeholder={placeholderText}
            value={searchInput}
            onChange={(ev) => setSearchInput(ev.target.value)}
            ref={searchInputRef}
            />
            {searchInput !== "" && <button className="reset-search-button" onClick={handleResetSearch}><FaTimes/></button>}
            <BaseButton buttonText={<FaSearch/>} onClick={() => searchCallback(searchInput)}/>
        </div>
    )
}

export default SearchInput