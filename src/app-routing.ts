import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import login from "./components/login.vue";
import movies from './components/movies.vue';
import profile from './components/profile.vue';
import Details from './components/Details.vue';
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: login,
  },
  {
    name: "Profile",
    path: "/profile",
    component: profile,
  },
  {
    name: "Movies",
    path: "/movies",
    component: movies,
  },
  {
    name: "Details",
    path: "/Details",
    component: Details
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});