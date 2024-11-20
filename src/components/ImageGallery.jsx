import React, { useState } from 'react';
import 'aframe';

const ImageGallery = ({ id, images, position, rotation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    // Hide the gallery or add custom logic
  };

  return (
    <>
      {currentIndex !== null && (
        <a-entity key={currentIndex} position={position} rotation={rotation}>
          {/* Image Display */}
          <a-plane
            src={images[currentIndex]}
            position="0 0 0"
            rotation="0 0 0"
            scale="1 1 1"
            scale-animator="duration: 500; easing: easeInOutCubic"
          ></a-plane>

          {/* Navigation Buttons */}
          {images.length > 1 && <a-entity position="0 -0.7 0">
            {/* Image Indicator Dots */}
            <a-entity position="0 0.15 0">
              {images.map((_, index) => (
                <a-circle
                  key={index}
                  position={`${index * 0.1 - ((images.length - 1) * 0.1) / 2} 0 0`}
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
            >
              <a-text value="X" align="center" color="white" position="0 0 0.01" scale="0.5 0.5 0.5"></a-text>
            </a-plane>
          </a-entity>}
        </a-entity>
      )}
    </>
  );
};

export default ImageGallery;
