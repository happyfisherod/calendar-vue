<template>
  <div class="overflow-div">
    <div class="wrap-modal">
      <div class="modal__calendar">
        <p>Selecciona las fechas que quieras ajustar en tu calendario</p>
        <div class="modal__dates mb-20">
          <label class="bold label-form">Fechas *</label>
          <Calendar id="activities_modal" :from="fechaDesde" :to="fechaHasta" />
        </div>
        <div class="modal__days">
          <p>¿A qué días de la semana desea aplicar los cambios?</p>
          <div class="mb-15 fwp">
            <div
              class="checkbox-custom wd-130"
              v-for="(calendarDay, index) in calendarDays"
              :key="index"
            >
              <input
                type="checkbox"
                :id="`checkbox_calendar_${calendarDay.nombre}`"
                :value="calendarDay.nombre"
              />
              <label :for="`checkbox_calendar_${calendarDay.nombre}`">{{
                calendarDay.nombre
              }}</label>
            </div>
          </div>
        </div>
        <div class="modal__options mb-15">
          <label class="bold label-form">Opciones*</label>
          <select class="form-control"></select>
        </div>

        <v-collapse-wrapper v-on:onStatusChange="activeCollapse">
          <div v-collapse-toggle>
            <h3 class="accordion__title">Estado de la actividad</h3>
            <p>Abre o cierra esta actividad</p>
          </div>
          <div class="accordion__content" v-collapse-content>
            <form @submit.prevent="updateState()" class="p-20">
              <div class="radio-group">
                <label class="radio">
                  <input
                    type="radio"
                    name="radioState"
                    value="1"
                  />Disponible<span></span>
                </label>
              </div>
              <div class="radio-group">
                <label class="radio">
                  <input type="radio" name="radioState" value="0" />No
                  disponible<span></span>
                </label>
              </div>
              <div class="help-block mt-10" v-if="fechaDesde && fechaHasta">
                Los cambios serán realizados entre el
                <span>{{ formatDate(fechaDesde) }}</span> y el
                <span>{{ formatDate(fechaHasta) }}</span>
              </div>
              <div class="mt-15">
                <button type="submit" class="btn btn-save btn--blue mr-10">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </v-collapse-wrapper>

        <v-collapse-wrapper v-on:onStatusChange="activeCollapse">
          <div v-collapse-toggle>
            <h3 class="accordion__title">Cupos disponibles</h3>
            <p>Actualiza la cantidad de cupos de la opcion a la venta</p>
          </div>
          <div class="accordion__content" v-collapse-content>
            <form @submit.prevent="updateQuotas()" class="p-20">
              <div class="fwp">
                <input class="form-control form-input-addon" />
                <div class="input-addon">
                  <span class="bold">Cupo(s)</span>
                </div>
              </div>
              <div class="help-block mt-10" v-if="fechaDesde && fechaHasta">
                Los cambios serán realizados entre el
                <span>{{ formatDate(fechaDesde) }}</span> y el
                <span>{{ formatDate(fechaHasta) }}</span>
              </div>
              <div class="mt-15">
                <button type="submit" class="btn btn-save btn--blue mr-10">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </v-collapse-wrapper>

        <v-collapse-wrapper v-on:onStatusChange="activeCollapse">
          <div v-collapse-toggle>
            <h3 class="accordion__title">Precios</h3>
            <p>
              Cambia los precios de planes de tarifa según el número de adultos
              que viajen
            </p>
          </div>
          <div class="accordion__content" v-collapse-content>
            <form @submit.prevent="updatePrices()" class="p-20">
              <p>
                Puedes establecer un descuento fijo por persona o un % de
                descuento
              </p>
              <div class="rate-box">
                <div class="form-group mr-20">
                  <div class="checkbox-custom">
                    <input type="checkbox" :id="`checkbox_rate_`" />
                    <label :for="`checkbox_rate_`">Desayuno</label>
                  </div>
                </div>
                <div class="table-div">
                  <table class="ocup__table">
                    <thead>
                      <tr>
                        <th class="ocup__header">Ocupacion</th>
                        <th class="ocup__header">Detalle</th>
                      </tr>
                    </thead>
                    <tbody class="ocup__body">
                      <tr>
                        <td class="ocup__cell">3 adulto(s)</td>
                        <td class="ocup__cell">
                          <div class="fwp">
                            <div class="form-group mr-10">
                              <label class="bold label-form">Moneda</label>
                              <select class="form-control">
                                <option
                                  v-for="(typeMoney, index) in typesMoney"
                                  :key="index"
                                  :value="typeMoney"
                                >
                                  {{ typeMoney }}
                                </option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label class="bold label-form">Precio Base</label>
                              <input class="form-control wd-100" />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="ocup__cell">2 adulto(s)</td>
                        <td class="ocup__cell" data-heading="Price">
                          <div class="form__group">
                            <div class="ocup__label">
                              Precio con un aumento/reducción de
                            </div>
                            <div class="fwp">
                              <div class="mr-10 mb-10">
                                <select class="form-control">
                                  <option value="porcentaje">%</option>
                                  <option value="fijo" selected="">fijo</option>
                                </select>
                              </div>
                              <div class="fwp mr-10 mb-10">
                                <div class="numbutton">
                                  <span class="numbutton__text mr-5">+</span>
                                  <span class="numbutton__text">-</span>
                                </div>
                              </div>
                              <div class="wd-100 mr-5 mb-10">
                                <input class="form-control" />
                              </div>
                              <div>
                                <input class="form-control wd-100" />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="ocup__cell">1 adulto(s)</td>
                        <td class="ocup__cell" data-heading="Price">
                          <div class="form__group">
                            <div class="ocup__label">
                              Precio con un aumento/reducción de
                            </div>
                            <div class="fwp">
                              <div class="mr-10 mb-10">
                                <select class="form-control">
                                  <option value="porcentaje">%</option>
                                  <option value="fijo" selected="">fijo</option>
                                </select>
                              </div>
                              <div class="fwp mr-10 mb-10">
                                <div class="numbutton">
                                  <span class="numbutton__text mr-5">+</span>
                                  <span class="numbutton__text">-</span>
                                </div>
                              </div>
                              <div class="wd-100 mr-5 mb-10">
                                <input class="form-control" />
                              </div>
                              <div>
                                <input class="form-control wd-100" />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="help-block mt-10" v-if="fechaDesde && fechaHasta">
                Los cambios serán realizados entre el
                <span>{{ formatDate(fechaDesde) }}</span> y el
                <span>{{ formatDate(fechaHasta) }}</span>
              </div>
              <div class="mt-15">
                <button type="submit" class="btn btn-save btn--blue mr-10">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </v-collapse-wrapper>

        <v-collapse-wrapper v-on:onStatusChange="activeCollapse">
          <div v-collapse-toggle>
            <h3 class="accordion__title">Restricciones</h3>
            <p>
              Edita, añade o elimina restricciones de cualquier plan de tarifas
              para esta actividad
            </p>
          </div>
          <div class="accordion__content" v-collapse-content>
            <form @submit.prevent="updateRestrictions()" class="p-20">
              <div id="restrictions_reserv">
                <div class="checkbox-custom mb-15">
                  <input type="checkbox" :id="`checkbox_rate_`" />
                  <label :for="`checkbox_rate_`"
                    >Antelación mínima de la reserva</label
                  >
                </div>
                <div class="form-group">
                  <label class="bold label-form">Planes de tarifa</label>
                  <select multiple="true" id="myMulti">
                    <option>Desayuno,Cena</option>
                    <option>Desayuno</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="bold label-form">Numero de días</label>
                  <input class="form-control wd-100" placeholder="ej: 5" />
                </div>
              </div>
              <div
                class="help-block mt-10 mb-15"
                v-if="fechaDesde && fechaHasta"
              >
                Los cambios serán realizados entre el
                <span>{{ formatDate(fechaDesde) }}</span> y el
                <span>{{ formatDate(fechaHasta) }}</span>
              </div>
              <button type="submit" class="btn btn-save btn--blue mr-10">
                Guardar
              </button>
            </form>
          </div>
        </v-collapse-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/services/service.js";
import Calendar from "@/components/Calendar";
import { EventBus } from "@/bus";
import format from "date-fns/format";

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      typesMoney: [],
      calendarDays: [
        { nombre: "Lunes" },
        { nombre: "Martes" },
        { nombre: "Miercoles" },
        { nombre: "Jueves" },
        { nombre: "Viernes" },
        { nombre: "Sabado" },
        { nombre: "Domingo" },
      ],
      fechaDesde: null,
      fechaHasta: null,
    };
  },
  created() {
    var ths = this;
    EventBus.$on("date-from", (data) => {
      ths.fechaDesde = data;
    });
    EventBus.$on("date-to", (data) => {
      ths.fechaHasta = data;
    });
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    async getData() {
      const response = await service.get(`services-options/types-money`);
      this.typesMoney = response.data;
    },
    activeCollapse: function (e) {
      if (true == e.status) {
        return (e.vm.nodes.toggle.className =
          "accordion__title v-collapse-toggler active_collapse");
      } else {
        return (e.vm.nodes.toggle.className =
          "accordion__title v-collapse-toggler");
      }
    },
    formatDate(date) {
      var rdate = "";
      if (date) {
        rdate =
          format(date, "D") +
          " de " +
          " " +
          format(date, "MMMM").toLowerCase() +
          " de " +
          format(date, "YYYY");
      }
      return rdate;
    },
    updateState() {
      alert("State Update");
    },
    updateQuotas() {
      alert("Quotas Update");
    },
    updatePrices() {
      alert("Prices Update");
    },
    updateRestrictions() {
      alert("Restrictions Update");
    },
  },
};
</script>


<style scoped>
.form-input-addon {
  border-radius: 4px 0px 0px 4px;
  border-right: 0;
  padding: 4px 5px 4px 10px;
  width: 100px;
}
.input-addon {
  border-radius: 0px 4px 4px 0px;
  border-right: 0;
  border: 1px solid #ccc;
  padding: 4px;
  background: #ededed;
}
.accordion__rate {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
.ocup__table {
  border-collapse: collapse;
}
.ocup__table th {
  padding: 0.8rem;
}
.ocup__header {
  text-align: center;
}
.ocup__body tr:first-child {
  background-color: #f7f7f7;
}
.ocup__table th,
.ocup__table td {
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
.ocup__label {
  margin-bottom: 5px;
}
.p-20 {
  padding: 20px;
}
.rate-box {
  padding: 15px 10px 5px 0px;
  border-bottom: solid 1px var(--color-background-light);
}
.numbutton__text {
  background: var(--color-light);
  color: var(--color-primary);
  width: 25px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  box-sizing: initial;
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  font-size: 18px;
}
.numbutton__text:hover {
  background: var(--color-light);
  color: var(--color-primary);
  border-color: var(--color-primary-hover);
}
.numbutton {
  align-self: center;
}
</style>

