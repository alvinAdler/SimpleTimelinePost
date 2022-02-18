import React from 'react'
import { FaSearch } from 'react-icons/fa'

import './SearchInput_master.css'

import BaseButton from '../Buttons/BaseButton/BaseButton'

const SearchInput = ({mainClass, inputClass, placeholderText="Search here", ...rest}) => {
    return (
        <div className={`${mainClass} search-input-container`}>
            <input {...rest} className={`${inputClass}`}
            placeholder={placeholderText}
            />
            <BaseButton buttonText={<FaSearch/>}/>
        </div>
    )
}

export default SearchInput