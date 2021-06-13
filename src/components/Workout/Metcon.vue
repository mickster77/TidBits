<template>
  <div>
    <v-card>
      <v-card-title>Log Workout</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="Title"></v-text-field>
        <v-text-field label="Description" v-model="Description"></v-text-field>
        <v-text-field label="Score" v-model="Score"></v-text-field>
        <v-textarea label="Notes" v-model="Notes"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// import WorkoutLineChart from "@/components/Workout/WorkoutLineChart.vue";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth

export default {
  components: {
    // WorkoutLineChart
  },
  data() {
    return {
      Title: null,
      Description: null,
      Score: null,
      Notes: null,
      workouts: null,
    };
  },
  created() {
    this.workouts = [];
    let newWorkouts = [];
    db.collection("UserOwned")
      .doc(firebase.auth().currentUser.uid)
      .collection("Workout")
      .orderBy("date", "desc")
      .where("type", "==", "7x3")
      .onSnapshot((snapshot) => {
        newWorkouts = [];
        snapshot.forEach((doc) => {
          newWorkouts.push({
            title: doc.data().title,
            exercise: doc.data().exercise,
            type: doc.data().type,
            sets: doc.data().sets,
            reps: doc.data().reps,
            weights: doc.data().weights,
            notes: doc.data().notes,
            date: doc.data().date,
            id: doc.id,
          });
        });
        this.workouts = newWorkouts;
      });
  },
  beforeMount() {
    this.loaded = true;
  },
};
</script>

<style>
</style>