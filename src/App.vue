<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <movies></movies>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, {AxiosResponse} from "axios";
import movies from './components/movies.vue';

@Component({
  components: {
    movies,
  },
})
export default class App extends Vue {}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
