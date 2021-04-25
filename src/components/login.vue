<template>
  <div id="login">
    <ul style="list-style-type:none;">
      <li>
        <h2>
          Email
          <input type="text" v-model="userEmail" />
        </h2>
      </li>
      <li>
        <h2>
          Password
          <input type="password" v-model="userPassword" />
        </h2>
      </li>
      <li>
        <h2>
          <button :disabled="noInput" v-on:click="createAccount()">Sign Up</button>
          <button :disabled="noInput" v-on:click="authenticate()">Sign In</button>
        </h2>
      </li>
    </ul>
    <div>{{ message }}</div>
  </div>
</template>
<style>

</style>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential} from "@firebase/auth-types";
import "firebase/auth";

@Component
export default class AppLogin extends Vue {
  readonly $appAuth!: FirebaseAuth;
  private userEmail = "";
  private userPassword = "";
  private message = "";
  

  get noInput(): boolean {
    return this.userEmail.length === 0 || this.userPassword.length === 0;
  }
    
  createAccount(): void {
            this.$appAuth
            .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
            .then((u: UserCredential) => {
                this.showMessage(`User create UID ${u.user?.uid}`);
                
            })
            .catch((err: any) => {
                this.showMessage(`Unable to create account ${err}`);
            });
        }

        authenticate(): void {
            this.$appAuth
            .signInWithEmailAndPassword(this.userEmail, this.userPassword)
            .then((u: UserCredential) => {
                this.showMessage(`Login successful UID ${u.user?.uid}`);
                
            })
            .catch((err: any) => {
                this.showMessage(`Unable to login ${err}`);
            });
        }

  showMessage(m: string): void {
  this.message = m;
  setTimeout(() => {    // Auto disappear after 5 seconds
    this.message = "";
  }, 5000);
}
}
</script>
