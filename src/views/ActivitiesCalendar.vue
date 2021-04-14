<template>
  <div v-if="dataReady">
    <main class="wrapper-interior">
      <div class="content-general">
        <div class="max-width" v-if="dataReady">
          <form @submit.prevent="submitData">
            <h1 class="title-main">Calendario de tu Actividad</h1>
            <fieldset>
              <legend>Tarifas</legend>
              <p>
                Puedes abrir y cerrar disponibilidad, modificar tarifas, planes
                de tarifas, cupos y ver las ofertas desde un mismo lugar para tu
                mayor comodidad
              </p>
              <div class="calendar__dates">
                <div class="mb-15 mr-20">
                  <label class="bold label-form">Fechas *</label>
                  <Calendar id="activities" />
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
                    type="button"
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
                        type="button"
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
                </tbody>
              </table>
            </div>
            <div class="form__save">
              <button type="submit" class="btn btn--blue mr-10">Guardar</button>
              <button
                @click="previousPage()"
                type="button"
                class="btn btn--white"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
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
            numberMax: plan.numeroMax,
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
              //estado: dia.estado,
              price: dia.precio,
              id: dia.tarifaBase.id,
              name: dia.tarifaBase.nombre,
              numberMax: dia.tarifaBase.numeroMax,
              conditions: dia.condicionDescuentoTarifas,
            };
            days.push(diaObj);
          });
        });

        return container;
      });

      this.newOptions = newOptions;

      this.dataReady = true;
    },
    async submitData() {
      console.log(this.newOptions);
    },
    previousPage() {
      this.$router.back();
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
.dummy {
  border: #ff4747 solid 1px;
  padding: 5px;
  margin-bottom: 10px;
}
</style>