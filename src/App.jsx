import 'aframe';
import React from 'react';

export function App() {
  return (
    <>
      {/* A-Frame Scene */}
      <a-scene>
        {/* Add a basic box */}
        <a-box position="0 1 -3" rotation="0 45 0" color="blue"></a-box>

        {/* Add a floor */}
        <a-plane position="0 0 -3" rotation="-90 0 0" width="10" height="10" color="green"></a-plane>

        {/* Add a sky */}
        <a-sky color="#ECECEC"></a-sky>

        {/* Add lights */}
        <a-light type="ambient" intensity="0.5"></a-light>
        <a-light type="directional" position="0 5 -1" intensity="1"></a-light>
      </a-scene>
    </>
  );
}
