import 'aframe';

AFRAME.registerComponent('actionable', {
    schema: {
      action: { type: 'string' } // We'll store the function name as a string
    },
  
    init: function () {
      const el = this.el; // The element the component is attached to

      el.setAttribute('class', 'clickable')
  
      el.addEventListener('click', () => {
        // Resolve the function passed as a string to the schema
        if (typeof window[this.data.action] === 'function') {
          window[this.data.action]();
        } else {
          console.warn(`Action "${this.data.action}" is not a valid function.`);
        }
      });
    }
  });
  