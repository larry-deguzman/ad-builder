export default class Remove {
  static child(passedElement) {
    let element = passedElement;
    /* istanbul ignore else */
    if (element) {
      element = element.div ? element.div : element;
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }
  static children(passedElement, removeSelf = false) {
    let element = passedElement;
    /* istanbul ignore else */
    if (element) {
      element = element.div ? element.div : element;
      while (element.firstChild) {
        Remove.children(element.firstChild, true);
      }
      if (removeSelf) {
        Remove.child(element);
      }
    }
  }
}
