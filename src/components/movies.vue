<template>
  <div id="movies">
    <router-link to="/login" replace v-if="status == 'not signed in' ">Login</router-link>
    <router-link to="/profile" replace v-else-if="status != 'not signed in' ">Profile</router-link>
    <table class="expense">
      <div class="search">
        <input type="text" v-model="searchInput" />
        <button @click="search">Search</button>
      </div>
      <tbody>
        <tr>
          <th>Movie Name</th>
          <th>Synopsis</th>
          <th>Movie Poster</th>
          <th>Movie ID</th>
          <th>Rating</th>
        </tr>
        <tr v-for="(z, pos) in displayMovies" :key="pos">
         <router-link to="/details" replace> <td @click="details(z)">{{ z.name }}</td> </router-link>
          <td>{{ z.synopsis }}</td>
          <td><img v-bind:src="z.poster" /></td>
          <td>{{z.mID}}</td>
          <td>{{z.rating}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import {FirebaseFirestore} from "@firebase/firestore-types";
import {QueryDocumentSnapshot, QuerySnapshot} from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential} from "@firebase/auth-types";
import "firebase/auth";
@Component
export default class movies extends Vue {
  private popularMovies: any[] = [];
  private searchMovies: any[] = [];
  private displayMovies: any[] = [];
  private imgLink = "https://image.tmdb.org/t/p/w1280";
  private searchInput = "";
  private movieDetails: any[] = [];
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";
  private status = "not signed in";

  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    if(this.uid != "none"){
        this.status = "Signed In";
    }
    this.displayMovies = this.popularMovies;
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
          rating: movie.vote_average,
        });
        console.log(movie.title);
        console.log(movie.overview);
      });
    });
  }
  details(z): void {
    this.movieDetails = z
    console.log(this.movieDetails);
  }
  search(): void {
    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1&include_adult=false",
      headers: {},
      params: {
        query: this.searchInput,
      },
    }).then((response: AxiosResponse) => {
      const responseData = response.data;
      console.log(responseData.results);
      responseData.results.forEach((movie: any) => {
        this.searchMovies.push({
          mID: movie.id,
          name: movie.title,
          synopsis: movie.overview,
          image: this.imgLink + movie.backdrop_path,
          poster: this.imgLink + movie.poster_path,
          rating: movie.vote_average,
        });
      });
    });
    console.log(this.searchMovies);
    console.log(this.displayMovies);
    this.displayMovies.splice(0, this.displayMovies.length);
    this.displayMovies = this.searchMovies;
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
