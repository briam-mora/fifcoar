import 'aframe';
import React, { useState } from 'react';
import ImageGallery from './components/ImageGallery.jsx';
import VideoGallery from './components/VideoGallery.jsx';
import './aframe/ScaleAnimator.jsx';
import './aframe/HoverAnimator.jsx';
import './aframe/GLTFMaterialFix.jsx';
import content from './content.json';
import { DEFAULT_DISTANCE_FROM_USER } from './constants.js';

export function App() {
  const [showPanelist, setShowPanelists] = useState(false);
  const [started, setStarted] = useState(false);
  const [showCharacteristics, setShowCharacteristics] = useState(false);

  const openCharacteristics = () => {
    var audio = new Audio('activacion_video.wav');
    audio.play();
    setShowCharacteristics(true)
  }

  const openPanelists = () => {
    var audio = new Audio('activacion_video.wav');
    audio.play();
    setShowPanelists(true)
  }

  return (
    <>
      <a-scene loading-screen="dotsColor: #9BD7E1; backgroundColor: #2D387F">
        <a-camera look-controls="reverseMouseDrag: true" position="0 0 0"></a-camera>
        <a-entity id="raycaster" raycaster="objects: .clickable" cursor="rayOrigin: mouse"></a-entity>

        {/* Load assets */}
        <a-assets>
          <img id="panorama" src="panorama.webp" />
          {content.videos.map(video => <video key={video.id} id={video.id} src={video.src} muted={video.muted} autoPlay={video.autoPlay}></video>)}
          {content.images.map(image => <img key={image.id} id={image.id} src={image.src} />)}
          {content.panelists.map(panelist => <img key={panelist.id} id={panelist.id} src={panelist.src} />)}
          <img id="light-arrow" src="icono.png" />
          <img id="play-button" src="play.png" />
          <img id="pantalla-carga" src="pantalla_carga.png" />
          <img id="panelists-button" src="nuevo-small_panelistas_titulo.png" />
          <img id="panelists-text" src="nuevo-small_back_panelista.png" />
          <img id="characteristics-button" src="art_fifco-18.png" />
          <img id="characteristics-1" src="art_fifco-19.png" />
          <img id="characteristics-2" src="art_fifco-20.png" />
          <img id="characteristics-3" src="art_fifco-21.png" />
          <img id="characteristics-4" src="art_fifco-22.png" />
          <img id="next" src="next.png" />
          <img id="prev" src="prev.png" />
          <img id="close" src="close.png" />
          <img id="date" src="date.png" />
          <video id="video" src="video.mp4" autoPlay loop="false"></video>
        </a-assets>

        {/* Sky with panorama */}
        <a-sky src="#panorama"></a-sky>


        {started && <a-plane
          class="clickable"
          src="#date"
          position={`0 -0.3 -${DEFAULT_DISTANCE_FROM_USER}`}
          rotation="0 0 0"
          scale="1.3 0.16 1.3"
          transparent="true"
          material="shader: flat"
          onClick={() => { window.open('https://maps.app.goo.gl/iwQ4uWfBv2cank8i9?g_st=com.google.maps.preview.copy', '_blank'); }}
        ></a-plane>}

        {started && <a-entity
          id="logo-model"
          hover-animator="duration: 2000; easing: easeInOutQuad;"
          position={`0 0.1 -${DEFAULT_DISTANCE_FROM_USER}`}
          scale="1 1 1"
        >
          <a-entity
            gltf-model="logo_genesis.glb"
            position="0.03 -0.1 0"
            rotation="90 0 0"
            scale="0.2 0.2 0.2"
            gltf-material-fix="color: #9AD7E2;"
          ></a-entity>
          <a-entity
            gltf-model="logo_prime.glb"
            position="0 0.3 0"
            rotation="90 0 0"
            scale="0.5 0.5 0.5"
            gltf-material-fix="color: #FFF;"
          ></a-entity>
          <a-entity
            gltf-model="logo_team.glb"
            position="0 0.1 0"
            rotation="90 0 0"
            scale="0.6 0.6 0.6"
            gltf-material-fix="color: #FFF;"
          ></a-entity>
        </a-entity>}


        <a-plane
          class="clickable"
          src="#pantalla-carga"
          position={`0 0 -${DEFAULT_DISTANCE_FROM_USER - 0.1}`}
          transparent="true"
          scale="0.9 1.6 1"
          material="shader: flat"
          onClick={(e) => {
            setStarted(true);
            var audio = new Audio('musica.wav');
            audio.loop = true; // Enable looping
            audio.volume = 0.05;
            audio.play();
            var voice = new Audio('bienvenida.wav');
            voice.play();
            e.target.setAttribute("scale", "0 0 0")
          }}
        ></a-plane>


        {!showPanelist && <a-plane
          class="clickable"
          src="#panelists-button"
          position={`-${DEFAULT_DISTANCE_FROM_USER + 0.1} 0.5 0`}
          rotation="0 90 0"
          scale="1 0.75 1"
          transparent="true"
          material="shader: flat"
          scale-animator="duration: 500; easing: easeInOutCubic"
          onClick={openPanelists}
        >
          {content.panelists.map((panelist, index) => (
            <a-plane
              src={`#${panelist.id}`}
              class="clickable"
              position={`${-0.322 + (index % 3) * 0.3} -${0.8 + (Math.floor(index / 3) * 0.6)} ${0 + index * 0.01}`}
              scale="0.35 0.5 1"
              transparent="true"
              material="shader: flat"
              onClick={openPanelists}
            ></a-plane>
          ))}
          <a-plane
              src="#panelists-text"
              class="clickable"
              position="0 -1.9 0"
              scale="1 0.2 1"
              transparent="true"
              material="shader: flat"
              onClick={openPanelists}
            ></a-plane>
        </a-plane>}

        {showPanelist && <VideoGallery
          videos={content.videos}
          position={`-${DEFAULT_DISTANCE_FROM_USER} 0 0`}
          rotation="0 90 0"
          scale="1 1 1"
          closeFunction={() => setShowPanelists(false)} />}

        <VideoGallery
          videos={[{ src: "#video", autoplay: false }]}
          position={`${DEFAULT_DISTANCE_FROM_USER} 0 0`}
          rotation="0 -90 0"
          scale="1 1 1" />

        {!showCharacteristics && <a-plane
          class="clickable"
          src="#characteristics-button"
          position={`0 -0.25 ${DEFAULT_DISTANCE_FROM_USER + 0.1}`}
          rotation="0 180 0"
          scale="1 0.7 1"
          transparent="true"
          material="shader: flat"
          onClick={openCharacteristics}
          scale-animator="duration: 500; easing: easeInOutCubic"
        >
          <a-plane
            src="#characteristics-1"
            class="clickable"
            position="-0.4 0.8 0"
            scale="0.2 0.5 1"
            transparent="true"
            material="shader: flat"
            onClick={openCharacteristics}
          ></a-plane>
          <a-plane
            src="#characteristics-2"
            class="clickable"
            position="-0.1325 0.8 0"
            scale="0.2 0.5 1"
            transparent="true"
            material="shader: flat"
            onClick={openCharacteristics}
          ></a-plane>
          <a-plane
            src="#characteristics-3"
            class="clickable"
            position="0.1325 0.8 0"
            scale="0.2 0.5 1"
            transparent="true"
            material="shader: flat"
            onClick={openCharacteristics}
          ></a-plane>
          <a-plane
            src="#characteristics-4"
            class="clickable"
            position="0.4 0.8 0"
            scale="0.2 0.5 1"
            transparent="true"
            material="shader: flat"
            onClick={openCharacteristics}
          ></a-plane>
        </a-plane>}

        {showCharacteristics && <ImageGallery
          id='gallery-1'
          images={content.images.map(image => `#${image.id}`)}
          position={`0 0 ${DEFAULT_DISTANCE_FROM_USER}`}
          rotation="0 180 0"
          closeFunction={() => setShowCharacteristics(false)}
        />}
      </a-scene>
    </>
  );
}
