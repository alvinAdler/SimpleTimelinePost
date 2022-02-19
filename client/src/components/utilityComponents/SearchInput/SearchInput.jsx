import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import './SearchInput_master.css'

import BaseButton from '../Buttons/BaseButton/BaseButton'

const SearchInput = ({mainClass, inputClass, placeholderText="Search here", searchCallback, ...rest}) => {

    const [searchInput, setSearchInput] = useState("")

    return (
        <div className={`${mainClass} search-input-container`}>
            <input {...rest} className={`${inputClass}`}
            placeholder={placeholderText}
            onChange={(ev) => setSearchInput(ev.target.value)}
            />
            <BaseButton buttonText={<FaSearch/>} onClick={() => searchCallback(searchInput)}/>
        </div>
    )
}

export default SearchInput