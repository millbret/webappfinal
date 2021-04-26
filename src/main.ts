import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth"; 
import { AppRouter } from "./app-routing";
Vue.config.productionTip = false


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBQ2eXERq4DYtrLE7xnI-YSmPggXd2aV98",
    authDomain: "webappfinal-ac356.firebaseapp.com",
    projectId: "webappfinal-ac356",
    storageBucket: "webappfinal-ac356.appspot.com",
    messagingSenderId: "654977949937",
    appId: "1:654977949937:web:f00ac58a11c294daa4c950"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  Vue.prototype.$appDB = firebase.firestore();
  Vue.prototype.$appAuth = firebase.auth();
new Vue({
  router: AppRouter, 
  render: h => h(App),
}).$mount('#app')
