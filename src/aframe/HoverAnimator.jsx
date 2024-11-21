import 'aframe';

AFRAME.registerComponent('hover-animator', {
  schema: {
    duration: { type: 'number', default: 1000 }, // Duration in milliseconds
    easing: { type: 'string', default: 'linear' } // Easing type
  },

  init: function () {
    const el = this.el;

    // Wait until the entity is fully loaded
    el.addEventListener('loaded', () => {
      // Fetch the original scale after the entity is fully loaded
      const originalPosition = el.getAttribute('position') || { x: 1, y: 1, z: 1 };

      // Animate the scale from 0 to the original scale
      el.setAttribute('animation', {
        property: 'position',
        from: `${originalPosition.x} ${originalPosition.y} ${originalPosition.z}`,
        to: `${originalPosition.x} ${originalPosition.y + 0.05} ${originalPosition.z}`, // Convert to string
        dur: this.data.duration,
        easing: this.data.easing,
        loop: true,
        dir: "alternate",
      });
    });
  }
});
