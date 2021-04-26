<template>
  <div id="details">
    <h1>{{ name }}</h1>
    <h4>{{tagline}}</h4>
    <p>{{ summary }}</p>
    <table class="details">
      <tbody>
        <tr>
          <th>Budget</th>
          <th>Revenue</th>
          <th>Runtime</th>
          <th>Studio</th>
          <th>Genre</th>
        </tr>
        <td>{{"$" + budget }}</td>
        <td>{{"$" + revenue }}</td>
        <td>{{runtime + " min"}}</td>
        <td>{{studio.name}}</td>
        <td>{{genre.name}}</td>
        <tr></tr>
      </tbody>
    </table>
    <div id="review-area">
      <h1>{{ this.movieDetails.name }}</h1>
      <p>{{ movieDetails.budget }}</p>
      <h2>Give a review?</h2>
      <textarea
        id="review"
        name="review"
        rows="6"
        cols="70"
        v-model="review"
      ></textarea>
      <button id="Submit Review" v-on:click="saveReview">Submit Review</button>
      <ul style="list-style-type: none">
        <li v-for="(z, pos) in Reviews" :key="pos">
          <p style="text-align: left;">{{ z.review }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { FirebaseFirestore } from "@firebase/firestore-types";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import "firebase/auth";

@Component
export default class Details extends Vue {
  private selectedMovie = this.$route.params.id;
  private movieDetails: any[] = [];
  private imgLink = "https://image.tmdb.org/t/p/w1280";
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  private mID = 0;
  private name = "";
  private review = "";
  private uid = "none";
  private Reviews: any[] = [];
  private apiURL =
    "https://api.themoviedb.org/3/movie/" +
    this.selectedMovie +
    "?api_key=04c35731a5ee918f014970082a0088b1&language=en-US";
  private summary = "";
  private genre = [];
  private budget = "";
  private revenue = 0;
  private runtime = 0;
  private studio = [];
  private tagline = "";
  private background = "";
  mounted(): void {
    console.log(this.selectedMovie);
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
      .collection(`reviews/${this.selectedMovie}/reviews`)
      .onSnapshot((qs: QuerySnapshot) => {
        this.Reviews.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const data = qds.data();
            this.Reviews.push({
              review: data.review,
            });
          }
        });
      });

    axios({
      method: "GET",
      url: this.apiURL,
      headers: {},
      params: {
        movie_id: this.selectedMovie,
      },
    }).then((response: AxiosResponse) => {
      const movie = response.data;
      console.log(response.data);

      this.movieDetails.push({
        budget: movie.budget,
        mID: movie.id,
        name: movie.title,
        synopsis: movie.overview,
        image: this.imgLink + movie.backdrop_path,
        poster: this.imgLink + movie.poster_path,
        rating: movie.vote_average,
      });
      console.log(movie.title);
      console.log(movie.overview);
      console.log(this.movieDetails);
      this.mID = movie.id;
      this.name = movie.title;
      this.summary = movie.overview;
      this.budget = movie.budget;
      this.runtime = movie.runtime;
      this.revenue = movie.revenue;
      this.studio = movie.production_companies[0];
      this.genre = movie.genres[0];
      this.tagline = movie.tagline;
      this.background=movie.backdrop_path;
    });
  }

  saveReview(): void {
    this.$appDB
      .collection(`users/${this.uid}/reviews`)
      .add({ name: this.name, mID: this.mID, review: this.review });

    this.$appDB
      .collection(`reviews/${this.selectedMovie}/reviews`)
      .add({ user: this.uid, review: this.review });
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

li {
  border: 2px solid black;
  border-radius: 1em;
  background: white;
  margin: 2em;
  margin-left: 15em;
  margin-right: 15em;
  
}
#review-area {
  border: 2px solid #ACADA8;
  margin: 5em;
  background: #fbfbfb;
  box-shadow: #e6e6e6 0 0 4px ;
}
table{
     border-radius: 5px;
    font-size: 15px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 50%;
    margin: 0 auto;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}
th{
    background: #42444e;
    color: #fff;
}
td,th{
    text-align: center;
    padding: 8px;
}
</style>