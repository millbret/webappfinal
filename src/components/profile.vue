<template>
  <div id="budget">
      <table class="userReviews">
      <div class="UserPanel">
        <h2>{{uid}}</h2>
        <button id = "Movie List" v-on:click ="movies">See Movie List</button>
      </div>
      <tbody>
        <tr>
          <th>Movie Name</th>
          <th>Review</th>
        </tr>
        <tr v-for="(z, pos) in userInfo" :key="pos">
          <td>{{ z.name }}</td>
          <td>{{z.review}}</td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
.category, tbody, tr{
    border: 1px solid black;
}
.category th{
    border-bottom: 1px solid black;
}

#crs {
  display: inline-block;
  border: 2px solid hsl(30, 90%, 50%);
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
  box-shadow: 3px 5px 6px 7px hsla(30, 55%, 50%, 0.4);
}
</style>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {FirebaseFirestore} from "@firebase/firestore-types";
import {QueryDocumentSnapshot, QuerySnapshot} from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential} from "@firebase/auth-types";
import "firebase/auth";

@Component
export default class Profile extends Vue {

    private userInfo: any[] = [];
    readonly $appDB!: FirebaseFirestore;
    readonly $appAuth!: FirebaseAuth;
    private uid = "none"

    mounted(): void {
        this.uid = this.$appAuth.currentUser?.uid ?? "none";
        this.$appDB
        .collection(`users/${this.uid}/reviews`)
        .orderBy("name")       // Sort by category name
        .onSnapshot((qs: QuerySnapshot) => {
        this.userInfo.splice(0);  // remove old data
            qs.forEach((qds: QueryDocumentSnapshot) => {
                if (qds.exists) {
                    const data = qds.data();
                    this.userInfo.push({
                        name: data.name,
                        review: data.review,
                    });
                }
            });
        });
    }
    
    movies(): void{
        this.$router.push({path: "/movies"});
    }


}
</script>