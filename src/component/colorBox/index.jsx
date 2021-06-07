import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './colorBox.scss';
ColorBox.propTypes = {
  
};

function getRandomColor() {
  const COLOR_LIST = ['deeppink', 'red', 'black', 'orange', 'violet'];
  let randomIndex = undefined;
  do {
    randomIndex = Math.floor(Math.random() * COLOR_LIST.length);
  } while(COLOR_LIST[randomIndex] === (localStorage.getItem('box_color') || 'deeppink'));
  return COLOR_LIST[randomIndex];
}

function ColorBox() {
  
  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem('box_color') || 'deeppink';
    return initColor;
  });

  function handleBoxClick() {
    const newColor = getRandomColor();
    setColor(newColor);

    localStorage.setItem('box_color', newColor);
  }
  return (
    <div
     className = "color-box"
      style = {{backgroundColor: color}}
      onClick = {handleBoxClick}
    >
    </div>
  );
}

export default ColorBox;