<template>
  <div id="app"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, {AxiosResponse} from "axios";
let searchInput = "avengers"
@Component
export default class movies extends Vue {

mounted(): void {
axios({
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&include_adult=false&include_video=false&page=1",
  headers: {

  },
  params: {
    sort_by: "popularity.desc"
  },
})
  .then((response: AxiosResponse) => {
    const responseData = response.data; 
    console.log(response.data);
    responseData.results.forEach(movie => {
      console.log(movie.title)
    })
  })
  axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1&include_adult=false",
      headers: {
  
      },
      params: {
        query: searchInput
      },
    })
      .then((response: AxiosResponse) => {
        const responseData = response.data; 
        console.log(response.data);
    })
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
