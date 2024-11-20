import React, { useEffect, useRef } from 'react';
import 'aframe';

const VideoCard = ({ src, title, position, rotation, scale }) => {
  const videoRef = useRef(null); // Reference to the video element

  // Toggle video playback on click
  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  useEffect(() => {
    // Ensure the video is loaded and set up
    const videoElement = document.querySelector(src);
    if (videoElement) {
      videoRef.current = videoElement;
    }
  }, [src]);

  return (
    <a-entity
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleVideoClick}
    >
      {/* Title above the video */}
      <a-text
        value={title}
        align="center"
        position="0 9 0.1"
        width="16"
        color="white"
        scale-animator="duration: 500; easing: easeInOutCubic"
      ></a-text>

      {/* Video */}
      <a-video
        class="clickable"
        src={src}
        width="9"
        height="16"
        position="0 0 0"
        scale-animator="duration: 500; easing: easeInOutCubic"
      ></a-video>
    </a-entity>
  );
};

export default VideoCard;
