import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "./ml";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faUndo,
  faCheck,
  faArrowAltCircleLeft,
  faFileCsv,
  faFilePdf,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import VueParticles from "vue-particles";

library.add(
  faCoffee,
  faUndo,
  faCheck,
  faArrowAltCircleLeft,
  faFileCsv,
  faFilePdf,
  faPhone
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VueParticles);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

("use strict");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
