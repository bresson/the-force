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
