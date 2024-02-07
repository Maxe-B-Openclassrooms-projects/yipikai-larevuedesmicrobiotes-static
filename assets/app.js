
console.groupCollapsed("Site Credits");
console.log("Branding & Art Direction by Yipikai");
console.log("Web Design by Yipikai");
console.log("Web Development by Yipikai https://yipikai.studio");
console.groupEnd();

import './styles/app.scss';
import Config from "./javascript/config/Config";
import { page } from "./javascript/page/Page";
import { lazyLoading } from "./javascript/lazy-loading/LazyLoading";
import MiscEvent from "./javascript/misc/Event";


Config.setPage(page);
Config.setLazyLoading(lazyLoading);

MiscEvent.addListener("DOMContentLoaded", () => {
  MiscEvent.dispatch("page:init");
});

