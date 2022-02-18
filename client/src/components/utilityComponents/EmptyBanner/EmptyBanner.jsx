import React from 'react';

import './EmptyBanner_master.css'

const EmptyBanner = ({bannerTitle="There is no content", bannerDesc="Please come back later", customClass, ...rest}) => {
  return(
      <div className={`${customClass && customClass} empty-banner-container`} {...rest}>
          <p className="empty-banner-title">{bannerTitle}</p>
          <p className="empty-banner-description">{bannerDesc}</p>
      </div>
  )
};

export default EmptyBanner;
