import 'aframe';
import React from 'react';
import Gallery from './components/Gallery.jsx';
import VideoCard from './components/VideoCard.jsx';
import './aframe/ScaleAnimator.jsx';

export function App() {
  return (
    <>
      <a-scene>
        <a-camera position="0 0 0"></a-camera>
        <a-entity id="raycaster" raycaster="objects: .clickable" cursor="rayOrigin: mouse"></a-entity>

        {/* Load assets */}
        <a-assets>
          <img id="panorama" src="panorama.jpg" />
          <img id="panelista-1" src="panelista1.jpg" />
          <img id="panelista-2" src="panelista2.jpg" />
          <img id="panelista-3" src="panelista3.jpg" />
          <img id="panelista-4" src="panelista4.png" />
          <video id="video-inicial" loop={false} src="video.mp4"></video>
        </a-assets>

        {/* Sky with panorama */}
        <a-sky src="#panorama"></a-sky>

        {/* Lights */}
        <a-light type="ambient" intensity="0.5"></a-light>
        <a-light type="directional" position="0 5 -1" intensity="1"></a-light>

        <VideoCard src="#video-inicial" title="Video Inicial" position="0 0 -2" rotation="0 0 0" scale="0.1 0.1 0.1"/>
        <Gallery id='gallery-1' images={["#panelista-1","#panelista-2","#panelista-3","#panelista-4"]} position="2 0 0" rotation="0 -90 0"/>
        <Gallery id='gallery-2' images={["#panelista-1","#panelista-2","#panelista-3","#panelista-4"]} position="-2 0 0" rotation="0 90 0"/>
      </a-scene>
    </>
  );
}
