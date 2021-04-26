<template>
  <div id="app">
        <div class="header">
      <p class="logo">Movie Reviews</p>
      <div class="header-right">
        <router-link to="/login" replace v-if="status == 'not signed in' "><p>Log In</p></router-link>
        <router-link to="/profile" replace v-else-if="status != 'not signed in' "><p>Profile</p></router-link> 
        <router-link to="/movies"><p>Movies</p></router-link> 
        <p v-on:click="doLogout">Log out</p>
        
      </div>
</div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, {AxiosResponse} from "axios";
import {FirebaseFirestore} from "@firebase/firestore-types"
import movies from './components/movies.vue';
// import Search from './components/Search.vue';
import login from './components/login.vue';
import Details from './components/Details.vue';
import Profile  from './components/profile.vue'
import { FirebaseAuth, UserCredential} from "@firebase/auth-types";
import "firebase/auth";

@Component({
  components: {
    movies,
    login,
    Details,
    Profile,
    // Search,
  },
})
export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";
  private status = "not signed in";

  mounted(): void {
  this.uid = this.$appAuth.currentUser?.uid ?? "none";
    if(this.uid != "none"){
        this.status = "Signed In";
    }
    console.log("API Key", this.$appDB.app.options_.apiKey);
  }
  doLogout(): void {
  this.$appAuth.signOut();
  this.$router.back();    // Go backward in the "history stack"
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
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}

.header p {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

.header button
.header p.logo {
  font-size: 25px;
  font-weight: bold;
}

.header p:hover, input:hover, button:hover {
  background-color: #ddd;
  color: black;
}

.header-right {
  float: right;
}
</style>
