import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from './store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div
     style={{position: 'absolute', height: '100%', width: '100%', marginLeft: '148px'}}
    >
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => state.color = color.hex}
        styles={{
          default: {
            picker: {
              display: "flex",
              flexDirection: "column",  
            },
          },
        }}
      />

    </div>
  )
}

export default ColorPicker