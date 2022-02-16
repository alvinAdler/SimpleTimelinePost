import React from 'react'
import { FaSearch } from 'react-icons/fa'

import './SearchInput_master.css'

import BaseButton from '../Buttons/BaseButton/BaseButton'

const SearchInput = ({mainClass, inputClass, ...rest}) => {
    return (
        <div className={`${mainClass} search-input-container`}>
            <input {...rest} className={`${inputClass}`}
            placeholder="Sample Text"
            />
            <BaseButton buttonText={<FaSearch/>}/>
        </div>
    )
}

export default SearchInput