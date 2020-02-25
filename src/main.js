import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import { SWAPI_ROOT } from "@/utils/CONSTANTS";
import { starWarsAPI } from "@/services/api.service";
import HTTPService from "@/services/http.service";
import { AsyncError, tryCatch } from "@/utils/helpers";

Vue.config.productionTip = false;

Vue.config.errorHandler = function(err, vm, info) {
  console.log("errorHandler err ", err);
  console.log("errorHandler vm ", vm);
  console.log("errorHandler info ", info);
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
};

// Vue.config.warnHandler = function(msg, vm, trace) {
//   // `trace` is the component hierarchy trace
//   /**
//    * throw or reconcile errors here
//    */
//   console.error("warnHandler err ", msg);
//   console.error("warnHandler vm ", vm);
//   console.error("warnHandler trace ", trace);
// };

// window.onerror = function(message, source, lineno, colno, error) { ... }
// window.addEventListener("unhandledrejection", function(evt) { /*Your code*/ })

/**
 * $SWAPI will be available throughout app
 * wihtout requiring import into each component
 * Very handy for static resources and assets
 */
Vue.prototype.$SWAPI = starWarsAPI(
  /**
   * SWAPI_ROOT is the root endpoint to SWAPI and will be used to build an API
   */
  SWAPI_ROOT,
  /**
   *
   */
  HTTPService(axios, tryCatch(AsyncError))
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
