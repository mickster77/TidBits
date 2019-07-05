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
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <p class="red--text feedback" v-if="feedback">{{feedback}}</p>
          </v-flex>
          <v-flex xs12>
            <v-btn @click.prevent="login">Submit</v-btn>
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
      console.log(this.email);
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            // console.log(cred.user);
            this.$router.push({
              name: "Home"
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
