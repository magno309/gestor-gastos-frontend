<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a href="#" class="navbar-brand">Gestor de gastos</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/movimientos" class="nav-link">Movimientos</a>
        </li>
        <li class="nav-item">
          <a href="/add" class="nav-link">Add</a>
        </li>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CustomNavbar extends Vue {}
</script>