import { v4 as uuidv4 } from "uuid";

export default class abstractComponent {

  static initComponent(componentName, callback = null) {
    Debug.log("-- Component Initialise : "+componentName);
    [].forEach.call(document.querySelectorAll("*[data-"+componentName+"]"), (el) => {
      if(el.getAttribute("data-component-"+componentName+"-uuid") === undefined || el.getAttribute("data-component-"+componentName+"-uuid") === null)
      {
        let object = new this(el, componentName, callback);
      }
    });
  }

  constructor (el, componentName, callback = null) {
    Debug.log("-- Component Constructor : " + componentName);
    this.uuid = uuidv4();
    this.componentName = componentName;
    this.element = el;
    try {
      if(!this.element.hasAttribute("data-component-"+componentName+"-uuid")) {
        this.element.setAttribute("data-component-"+componentName+"-uuid", this.uuid);
        Config.addComponent(componentName, this.uuid, this);
      }
      this.create(el);
      if(typeof callback === "function") {
        callback(this.element);
      }
      this.addEventListener();
    } catch (e) {
      Debug.log(e);
    }
  }

  addEventListener() {

  }

  getComponent(uuid) {
    return Config.getComponent(this.componentName, uuid);
  }

  create () {
    // abstract function
  }

}