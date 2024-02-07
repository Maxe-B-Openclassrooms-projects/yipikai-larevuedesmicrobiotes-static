import Components from './../components/Components';
import MiscEvent from "../misc/Event";

class Page {

  constructor() {
    Debug.log("Page - Constructor");
    this.dom  = null;
    this.reloadElements = null;

    MiscEvent.addListener("page:init", (data) => {
      Config.clean();
      this.setDom(document).init();
    });

    MiscEvent.addListener("page:init:start", () => {
    });

    MiscEvent.addListener("page:init:end", () => {
    });

    MiscEvent.addListener("page:load", () => {
    });

    MiscEvent.addListener("page:unload", () => {
    });
  }

  setDom(dom) {
    this.dom = dom;
    this.reloadElements = dom.body.dataset.reloadElements ? JSON.parse(dom.body.dataset.reloadElements) : {};
    return this;
  }

  init() {
    MiscEvent.dispatch("page:init:start");
    Debug.log("Page - Init - Start");
    Components.loadComponent();
    Config.getLazyLoading().refresh();
    Debug.log("Page - Init - End");
    MiscEvent.dispatch("page:init:end");
  }

}
export const page = new Page();