import React from 'react'

import './BlackBanner_master.css'

const BlackBanner = ({isVisible}) => {
    return (
        <div className={`${!isVisible && "hide-black-banner"} black-banner-container`}></div>
    )
}

export default BlackBanner
