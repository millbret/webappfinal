<template>
  <div id="movies">
    <table class="expense">
      <h1>World Statistics</h1>

      <tbody>
        <tr>
          <th>Movie Name</th>
          <th>Synopsis</th>
          <th>Movie Poster</th>
          <th>Movie ID</th>
          <th>Rating</th>
        </tr>
        <tr v-for="(z, pos) in popularMovies" :key="pos">
          <td>{{ z.name }}</td>
          <td> {{ z.synopsis }}</td>
          <td><img v-bind:src="z.poster" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
let searchInput = "avengers";
@Component
export default class movies extends Vue {
  private popularMovies: any[] = [];
  private imgLink = "https://image.tmdb.org/t/p/w1280";
  mounted(): void {
    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&include_adult=false&include_video=false&page=1",
      headers: {},
      params: {
        sort_by: "popularity.desc",
      },
    }).then((response: AxiosResponse) => {
      const responseData = response.data;
      console.log(response.data);
      responseData.results.forEach((movie: any) => {
        this.popularMovies.push({
          mID: movie.id,
          name: movie.title,
          synopsis: movie.overview,
          image: this.imgLink + movie.backdrop_path,
          poster: this.imgLink + movie.poster_path,
        });
        console.log(movie.title);
        console.log(movie.overview);
      });
    });
    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1&include_adult=false",
      headers: {},
      params: {
        query: searchInput,
      },
    }).then((response: AxiosResponse) => {
      const responseData = response.data;
      console.log(responseData.results[0].original_title);
    });
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
img {
  max-width: 200px;
}
</style>
