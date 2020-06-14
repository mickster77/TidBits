<template>
  <div>
    <!-- <div>
      <WorkoutLineChart v-if="loaded" :workouts="metconWorkouts" exercise="Bench Press" />
    </div>
    <div>
      <WorkoutLineChart v-if="loaded" :workouts="metconWorkouts" exercise="Squat" />
    </div>
    <div>
      <WorkoutLineChart v-if="loaded" :workouts="metconWorkouts" exercise="Press" />
    </div>
    <div>
      <WorkoutLineChart v-if="loaded" :workouts="metconWorkouts" exercise="Deadlift" />
    </div>-->
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
      metconWorkouts: null,
      loaded: false
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
      .onSnapshot(snapshot => {
        newWorkouts = [];
        snapshot.forEach(doc => {
          newWorkouts.push({
            title: doc.data().title,
            exercise: doc.data().exercise,
            type: doc.data().type,
            sets: doc.data().sets,
            reps: doc.data().reps,
            weights: doc.data().weights,
            notes: doc.data().notes,
            date: doc.data().date,
            id: doc.id
          });
        });
        this.metconWorkouts = newWorkouts;
      });
  },
  beforeMount() {
    this.loaded = true;
  }
};
</script>

<style>
</style>