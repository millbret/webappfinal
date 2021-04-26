<template>
  <div id="details">
    <h1> Movie Title </h1>
    <p> summary </p>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
@Component
export default class movies extends Vue {
    @Prop()  movieDetails!: [];
mounted(): void {
    console.log(this.movieDetails)
}
}
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