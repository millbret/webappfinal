<template>
  <div id="details">
    <h1>{{ selectedMovie.name }}</h1>
    <p>{{ selectedMovie.synopsis }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class movies extends Vue {
  private selectedMovie = this.$route.params.id;
  private movieDetails: any[] = [];
  private imgLink = "https://image.tmdb.org/t/p/w1280";
  mounted(): void {
    console.log(this.selectedMovie);

    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/movie/{movie_id}?api_key=04c35731a5ee918f014970082a0088b1&language=en-US",
      headers: {},
      params: {
        movie_id: this.selectedMovie,
      },
    }).then((response: AxiosResponse) => {
      const responseData = response.data;
      console.log(response.data);
      responseData.results.forEach((movie: any) => {
        this.movieDetails.push({
          mID: movie.id,
          name: movie.title,
          synopsis: movie.overview,
          image: this.imgLink + movie.backdrop_path,
          poster: this.imgLink + movie.poster_path,
          rating: movie.vote_average,
        });
        console.log(movie.title);
        console.log(movie.overview);
      });
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
</style>