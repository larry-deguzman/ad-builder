/**
 * Detect Object
 */
export default {
  mouse: {
    coordinates: (event) => {
      const position = {};
      // if (!e) var e = window.event;
      if (event.type.indexOf("touch") !== -1) {
        const touch =
          event.originalEvent.touches[0] ||
          event.originalEvent.changedTouches[0];
        position.x = touch.pageX;
        position.y = touch.pageY;
      } else {
        if (event.pageX || event.pageY) {
          position.x = event.pageX;
          position.y = event.pageY;
        } else if (event.clientX || event.clientY) {
          position.x =
            event.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          position.y =
            event.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
      }
      return position;
    },
  },
};
