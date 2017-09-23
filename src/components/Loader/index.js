import React from 'react'
import './Loader.less'

const Loader = ({ spinning, fullScreen }) => {
  return (<div className={`loader ${spinning === false && 'hidden'} ${fullScreen && 'fullScreen'}`}>
    <div className={'loader-wrapper'}>
      <div className={'loader-inner'} />
      <div className={'loader-text'} >LOADING</div>
    </div>
  </div>)
}


export default Loader
