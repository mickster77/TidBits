<template>
  <v-container class="mu-1">
    <v-row>
      <v-col>{{workoutType}}</v-col>
      <!--  log workout  -->
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on" class="mr-4">Log New Workout</v-btn>
                </template>
                <LogWorkout v-on:closeDialog="dialog=false"></LogWorkout>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- data table  -->
      <v-col cols="12" v-show="false">
        <v-container>
          <v-row>
            <v-col>
              <v-data-table
                :headers="headers"
                :items="workouts"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="id"
                show-expand
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Workout Log</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
                  </v-toolbar>
                </template>
                <template v-slot:expanded-item="{ headers }">
                  <td :colspan="headers.length">
                    <span>not completed...</span>
                  </td>
                </template>
                <template v-slot:item.delete="{item}">
                  <v-icon @click="deleteWorkout(item.id)">mdi-delete</v-icon>
                </template>
                <template v-slot:item.sets="{item}">
                  <td>{{item.notes}}</td>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>
        <!-- <WorkoutLineChart /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth
import LogWorkout from "@/components/Workout/LogWorkout.vue";
// import WorkoutLineChart from "@/components/Workout/WorkoutLineChart.vue";

export default {
  components: {
    LogWorkout
    // WorkoutLineChart
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