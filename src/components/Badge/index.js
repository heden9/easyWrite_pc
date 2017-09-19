import React, { PropTypes } from 'react';
import './style.less';


export default function Badge({num}) {
  return (
    <sup className="badge-container">{num > 99 ? <span>99<sup>+</sup></span> : num}</sup>
  )
}


Badge.propTypes = {
  num: PropTypes.number
};
