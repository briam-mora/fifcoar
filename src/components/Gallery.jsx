import React, { useState } from 'react';
import '../aframe/ScaleAnimator.jsx';
import '../aframe/Actionable.jsx';
import 'aframe';

const Gallery = ({ id, images, position, rotation }) => {
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

  // Expose functions dynamically for A-Frame compatibility
  React.useEffect(() => {
    // Dynamically assign functions to `window` with a unique ID
    window[`handleNext_${id}`] = handleNext;
    window[`handlePrev_${id}`] = handlePrev;
    window[`handleClose_${id}`] = handleClose;

    // Cleanup when component unmounts
    return () => {
      delete window[`handleNext_${id}`];
      delete window[`handlePrev_${id}`];
      delete window[`handleClose_${id}`];
    };
  }, [id, handleNext, handlePrev, handleClose]);

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
          <a-entity position="0 -0.7 0">
            {/* Previous Button */}
            <a-plane
              color="lightgreen"
              position="-0.2 0 0"
              width="0.2"
              height="0.2"
              actionable={`action: handlePrev_${id}`}
            >
              <a-text value="<" align="center" color="black" position="0 0 0.01"></a-text>
            </a-plane>

            {/* Next Button */}
            <a-plane
              color="lightgreen"
              position="0.2 0 0"
              width="0.2"
              height="0.2"
              actionable={`action: handleNext_${id}`}
            >
              <a-text value=">" align="center" color="black" position="0 0 0.01"></a-text>
            </a-plane>

            {/* Close Button */}
            <a-plane
              color="red"
              position="0 0 0"
              width="0.1"
              height="0.1"
              actionable={`action: handleClose_${id}`}
            >
              <a-text value="X" align="center" color="white" position="0 0 0.01" scale="0.5 0.5 0.5"></a-text>
            </a-plane>
          </a-entity>

          {/* Image Indicator Dots */}
          <a-entity position="0 -0.55 0">
            {images.map((_, index) => (
              <a-circle
                key={index}
                position={`${index * 0.1 - ((images.length - 1) * 0.1) / 2} 0 0`}
                radius="0.02"
                color={index === currentIndex ? 'blue' : 'gray'}
              ></a-circle>
            ))}
          </a-entity>
        </a-entity>
      )}
    </>
  );
};

export default Gallery;
