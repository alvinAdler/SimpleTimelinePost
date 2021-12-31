import React from 'react'

import './BlackBanner_master.css'

const BlackBanner = ({isVisible, ...rest}) => {
    return (
        <div className={`${!isVisible && "hide-black-banner"} black-banner-container`} {...rest}></div>
    )
}

export default BlackBanner
