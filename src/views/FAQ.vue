<template>
  <v-container>
    <v-row>
      <v-col cols="12" my-5>
        <h1>FAQ...not yet</h1>
      </v-col>
      <!-- Feeback -->
      <v-col cols="12">
        <h1>Feedback</h1>
        <v-textarea filled label="How can the site improve?" auto-grow v-model="feedback"></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn @click="submitFeedback">Submit</v-btn>
      </v-col>
      <v-col cols="12">
        <span class="feedback">{{formFeedback}}</span>
      </v-col>
      <v-row>
        <v-col xs="12" sm="6" v-for="feedback in feedbacks" :key="feedback.id">
          <v-card>
            <v-card-title>{{feedback.feedback}}</v-card-title>
            <v-card-text>
              <br />
              <h5>Submitted by: {{feedback.name}} on {{feedback.dateSubmitted}}</h5>
            </v-card-text>
            <v-card-actions v-show="isAdmin">
              <v-btn @click="deleteFeedback(feedback.id)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
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
      feedbacks: [],
      formFeedback: null,
      Questions: [
        {
          title: "What is a TidBit?",
          answer: "hmmmm"
        },
        {
          title: "Question 2",
          answer: "hmmmm"
        },
        {
          title: "question 3",
          answer: "hmmmm"
        }
      ]
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
      // return true;
    }
  },
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
            uid: firebase.auth().currentUser.uid,
            createdAt: Date.now()
          })
          .then(
            ((this.feedback = null), (this.formFeedback = "feedback submitted"))
          )
          .catch(function(error) {
            alert(error.message);
          });

        // Code example:  Firebase cloud function http
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
    },
    deleteFeedback(id) {
      db.collection("feedback")
        .doc(id)
        .delete(); // This deletes it from the database
    }
  },
  created() {
    db.collection("feedback")
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        this.feedbacks = [];
        snapshot.forEach(doc => {
          // console.log(doc.data());
          let feedbackItem = doc.data();
          feedbackItem.id = doc.id;
          this.feedbacks.push(feedbackItem);
        });
      });
  }
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