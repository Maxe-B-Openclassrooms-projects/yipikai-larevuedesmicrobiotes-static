import MiscEvent from "./Event";

export default class MiscAccessibility {

  static getEnabledElementsSelector () {
    return ['a[href]', 'link[href]', 'button', 'textarea', 'input:not([type="hidden"])', 'select', 'object', 'area'].map(selector => selector + ':not([disabled])');
  }

  static getProtectedElementsSelector () {
    return ['i', 'sup', 'svg', 'hr'];
  }

  // Fonction qui détermine si un élément est affiché dans le DOM (display != none)
  static isDisplayed(element) {
    if (!element) {
      return false;
    }
    return !(window.getComputedStyle(element).display === "none");
  }

  static initDom() {
    document.querySelectorAll("*[aria-hidden=\"true\"]").forEach((element) => {
      MiscAccessibility.removeFocusElement(element);
    });
  }

  static addFocusElement(element) {
    element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector()).forEach((subElement) => {
      if (subElement.hasAttribute('tabindex')) {
        subElement.setAttribute('data-bkp-tabindex', subElement.getAttribute('tabindex'));
      } else {
        subElement.setAttribute('data-bkp-tabindex', '');
      }
      subElement.removeAttribute('tabindex', '');
    });
  }

  static removeFocusElement(element) {
    element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector()).forEach((subElement) => {
      if (subElement.hasAttribute('tabindex')) {
        subElement.setAttribute('data-bkp-tabindex', subElement.getAttribute('tabindex'));
      } else {
        subElement.setAttribute('data-bkp-tabindex', '');
      }
      subElement.setAttribute('tabindex', '-1');
    });
  }

  // Fonction qui va forcer le focus à faire une boucle sur un élément
  // en ajoutant deux inputs 'hidden' qui peuvent être focus, au début
  // et à la fin
  static addFocusLoop (element, autoFocus = true) {

    MiscAccessibility.removeFocusLoop();

    if (!element) {
      return;
    }

    const focusableElements = element.querySelectorAll(MiscAccessibility.getEnabledElementsSelector());
    if (!focusableElements.length) {
      return;
    }

    // Add class to first and last focusable elements
    // For loops to make sure the first and last focusable elements are displayed
    for (let indexElem in Array.prototype.slice.call(focusableElements)) {
      let itElem = Array.prototype.slice.call(focusableElements)[indexElem];
      if (MiscAccessibility.isDisplayed(itElem)) {
        itElem.classList.add('loop-firstFocus');
        break;
      }
    }
    // Starting from the end
    for (let indexElem in Array.prototype.slice.call(focusableElements).reverse()) {
      let itElem = Array.prototype.slice.call(focusableElements).reverse()[indexElem];
      if (MiscAccessibility.isDisplayed(itElem)) {
        itElem.classList.add('loop-lastFocus');
        break;
      }
    }

    // Create first hidden focus element
    const fakeFirstElement = document.createElement('span');
    fakeFirstElement.classList.add('loop-focusHidden');
    fakeFirstElement.setAttribute('tabindex', '0');
    element.prepend(fakeFirstElement);

    // Create last hidden focus element
    const fakeLastElement = document.createElement('span');
    fakeLastElement.classList.add('loop-focusHidden');
    fakeLastElement.setAttribute('tabindex', '0');
    element.appendChild(fakeLastElement);

    // Add events
    MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.loop-lastFocus'), fakeFirstElement);
    MiscEvent.addListener('focus', MiscAccessibility.setFocus.bind(this, null, '.loop-firstFocus'), fakeLastElement);
    if(autoFocus) {
      window.setTimeout(()=>{
        MiscAccessibility.setFocus(null, ".loop-firstFocus");
      }, 100);
    }
  }

  // Delete loop elements
  static removeFocusLoop () {
    document
      .querySelectorAll('.loop-focusHidden')
      .forEach((element) => {
        element.remove();
      })

    const firstFocusableElement = document.querySelector('.loop-firstFocus');
    if (firstFocusableElement) {
      firstFocusableElement.classList.remove('loop-firstFocus');
    }

    const lastFocusableElement = document.querySelector('.loop-lastFocus');
    if (lastFocusableElement) {
      lastFocusableElement.classList.remove('loop-lastFocus');
    }
  }

  static setFocus (element, selector) {
    if (!element && selector) {
      element = document.querySelector(selector);
    }
    if (element !== undefined && element.innerHTML !== undefined ) {
      if(element.getAttribute('tabindex') !== null && element.getAttribute('tabindex') !== "") {
        element.setAttribute('data-old-tabindex', element.getAttribute('tabindex'));
      }
      element.focus();
      MiscEvent.addListener('blur', MiscAccessibility.restoreFocus, element);
    }
  }

  static restoreFocus (evt) {
    const element = evt.currentTarget;
    const oldTabindex = element.getAttribute('data-bkp-tabindex');
    if (oldTabindex === null) {
      return;
    }
    if(element.classList.contains("back-to-top-focus"))
    {
      element.remove();
      return;
    }

    if (
      oldTabindex === '' ||
      oldTabindex === 'null'
    ) {
      element.removeAttribute('tabindex');
    } else {
      element.setAttribute('tabindex', oldTabindex);
    }
    element.removeAttribute('data-bkp-tabindex');
    MiscEvent.removeListener('blur', MiscAccessibility.restoreFocus, element);
  }

  static getIndex (node) {
    var parent=node.parentElement||node.parentNode, i=-1, child;
    while (parent && (child=parent.childNodes[++i])) if (child===node) return i;
    return -1;
  }

  static getPath (node) {
    var parent, path=[], index=MiscAccessibility.getIndex(node);
    (parent=node.parentElement||node.parentNode) && (path=MiscAccessibility.getPath(parent));
    index > -1 && path.push(index);
    return path;
  }

  static getNode (path) {
    var node=document.documentElement, i=0, index;
    while ((index=path[++i]) > -1) node= node ? node.childNodes[index] : null;
    return node;
  }


}