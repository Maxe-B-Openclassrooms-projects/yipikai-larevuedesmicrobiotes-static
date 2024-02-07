import MiscAccessibility from "../misc/Accessibility";

class Config {

  constructor() {
    this.components = {};
    this.page = null;
    this.lazyLoading = null;
    this.scrollAnimate = null;
    this.userId = null;
    this.currentFocus = null;
    this.currentFocusPath = null;
  }

  /**
   *
   * @param element
   * @returns {Config}
   */
  setCurrentFocus(element) {
    this.currentFocus = element;
    this.currentFocusPath = element ? MiscAccessibility.getPath(element) : null;
    return this;
  }

  getCurrentFocus() {
    return this.currentFocus;
  }

  getCurrentFocusPath() {
    return this.currentFocusPath;
  }

  /**
   * @returns {*|{}}
   */
  getComponents() {
    return this.components;
  }

  /**
   *
   * @param {string} type
   * @param {string} defaultValue
   * @returns {null|*}
   */
  getComponentsByType(type, defaultValue = null) {
    if(this.hasComponent(type)) {
      return this.components[type];
    }
    return defaultValue;
  }

  getUserId() {
    if(!this.userId) {
      this.userId = document.querySelector("body").dataset.userId;
    }
    return this.userId;
  }

  /**
   * @param {Page} page
   * @returns {Config}
   */
  setPage(page) {
    this.page = page;
  }

  /**
   * @returns {Page|null}
   */
  getPage() {
    return this.page;
  }

  /**
   * @param {LazyLoading} lazyLoading
   * @returns {Config}
   */
  setLazyLoading(lazyLoading) {
    this.lazyLoading = lazyLoading;
  }

  /**
   * @returns {LazyLoading|null}
   */
  getLazyLoading() {
    return this.lazyLoading;
  }

  /**
   * @param {Animate} scrollAnimate
   * @returns {Config}
   */
  setScrollAnimate(scrollAnimate) {
    this.scrollAnimate = scrollAnimate;
  }

  /**
   * @returns {Animate|null}
   */
  getScrollAnimate() {
    return this.scrollAnimate;
  }

  /**
   *
   * @param {string} type
   * @param {string} key
   * @param value
   * @returns {Config}
   */
  addComponent(type, key, value) {
    if(!this.hasComponent(type)) {
      this.components[type] = {};
    }
    this.components[type][key] = value;
    return this;
  }

  /**
   *
   * @param {string} type
   * @param {string} key
   * @returns {boolean}
   */
  hasComponent(type, key = null) {
    var returnValue = type in this.components;
    if(key !== null && returnValue === true) {
      return key in this.components[type];
    }
    return returnValue;
  }

  /**
   *
   * @param {string} type
   * @param {string} key
   * @param defaultValue
   * @returns {null|*}
   */
  getComponent(type, key, defaultValue = null) {
    if(this.hasComponent(type, key)) {
      return this.components[type][key];
    }
    return defaultValue;
  }

  /**
   *
   * @param type
   * @param element
   * @param defaultValue
   * @returns {*|null}
   */
  getComponentByElement(type, element, defaultValue = null)
  {
    return element !== undefined ? this.getComponent(type, element.getAttribute("data-component-"+type+"-uuid"), defaultValue) : defaultValue;
  }

  /**
   *
   * @param {string} type
   * @param {string} key
   * @returns {Config}
   */
  removeComponent(type, key = null){
    if(this.hasComponent(type, key)) {
      if(key !== null) {
        if(typeof this.components[type][key].delete === "function") {
          this.components[type][key].delete();
        }
        delete this.components[type][key];
      }
      else {
        delete this.components[type];
      }
    }
    return this;
  }

  /**
   * @returns {Config}
   */
  clean() {
    Debug.log("Config - Clean - Start");
    for(const[type, components] of Object.entries(this.getComponents())) {
      for(const[key, component] of Object.entries(components)) {
        if(document.body.querySelector('*[data-component-'+type+'-uuid="'+key+'"]') === null) {
          this.removeComponent(type, key);
        }
      }
    }
    Debug.log("Config - Clean - Stop");
    return this;
  }

  /**
   * @returns {Config}
   */
  reinit(container) {
    Debug.log("Config - Reinit - Start");
    for(const[type, components] of Object.entries(this.getComponents())) {
      for(const[key, component] of Object.entries(components)) {
        let element = container.querySelector('*[data-component-'+type+'-uuid="'+key+'"]');
        if(element) {
          element.removeAttribute("data-component-"+type+"-uuid");
          this.removeComponent(type, key);
        }
      }
    }
    Debug.log("Config - Reinit - Stop");
    return this;
  }

  dispatchAllComponents(eventName, data, debug = true, componentType = null) {
    if(debug) {
      Debug.log("Config - Dispatch All Components - Start :"+eventName);
    }
    for(const[type, components] of Object.entries(this.getComponents())) {
      if(componentType === null || componentType === type)
      {
        for(const[key, component] of Object.entries(components)) {
          if(component.hasOwnProperty("element"))
          {
            MiscEvent.dispatch(eventName, data, component.element);
          }
        }
      }
    }
    if(debug) {
      Debug.log("Config - Dispatch All Components - Stop : "+eventName);
    }
    return this;
  }

}

/**
 * @returns {Config}
 */
export default new Config();