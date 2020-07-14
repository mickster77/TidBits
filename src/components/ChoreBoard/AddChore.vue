<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="cardColor darken-1">
          <v-card-title>Add Chore</v-card-title>
          <v-card-text>
            <v-text-field v-model="choreName" label="chore name"></v-text-field>
            <v-text-field v-model="chorePoints" label="points"></v-text-field>
            <v-select :items="children" label="Child" v-model="choreChild"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addChore">Submit</v-btn>
          </v-card-actions>
          <v-card-text class="red--text">
            <h3 v-show="feedback">{{feedback}}</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import moment from "moment";

export default {
  data() {
    return {
      choreName: null,
      chorePoints: null,
      choreChild: null,
      children: ["Dave", "Dan", "Mads", "Adam"],
      feedback: "no feedback"
    };
  },
  methods: {
    addChore() {
      this.feedback = null;
      if (this.choreName && this.chorePoints) {
        db.collection("ChoreBoard")
          .doc(this.$store.getters.uid)
          .collection("chores")
          .add({
            name: this.choreName,
            points: this.chorePoints,
            child: this.choreChild,
            completed: false,
            dateAssigned: moment(Date.now()).format("YYYY-MM-DD")
          })
          .then(() => {
            this.choreName = null;
            this.chorePoints = null;
            this.choreChild = null;
            this.feedback = "Submitted!";
          })
          .catch(error => {
            alert(error);
          });
      } else {
        this.feedback = "fill out the form";
      }
    }
  },
  created() {
    let newItems = [];
    db.collection("UserOwned")
      .doc(firebase.auth().currentUser.uid)
      .collection("ChoreBoard")
      .doc("Children")
      .collection("Items")
      .onSnapshot(snapshot => {
        newItems = [];
        snapshot.forEach(doc => {
          newItems.push(doc.data().name);
        });
        this.children = newItems;
      });
  }
};
</script>

<style>
</style>