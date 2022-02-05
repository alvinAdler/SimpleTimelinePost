import React from 'react';

import './BaseButton_master.css'

const BaseButton = ({buttonText, customClass, ...rest}) => {
  return <button className={`base-button ${customClass}`} {...rest}>{buttonText}</button>;
};

export default BaseButton;
