<template>
  <div id="app">
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


  mounted(): void {

    console.log("API Key", this.$appDB.app.options_.apiKey);
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
