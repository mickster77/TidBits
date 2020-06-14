<template>
  <div>
    <!-- headline -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title primary-title class="justify-center display-3">Workout App</v-card-title>
            <v-container>
              <v-row>
                <v-col align="center">
                  <v-btn-toggle v-model="workoutType" tile group>
                    <v-btn value="7x3s">7x3s</v-btn>
                    <v-btn value="Metcon">Metcon</v-btn>
                    <v-btn value="Sets and Reps">Misc</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Metcon -->
    <v-container v-if="workoutType=='Metcon'">
      <v-row>
        <v-col>
          <Metcon />
        </v-col>
      </v-row>
    </v-container>

    <!-- 7x3s -->
    <!-- <v-container v-if="workoutType=='7x3s'">
      <v-row>
        <v-col>{{workoutType}}</v-col>
      </v-row>
    </v-container>-->

    <SevenByThree v-if="workoutType=='7x3s'" />

    <!-- One Rep Max -->
    <v-container v-if="workoutType=='1 Rep Max'">
      <v-row>
        <v-col>{{workoutType}}</v-col>
      </v-row>
    </v-container>

    <!-- Sets and Reps -->
    <SetsAndReps v-if="workoutType=='Sets and Reps'" />
  </div>
</template>

<script>
// import moment from "moment";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth
// import LogWorkout from "@/components/Workout/LogWorkout.vue";
import SetsAndReps from "@/components/Workout/SetsAndReps.vue";
import SevenByThree from "@/components/Workout/SevenByThree.vue";
import Metcon from "@/components/Workout/Metcon.vue";

export default {
  name: "Workout",
  components: {
    // LogWorkout,
    SetsAndReps,
    SevenByThree,
    Metcon
  },
  data() {
    return {
      // Workout Type
      workoutType: null,
      workouts: [],

      // log workout dialog
      dialog: false,

      // data table
      expanded: [],
      singleExpand: false,
      score: null, // used in computed method
      headers: [
        {
          text: "Date",
          align: "start",
          value: "date"
        },
        {
          text: "Title",
          value: "title"
        },
        {
          text: "Delete",
          value: "delete"
        },

        {
          text: "Weights",
          value: "data-table-expand"
        }
      ]
    };
  },
  created() {
    this.workouts = [];
    let newWorkouts = [];
    db.collection("UserOwned")
      .doc(firebase.auth().currentUser.uid)
      .collection("Workout")
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
        newWorkouts = [];
        snapshot.forEach(doc => {
          newWorkouts.push({
            title: doc.data().title,
            type: doc.data().type,
            date: doc.data().date,
            sets: doc.data().sets,
            notes: doc.data().notes,
            id: doc.id
          });
        });
        this.workouts = newWorkouts;
      });
  },
  methods: {
    deleteWorkout(id) {
      db.collection("UserOwned")
        .doc(this.$store.getters.uid)
        .collection("Workout")
        .doc(id) // Gets the doc of a specific id
        .delete(); // This deletes it from the database
    },
    getWorkoutScore(sets) {
      var score = 0;
      sets.forEach(set => {
        score = score + set.reps * set.weight;
      });
      return score;
    },
    logWorkout(title) {
      //get object of workout
      const workout = this.workouts.filter(workout => workout.title == title);
      console.table(workout);
      // this.$store.commit("setTitle", title);
    }
  },
  computed: {
    reverseSets() {
      let myArrary = this.sets;
      return myArrary.reverse();
    },
    // dataTableWorkouts() {
    //   let myWorkout = this.workouts;

    //   myWorkout.forEach(el => {
    //     el.score = this.getWorkoutScore(el.sets);
    //     el.sets = el.sets.length;
    //   });
    //   return myWorkout;
    // },
    workoutOutTitles() {
      let array = [];
      this.workouts.forEach(element => {
        if (element.title) {
          array.push(element.title);
        }
      });
      return array;
    }
  }
};
</script>

<style>
</style>