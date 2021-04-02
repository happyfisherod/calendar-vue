import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";
import DataTable from "@andresouzaabreu/vue-data-table";
import "@andresouzaabreu/vue-data-table/dist/DataTable.css";
import "vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css";
import VueCollapse from "vue2-collapse";
import service from "@/services/service.js";
require("@/store/subscriber");

store.dispatch("auth/attempt", localStorage.getItem("token"));

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.data);

    if (error.response.status === 401) {
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

Vue.use(VModal);
Vue.use(VueCollapse);
Vue.use(Vuelidate);
Vue.component("data-table", DataTable);

window.datepickerOptions = function () {
  var obj = {
    days: [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    daysShort: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  };
  return obj;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.validateFocusElement = function () {
  var elm = document.querySelector(
    ".form-group--error input,.form-group--error textarea,.form-group--error select"
  );
  if (elm) {
    elm.focus();
  }
};
