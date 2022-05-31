<template>
  <div class="container">
    <h1>Lista de movimientos</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col mb-3">
            Aquí va un MonthPicker
          </div>
          <div class="col mb-3">
            <select class="form-select" v-model="currentShowMode">
              <option
                v-for="option in showModeOptions"
                v-bind:key="option.value"
                v-bind:value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <ul class="list-group">
            <li
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
              "
              :class="{ active: index == currentIndex }"
              v-for="(movimiento, index) in currentMovimientosList"
              :key="index"
              @click="setCurrentMovimiento(movimiento, index)"
            >
              {{ movimiento.fecha }}
              <span
                class="badge rounded-pill"
                :class="currencyBadgeClass(movimiento.tipo)"
                >{{ formatCurrency(movimiento.cantidad) }}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="currentMovimiento.id">
          <h4>Detalles del movimiento</h4>
          <div>
            <label><strong>Fecha:</strong></label>
            {{ currentMovimiento.fecha }}
          </div>
          <div>
            <label><strong>Descripción:</strong></label>
            {{ currentMovimiento.descripcion }}
          </div>
          <div>
            <label><strong>Cantidad:</strong></label>
            {{ formatCurrency(currentMovimiento.cantidad) }}
          </div>
          <div>
            <label><strong>Tipo:</strong></label>
            {{ currentMovimiento.tipo }}
          </div>
          <br />
          <a
            class="btn btn-warning btn-sm"
            :href="'/movimientos/' + currentMovimiento.id"
            >Editar</a
          >
        </div>
        <div v-else>
          <h4>Seleccione un movimiento para ver sus detalles!</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Movimiento, { Tipo } from "@/types/Movimiento";
import MovimientoDataService from "@/services/MovimientoDataService";
import { Watch } from "vue-property-decorator";

export enum ShowMode {
  Todos,
  Ingresos,
  Egresos,
}

@Component
export default class MovimientosList extends Vue {
  currentShowMode: ShowMode = ShowMode.Todos;
  showModeOptions = [
    { text: "Mostrar todos", value: ShowMode.Todos },
    { text: "Mostrar ingresos", value: ShowMode.Ingresos },
    { text: "Mostrar egresos", value: ShowMode.Egresos },
  ];
  movimientosList: Movimiento[] = [];
  currentIndex = -1;
  currentMovimiento: Movimiento = {} as Movimiento;
  currentDate = new Date();

  retrieveMovimientos() {
    MovimientoDataService.getAll()
      .then((response) => {
        switch (this.currentShowMode) {
          case ShowMode.Ingresos:
            this.movimientosList = response.data.slice().filter((element) => {
              return element.tipo === Tipo.INGRESO;
            });
            break;
          case ShowMode.Egresos:
            this.movimientosList = response.data.slice().filter((element) => {
              return element.tipo === Tipo.EGRESO;
            });
            break;
          default:
            this.movimientosList = response.data.slice();
            break;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @Watch("currentShowMode")
  onCurrentShowModeChanger() {
    this.currentIndex = -1;
    this.currentMovimiento = {} as Movimiento;
  }

  get currentMovimientosList(): Movimiento[] {
    switch (this.currentShowMode) {
      case ShowMode.Ingresos:
        return this.movimientosList.slice().filter((element) => {
          return element.tipo === Tipo.INGRESO;
        });
      case ShowMode.Egresos:
        return this.movimientosList.slice().filter((element) => {
          return element.tipo === Tipo.EGRESO;
        });
      default:
        return this.movimientosList.slice();
    }
  }

  currencyBadgeClass(tipo: Tipo) {
    return tipo == Tipo.INGRESO ? ["bg-success"] : ["bg-danger"];
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
  }

  setCurrentMovimiento(movimiento: Movimiento, index: number) {
    this.currentMovimiento = movimiento;
    this.currentIndex = index;
  }

  mounted() {
    this.retrieveMovimientos();
  }
}
</script>