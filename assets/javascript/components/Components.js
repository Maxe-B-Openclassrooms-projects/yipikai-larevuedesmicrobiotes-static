import Carrousel from "../components/carrousel/Carrousel";

export default class Components {

  static loadComponent() {
    Debug.startGroup("Component");
      Debug.startGroup("Init");
        MiscEvent.dispatch("component::load.start");
    Carrousel.initComponent();
      Debug.stopGroup();
      Debug.startGroup("Finish");
        MiscEvent.dispatch("component::load.finish");
      Debug.stopGroup();
    Debug.stopGroup();
    Debug.log(Config.getComponents());
  }

}




