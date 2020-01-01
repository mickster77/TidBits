<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 my-5>
        <h1>FAQ</h1>

        <!-- vuetify example -->
        <!-- <v-expansion-panel>
        <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
          <template v-slot:header>
            <div>Item</div>
          </template>
          <v-card>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        </v-expansion-panel>-->

        <v-expansion-panel>
          <v-expansion-panel-content v-for="question in Questions" :key="question.title">
            <template v-slot:header>
              <div class="myFaq">{{question.title}}</div>
            </template>
            <v-card>
              <v-card-text>{{question.answer}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <!-- Feeback -->
      <h1>Feedback</h1>
      <v-flex xs12>
        <v-textarea box label="How can the site improve?" auto-grow v-model="feedback"></v-textarea>
      </v-flex>
      <v-flex xs12>
        <v-btn @click="submitFeedback">Submit</v-btn>
      </v-flex>
      <v-flex xs12>
        <span class="feedback">{{formFeedback}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";

export default {
  name: "FAQ",
  data() {
    return {
      feedback: null,
      formFeedback: null,
      Questions: [
        {
          title: "What do I do after submitting a request?",
          answer:
            "You should verify the requests populates on the home page and you get an email.  If the request is on the home page, and no email, shoot Kay an email to ensure she sees the new request."
        },
        {
          title:
            "What do the different states represent?  E.g., 'new,' 'ongoing,' 'completed'",
          answer:
            "The states reflect where the travel request is in its lifecycle.  'New' means the request is for action with Kay.  'Ticketed' means Kay has finished and the William has action to provide an envelope.  'Ongoing' means the envelope has been delieved to the user.  Action is on the user to submit a travel claim.  'Completed' means the travel claim is complete and there is no further action on the request"
        },
        {
          title: "question 3",
          answer: "answer 3"
        }
      ]
    };
  },
  computed: {},
  methods: {
    submitFeedback() {
      var today = new Date();
      if (this.feedback == null) {
        this.formFeedback = "no feedback provided";
      } else {
        this.formFeedback = null;

        db.collection("feedback") // Real database
          .add({
            dateSubmitted:
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate(),
            feedback: this.feedback,
            name: firebase.auth().currentUser.displayName,
            userEmail: firebase.auth().currentUser.email,
            uid: firebase.auth().currentUser.uid
          })
          .then(
            ((this.feedback = null), (this.formFeedback = "feedback submitted"))
          )
          .catch(function(error) {
            alert(error.message);
          });
        // var sendMessage = firebase
        //   .functions()
        //   .httpsCallable("sendFeedbackEmail");
        // sendMessage({
        //   email: firebase.auth().currentUser.email,
        //   name: firebase.auth().currentUser.displayName,
        //   feedback: this.feedback
        // }).then(
        //   ((this.feedback = null), (this.formFeedback = "feedback submitted"))
        // );
      }
    }
  },
  created() {}
};
</script>

<style>
.myFaq {
  /* color: lightgreen; */
  font-weight: bold;
  font-size: 12pt;
}
.feedback {
  color: red;
  font-weight: bold;
}
</style>