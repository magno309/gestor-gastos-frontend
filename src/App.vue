<template>
  <div id="app">
    <custom-navbar />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomNavbar from "./components/CustomNavbar.vue";
@Component({
  components: {
    'custom-navbar': CustomNavbar,
  },
})
export default class App extends Vue {}
</script>