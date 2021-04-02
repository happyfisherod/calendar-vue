<template>
  <div>
    <div v-if="dataReady">
      <main class="wrapper-interior">
        <div class="content-general">
          <div class="max-width" v-if="dataReady">
            <form @submit.prevent="submitForm">
              <h1 class="title-main">Calendario de tu Actividad</h1>
              <fieldset>
                <legend>Tarifas</legend>
                <p>
                  Puedes abrir y cerrar disponibilidad, modificar tarifas,
                  planes de tarifas, cupos y ver las ofertas desde un mismo
                  lugar para tu mayor comodidad
                </p>
                <div class="calendar__dates">
                  <div class="mb-15 mr-20">
                    <label class="bold label-form">Fechas *</label>
                    <Calendar id="accomodations" />
                  </div>
                  <div class="mb-15">
                    <button class="btn btn--white">Definir periodo</button>
                  </div>
                </div>
                <div class="calendar__options">
                  <div class="calendar__select mb-15 mr-20">
                    <label class="bold label-form">Opciones *</label>
                    <select
                      v-model="selectOptionsCalendar"
                      name="option"
                      class="form-control"
                    >
                      <option
                        v-for="(calendar, index) in calendars"
                        :key="index"
                        :value="calendar.id"
                      >
                        {{ calendar.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="calendar__edit mb-15">
                    <button
                      class="btn btn--blue"
                      @click="$modal.show('modal_calendar')"
                    >
                      Editar
                    </button>
                    <modal
                      name="modal_calendar"
                      width="600px"
                      height="auto"
                      :adaptive="true"
                      :scrollable="true"
                      :shiftX="1"
                      :shiftY="0.5"
                    >
                      <div class="header-modal">
                        <div class="header-modal-title">Edicion</div>
                        <button
                          class="cross"
                          @click="$modal.hide('modal_calendar')"
                          title="Cerrar"
                        >
                          X
                        </button>
                      </div>
                      <ModalCalendarAct />
                    </modal>
                  </div>
                  <div class="calendar__tips fwp">
                    <div class="calendar__tip">
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <rect rx="2" ry="2" width="14" height="14" />
                      </svg>
                      <span class="calendar__tip-text">Sin cupo/precio</span>
                    </div>
                    <div class="calendar__tip">
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <rect rx="2" ry="2" width="14" height="14" />
                      </svg>
                      <span class="calendar__tip-text">Disponible</span>
                    </div>
                    <div class="calendar__tip">
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <rect rx="2" ry="2" width="14" height="14" />
                      </svg>
                      <span class="calendar__tip-text">No disponible</span>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="table-div">
                <table class="table-calendar">
                  <thead class="header-calendar">
                    <tr>
                      <th>Fechas</th>
                      <th>Sun 20</th>
                      <th>Mon 21</th>
                      <th>Tue 22</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr id="calendar_status">
                      <td>Estado</td>
                      <td>
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <rect
                            rx="2"
                            ry="2"
                            width="14"
                            height="14"
                            class="available"
                          ></rect>
                        </svg>
                        <input type="hidden" value="1" />
                      </td>
                      <td>
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <rect
                            rx="2"
                            ry="2"
                            width="14"
                            height="14"
                            class="available"
                          ></rect>
                        </svg>
                        <input type="hidden" value="1" />
                      </td>
                      <td>
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <rect
                            rx="2"
                            ry="2"
                            width="14"
                            height="14"
                            class="no-quota"
                          ></rect>
                        </svg>
                        <input type="hidden" value="2" />
                      </td>
                    </tr>
                    <tr id="calendar_spaces">
                      <td>Cupos</td>
                      <td>5</td>
                      <td>5</td>
                      <td>5</td>
                    </tr>
                    <!--          <div v-for="(plan, index) in plans" :key="index + plans">
                      <div v-for="(plan, index) in plan.planes" :key="index">
                        <tr>
                          <td>
                            {{ plan.nombre }}
                            <svg
                              class="icon-xs"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              width="451.847px"
                              height="451.847px"
                              viewBox="0 0 451.847 451.847"
                              style="enable-background: new 0 0 451.847 451.847"
                              xml:space="preserve"
                            >
                              <g>
                                <path
                                  d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                                />
                              </g>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Price x {{ plan.numeroMax }}
                            <svg
                              class="icon-l fill-muted"
                              enable-background="new 0 0 515.556 515.556"
                              height="512"
                              viewBox="0 0 515.556 515.556"
                              width="512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m486.245 337.232c-44.199-27.886-94.804-43.186-147.101-46.048 12.091 5.66 24.059 11.637 35.408 18.798 27.345 17.228 44.337 48.428 44.337 81.405v91.947h96.667v-91.947c0-21.995-11.233-42.748-29.311-54.155z"
                              />
                              <path
                                d="m357.356 337.232c-97.957-61.801-230.103-61.801-328.029 0-18.093 11.391-29.327 32.144-29.327 54.155v91.947h386.667v-91.947c0-22.011-11.234-42.764-29.311-54.155z"
                              />
                              <path
                                d="m289.815 252.441c10.416 3.153 21.165 5.338 32.409 5.338 62.179 0 112.778-50.599 112.778-112.778s-50.599-112.779-112.778-112.779c-11.244 0-21.993 2.185-32.409 5.338 29.553 26.562 48.52 64.665 48.52 107.44s-18.966 80.878-48.52 107.441z"
                              />
                              <path
                                d="m273.081 65.254c44.043 44.043 44.043 115.449 0 159.492s-115.449 44.043-159.492 0-44.043-115.449 0-159.492 115.449-44.042 159.492 0"
                              />
                            </svg>
                          </td>
                        </tr>
                        <tr
                          v-for="(plan, index) in plan.condiciones"
                          :key="index"
                        >
                          <td :id="plan.id">
                            Precio x
                            {{ plan.ocupacion }}
                          </td>
                        </tr>
                        <tr id="calendar_min_before">
                          <td>Antelación reserva</td>
                        </tr>
                        <tr id="calendar_min_length">
                          <td>Estancia minima</td>
                        </tr>
                      </div>
                    </div> -->
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import service from "@/services/service.js";
import Calendar from "@/components/Calendar";
import ModalCalendarAct from "@/components/ModalCalendarAct";

export default {
  components: {
    Calendar,
    ModalCalendarAct,
  },
  data() {
    return {
      dataReady: false,
      selectOptionsCalendar: "",
      calendars: {},
      newOptions: [],
      links: {},
    };
  },
  beforeMount() {
    this.linksGeneration(this.$route.params.id);
    this.getData();
  },
  metaInfo: {
    title: "Calendario Actividad",
    titleTemplate: "%s - Viaja y Descubre",
  },
  methods: {
    async getData() {
      const response = await service.get(
        `rates/services-options?service_id=${this.$route.params.id}`
      );
      this.calendars = response.data;

      let newOptions = this.calendars.map((option) => {
        const container = {};
        container.optionId = option.id;
        container.nameOption = option.nombre;
        container.currency = option.moneda;
        container.maxAdults = option.maxAdultos;
        container.planes = [];
        container.calendario = [];

        //When calendar is empty you need to use this info for add in each day
        option.planes.forEach((plan) => {
          let planObj = {
            daysBefore: plan.antelacionMinima,
            minimumStay: plan.estanciaMinima,
            rateId: plan.id,
            rateName: plan.nombre,
            ratePrice: plan.precio,
          };
          container.planes.push(planObj);
        });

        //If calendar have data
        option.calendario.forEach((calendario) => {
          let days = [];
          let tarifaObj = {
            date: calendario.fecha,
            quotas: calendario.cupos,
            state: calendario.estado,
            days: days,
          };
          container.calendario.push(tarifaObj);

          calendario.dias.forEach((dia) => {
            let diaObj = {
              daysBefore: dia.antelacionMinima,
              minimumStay: dia.estancia,
              estado: dia.estado,
              price: dia.precio,
              tarifaBase: {
                id: dia.tarifaBase.id,
                name: dia.tarifaBase.nombre,
                numberMax: dia.tarifaBase.numeroMax,
                conditions: dia.tarifaBase.condiciones,
              },
            };
            days.push(diaObj);
          });
        });

        return container;
      });
      console.log(newOptions);

      this.dataReady = true;

      this.dataReady = true;
    },
    linksGeneration(id) {
      this.links = {
        listado: { name: "ActividadesList" },
        detalles: { name: "ActividadesEdit", params: { id: id } },
        opciones: { name: "ActividadesListOptions", params: { id: id } },
        tarifas: { name: "ActividadesCalendar", params: { id: id } },
        planTarifas: { name: "RatesList", params: { id: id } },
        condiciones: { name: "Conditions", params: { id: id } },
        ofertas: { name: "DealsList", params: { id: id } },
        comentarios: { name: "Review", params: { id: id } },
      };
    },
  },
};
</script>

<style scoped>
.calendar__dates,
.calendar__options {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
.calendar__select {
  width: 240px;
}
.calendar__edit {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin-right: 10%;
}
.calendar__tip:nth-child(1) {
  margin-right: 10px;
  fill: #ffc100;
}
.calendar__tip:nth-child(2) {
  margin-right: 10px;
  fill: #71c016;
}
.calendar__tip:nth-child(3) {
  fill: #ff4747;
}
.calendar__tip-text,
.calendar__tip svg {
  vertical-align: middle;
}
.calendar__tip svg {
  margin-right: 5px;
}
</style>