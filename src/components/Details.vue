<template>
  <div id="details">
    <h1>{{ selectedMovie.name }}</h1>
    <p>{{ selectedMovie.synopsis }}</p>
    <div id="review area">
      <h2>Give a review?</h2>
      <textarea id="review" name="review" rows="6" cols="70" v-model="review"></textarea>
      <button id = "Submit Review" v-on:click ="saveReview">Submit Review</button>
      <ul style="list-style-type:none;">
          <li v-for=" (z,pos) in Reviews" :key="pos"><p>{{z.review}}</p></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import {FirebaseFirestore} from "@firebase/firestore-types";
import {QueryDocumentSnapshot, QuerySnapshot} from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential} from "@firebase/auth-types";
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

  mounted(): void {
    console.log(this.selectedMovie);
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
        .collection(`reviews/${this.selectedMovie}`)
        .onSnapshot((qs: QuerySnapshot) => {
        this.Reviews.splice(0);  // remove old data
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
        console.log(this.selectedMovie);
        this.mID = movie.id;
        this.name = movie.title;
      });
    });
  }


  saveReview(): void{

    this.$appDB
        .collection(`users/${this.selectedMovie}/reviews`)
        .add({name: this.name, mID: this.selectedMovie, review: this.review})

    this.$appDB
     .collection(`reviews/${this.mID}/reviews`)
    .add({user: this.uid, review: this.review})
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