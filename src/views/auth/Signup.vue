<template>
  <div class="signup container">
    <v-form>
      <v-container>
        <span>
          <h2>Signup</h2>
        </span>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field label="Email" type="email" v-model="email"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Alias" type="text" v-model="alias"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <p class="red--text feedback" v-if="feedback">{{feedback}}</p>
          </v-flex>

          <v-flex xs12>
            <v-btn @click="signup" class="center">Submit</v-btn>
          </v-flex>
          <v-flex xs12 class="my-0">
            <p>
              Already have an account? Log in
              <a href="/login">here</a>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.feedback = null;
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            cred.user.updateProfile({
              displayName: this.slug
            });
            let ref = db.collection("users").doc(this.slug);
            ref.set({
              alias: this.alias,
              user_id: cred.user.uid,
              slug: this.slug
            });
          })
          .then(() => {
            this.$router.push({
              name: "Home"
            });
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message;
          });
        // let ref = db.collection("users").doc(this.slug);
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
}
.feedback {
  text-align: center;
}
</style>
