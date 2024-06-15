import React from 'react'
import { useSnapshot } from 'valtio';

import state from './store/index';
import { getContrastingColor } from '../../config/helpers';

const CustomButton = ({ type, title, customStyles, handleClick, isActive }) => {

  // const activeStyle = {
  //   backgroundColor: isActive ? '#4A90E2' : '#FFFFFF', // Active button has a different background
  //   color: isActive ? '#FFFFFF' : '#333333',
  //   border: '1px solid #4A90E2',
  //   ...customStyles
  // };


  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if(type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
        margin: 10,
        padding: 10
      }
    } else if(type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
        padding: 10
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
      
      // onMouseOver={(e) => {
        

      // }}
      // onMouseOut={(e) => {
      //   if (isActive) {
      //     e.target.style.backgroundColor = "#FFFFFF"; 
      //   } else {
      //     e.target.style.backgroundColor = "black"; 
      //   }
      //   e.target.style.backgroundColor = "black"; 
      // }} 
    >
      {title}
    </button>
  )
}

export default CustomButton