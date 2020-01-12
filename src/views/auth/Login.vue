<template>
  <div class="login container">
    <v-form>
      <v-container>
        <h2>Login</h2>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field label="Email" type="email" v-model="email"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              v-on:keyup.enter="login"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <p class="red--text feedback" v-if="feedback">{{feedback}}</p>
          </v-flex>
          <v-flex xs12>
            <v-btn @click.prevent="login" color="primary">Submit</v-btn>
          </v-flex>
          <v-flex xs12>
            <p>
              Don't have an account? Sign up
              <a href="/signup">here</a>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
// npm install -g firebase-tools
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      // console.log(this.email);
      if (this.email && this.password) {
        this.feedback = null;

        // firebase
        //   .auth()
        //   .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        //   .then(function() {
        //     // Existing and future Auth states are now persisted in the current
        //     // session only. Closing the window would clear any existing state even
        //     // if a user forgets to sign out.
        //     // ...
        //     // New sign-in will be persisted with session persistence.
        //     return firebase
        //       .auth()
        //       .signInWithEmailAndPassword(this.email, this.password);
        //   })
        //   .catch(function(error) {
        //     // Handle Errors here.
        //     this.feedback = error.code;
        //     alert(error.message);
        //   });

        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // firebase
            //   .auth()
            //   .setPersistence(firebase.auth.Auth.Persistence.SESSION).then;
            this.$router.push({
              name: "Tidbits",
              params: { uid: firebase.auth().currentUser.uid }
            });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "you need to complete the form";
      }
    }
  }
};
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}

.login h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}
</style>
