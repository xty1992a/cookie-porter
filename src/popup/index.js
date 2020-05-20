import Vue from "vue";
import App from "./App.vue";
import * as utils from "./utils";
import "./index.css";
import Toast from "@redbuck/toast";
import "@redbuck/toast/lib/toast.css";
Vue.prototype.$utils = utils;
Vue.prototype.$toast = Toast;

new Vue({ render: (h) => h(App) }).$mount("#app");
