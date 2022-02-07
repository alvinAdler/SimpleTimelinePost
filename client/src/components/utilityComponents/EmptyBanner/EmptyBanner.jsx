import React from 'react';

import './EmptyBanner_master.css'

const EmptyBanner = ({bannerTitle="There is no content", bannerDesc="Please come back later", customClass}) => {
  return(
      <div className={`${customClass && customClass} empty-banner-container`}>
          <p className="empty-banner-title">{bannerTitle}</p>
          <p className="empty-banner-description">{bannerDesc}</p>
      </div>
  )
};

export default EmptyBanner;
