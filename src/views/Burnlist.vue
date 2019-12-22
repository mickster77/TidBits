<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Burnlist</h1>
        <ul>
          <li>Implement Templates</li>
          <li>User Feedback</li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(item, index) in feedback" :key="index">
            <template v-slot:header>
              <div class="myFaq">{{item.name}}</div>
            </template>
            <v-card>
              <v-card-text>{{item.feedback}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import functions from "firebase/functions"; // needed for user auth
import db from "@/firebase/init";

export default {
  name: "Burnlist",
  data() {
    return {
      feedback: []
    };
  },
  computed: {},
  methods: {},
  created() {
    db.collection("feedback").onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        let newFeedback = doc.data();
        this.feedback.push(newFeedback);
      });
    });
  }
};
</script>

<style>
</style>
