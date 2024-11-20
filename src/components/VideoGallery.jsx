import React, { useEffect, useRef, useState } from 'react';
import 'aframe';

const VideoGallery = ({ videos, title, position, rotation, scale, closeFunction }) => {
  const videoRef = useRef(null); // Reference to the video element

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for navigation
  const handleNext = () => {
    var audio = new Audio('click.wav');
    audio.play();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    var audio = new Audio('click.wav');
    audio.play();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const handleClose = () => {
    closeFunction();
  };

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
    const videoElement = document.querySelector(videos[currentIndex]);
    if (videoElement) {
      videoRef.current = videoElement;
      videoElement.currentTime = 0;
      videoElement.play();
    }
  }, [currentIndex]);

  return (
    currentIndex !== null && <a-entity
      key={currentIndex}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Title above the video */}
      <a-text
        value={title}
        align="center"
        position="0 0.8 0.1"
        width="2"
        color="white"
        scale-animator="duration: 500; easing: easeInOutCubic"
      ></a-text>

      {/* Video */}
      <a-video
        class="clickable"
        src={videos[currentIndex]}
        width="9"
        height="16"
        position="0 0 0"
        scale-animator="duration: 500; easing: easeInOutCubic"
        onClick={handleVideoClick}
        scale="0.1 0.1 0.1"
      ></a-video>

      {/* Navigation Buttons */}
      {videos.length > 1 && <a-entity position="0 -1 0">
        {/* Image Indicator Dots */}
        <a-entity position="0 0.15 0">
          {videos.map((_, index) => (
            <a-circle
              key={index}
              position={`${index * 0.1 - ((videos.length - 1) * 0.1) / 2} 0 0`}
              radius="0.02"
              color={index === currentIndex ? 'blue' : 'gray'}
            ></a-circle>
          ))}
        </a-entity>
        {/* Previous Button */}
        <a-plane
          color="lightgreen"
          class="clickable"
          position="-0.2 0 0"
          width="0.2"
          height="0.2"
          onClick={handlePrev}
          scale-animator="duration: 500; easing: easeInOutCubic"
        >
          <a-text value="<" align="center" color="black" position="0 0 0.01"></a-text>
        </a-plane>

        {/* Next Button */}
        <a-plane
          color="lightgreen"
          class="clickable"
          position="0.2 0 0"
          width="0.2"
          height="0.2"
          onClick={handleNext}
          scale-animator="duration: 500; easing: easeInOutCubic"
        >
          <a-text value=">" align="center" color="black" position="0 0 0.01"></a-text>
        </a-plane>

        {/* Close Button */}
        <a-plane
          color="red"
          class="clickable"
          position="0 0 0"
          width="0.1"
          height="0.1"
          onClick={handleClose}
          scale-animator="duration: 500; easing: easeInOutCubic"
        >
          <a-text value="X" align="center" color="white" position="0 0 0.01" scale="0.5 0.5 0.5"></a-text>
        </a-plane>
      </a-entity>}
    </a-entity>
  );
};

export default VideoGallery;
