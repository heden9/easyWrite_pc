import React from 'react';
import './style.less';
export default function LoginBack({className, children}) {
  return (
    <div id="particles" className={className}>
      {children}
    </div>
  );
}
