import 'aframe';
import React, { useState } from 'react';
import ImageGallery from './components/ImageGallery.jsx';
import VideoGallery from './components/VideoGallery.jsx';
import './aframe/ScaleAnimator.jsx';
import './aframe/RotationAnimator.jsx';
import './aframe/GLTFMaterialFix.jsx';
import content from './content.json';
import { DEFAULT_DISTANCE_FROM_USER } from './constants.js';

export function App() {
  const [showPanelist, setShowPanelists] = useState(false);
  const [showCharacteristics, setShowCharacteristics] = useState(false);

  return (
    <>
      <a-scene>
        <a-camera look-controls="reverseMouseDrag: true" position="0 0 0"></a-camera>
        <a-entity id="raycaster" raycaster="objects: .clickable" cursor="rayOrigin: mouse"></a-entity>

        {/* Load assets */}
        <a-assets>
          <img id="panorama" src="panorama.webp" />
          {content.videos.map(video => <video key={video.id} id={video.id} loop={false} src={video.src} muted={video.muted} autoPlay={video.autoPlay}></video>)}
          <img id="panelista-1" src="panelista1.jpg" />
          <img id="panelista-2" src="panelista2.jpg" />
          <img id="panelista-3" src="panelista3.jpg" />
          <img id="panelista-4" src="panelista4.png" />
          <img id="panelists-button" src="hand.png" />
          <img id="characteristics-button" src="books.png" />
          <video id="video" loop={false} src="video.mp4" autoPlay></video>
        </a-assets>

        {/* Sky with panorama */}
        <a-sky src="#panorama"></a-sky>

        <a-entity
          gltf-model="icon.glb"
          rotation-animator="duration: 5000"
          position={`0 0 -${DEFAULT_DISTANCE_FROM_USER}`}
          scale="2 2 2"
          gltf-material-fix
        ></a-entity>

        <a-plane
          class="clickable"
          src="#panelists-button"
          position={`-${DEFAULT_DISTANCE_FROM_USER + 0.1} 0 0`}
          rotation="0 90 0"
          onClick={() => setShowPanelists(true)}
        ></a-plane>

        {showPanelist && <VideoGallery
          videos={content.videos.map(video => `#${video.id}`)}
          position={`-${DEFAULT_DISTANCE_FROM_USER} 0 0`}
          rotation="0 90 0"
          scale="1 1 1"
          closeFunction={() => setShowPanelists(false)} />}

        <VideoGallery
          videos={["#video"]}
          position={`${DEFAULT_DISTANCE_FROM_USER} 0 0`}
          rotation="0 -90 0"
          scale="1 1 1" />

        <a-plane
          class="clickable"
          src="#characteristics-button"
          position={`0 0 ${DEFAULT_DISTANCE_FROM_USER + 0.1}`}
          rotation="0 180 0"
          onClick={() => setShowCharacteristics(true)}
        ></a-plane>

        {showCharacteristics && <ImageGallery
          id='gallery-1'
          images={["#panelista-1", "#panelista-2", "#panelista-3", "#panelista-4"]}
          position={`0 0 ${DEFAULT_DISTANCE_FROM_USER}`}
          rotation="0 180 0"
          closeFunction={() => setShowCharacteristics(false)}
        />}
      </a-scene>
    </>
  );
}
