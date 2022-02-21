import React from 'react'

import './BlackBanner_master.css'

const BlackBanner = ({isVisible, opacity, ...rest}) => {
    return (
        <div className={`${!isVisible && "hide-black-banner"} black-banner-container`} 
        style={{opacity: opacity}}
        {...rest}
        >
        </div>
    )
}

export default BlackBanner
