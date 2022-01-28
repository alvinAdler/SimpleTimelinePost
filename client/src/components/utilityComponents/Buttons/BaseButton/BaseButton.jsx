import React from 'react';

import './BaseButton_master.css'

const BaseButton = ({buttonText, customClass}) => {
  return <button className={`base-button ${customClass}`}>{buttonText}</button>;
};

export default BaseButton;
