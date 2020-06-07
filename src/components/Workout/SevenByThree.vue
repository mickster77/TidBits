<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Log Workout</v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-btn-toggle v-model="exercise" tile group>
                <v-btn value="Squat">Squat</v-btn>
                <v-btn value="Deadlift">Deadlift</v-btn>
                <v-btn value="Press">Press</v-btn>
                <v-btn value="Bench Press">Bench Press</v-btn>
              </v-btn-toggle>
            </v-card-text>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Set 1" v-model="weight1" @keydown.enter="fillWeights"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Set 2" v-model="weight2"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Set 3" v-model="weight3"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Set 4" v-model="weight4"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Set 5" v-model="weight5"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Set 6" v-model="weight6"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Set 7" v-model="weight7"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clearForm">Clear</v-btn>
              <v-btn @click="saveForm">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <!-- All  -->
        <v-card>
          <v-card-title>
            All
            <v-spacer></v-spacer>
            <span>
              <v-btn>Show</v-btn>
            </span>
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Exercise</th>

                    <th class="text-left">Date</th>
                    <th class="text-left">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="workout in workouts" :key="workout.id">
                    <td>{{ workout.title }}</td>
                    <td>{{ workout.exercise }}</td>
                    <td>{{ workout.date }}</td>
                    <td>
                      <v-icon @click="editWorkout(workout.id)">mdi-lead-pencil</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Squat  -->
      <v-col lg="12" md="6">
        <v-card>
          <v-card-title>Squat</v-card-title>
          <v-card-text>
            <line-chart
              :chartData="squatWorkouts[0].weights"
              :chartData2="squatWorkouts[1].weights"
              :chartLabels="squatWorkouts[0].reps"
              :options="chartOptions"
              :label="squatWorkouts[0].date"
              :label2="squatWorkouts[1].date"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Bench Press  -->
      <v-col lg="12" md="6">
        <v-card>
          <v-card-title>Bench Press</v-card-title>
          <v-card-text>
            <line-chart
              :chartData="benchPressWorkouts[0].weights"
              :chartLabels="benchPressWorkouts[0].reps"
              :options="chartOptions"
              :label="benchPressWorkouts[0].date"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Dead Lift  -->

      <v-col lg="12" md="6">
        <v-card>
          <v-card-title>Dead Lift</v-card-title>
          <v-card-text>
            <line-chart
              :chartData="deadLiftWorkouts[0].weights"
              :chartLabels="deadLiftWorkouts[0].reps"
              :options="chartOptions"
              :label="deadLiftWorkouts[0].date"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Press  -->

      <v-col lg="12" md="6">
        <v-card>
          <v-card-title>Press</v-card-title>
          <v-card-text>
            <line-chart
              :chartData="pressWorkouts[0].weights"
              :chartLabels="pressWorkouts[0].reps"
              :options="chartOptions"
              :label="pressWorkouts[0].date"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth
import LineChart from "@/components/Charts/LineChart";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      // Form
      dialog: false,
      exercise: "Squat",
      weight1: null,
      weight2: null,
      weight3: null,
      weight4: null,
      weight5: null,
      weight6: null,
      weight7: null,
      reps: [3, 3, 3, 3, 3, 3, 3],
      weights: [],

      // data table
      picker: moment(Date.now()).format("YYYY-MM-DD"),
      workoutNotes: null,

      //
      workouts: null,

      // chart
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
          text: "Last Squat",
          fontColor: "#FFFFFF",
          fontSize: 24
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "#FFFFFF"
          }
        }
      }
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
        this.workouts = newWorkouts;
      });
  },
  methods: {
    clearForm() {
      this.weights = [];
      this.weight1 = null;
      this.weight2 = null;
      this.weight3 = null;
      this.weight4 = null;
      this.weight5 = null;
      this.weight6 = null;
      this.weight7 = null;
      this.dialog = false;
    },
    saveForm() {
      this.weights = [];
      this.weights.push(this.weight1);
      this.weights.push(this.weight2);
      this.weights.push(this.weight3);
      this.weights.push(this.weight4);
      this.weights.push(this.weight5);
      this.weights.push(this.weight6);
      this.weights.push(this.weight7);
      this.saveWorkout();
    },
    fillWeights() {
      this.weight2 = this.weight1;
      this.weight3 = this.weight1;
      this.weight4 = this.weight1;
      this.weight5 = this.weight1;
      this.weight6 = this.weight1;
      this.weight7 = this.weight1;
    },
    saveWorkout() {
      db.collection("UserOwned")
        .doc(this.$store.getters.uid)
        .collection("Workout")
        .add({
          exercise: this.exercise,
          title: this.exercise + " 7x3",
          type: "7x3",
          sets: 7,
          reps: this.reps,
          weights: this.weights,
          notes: this.workoutNotes,
          created_at: Date.now(),
          date: this.picker
        })
        .then(() => {
          this.clearForm();
          this.dialog = false;
        })
        .catch(error => {
          alert(error);
        });
    },
    editWorkout(id) {
      alert("Need to code this... workout id:  " + id);
    }
  },
  computed: {
    computedWorkouts() {
      let myWorkouts = this.workouts;
      myWorkouts.forEach(workout => {
        // workout.score = this.getWorkoutScore(workout.sets);
        workout.totalWeight = workout.weights.reduce(function(a, b) {
          return Number(a) + Number(b);
        }, 0);
        workout.maxWeight = Math.max(...workout.weights);
      });
      return myWorkouts;
    },
    squatWorkouts() {
      let myWorkouts = this.workouts.filter(workout => {
        return workout.exercise.match("Squat");
      });
      return myWorkouts;
    },
    benchPressWorkouts() {
      let myWorkouts = this.workouts.filter(workout => {
        return workout.exercise.match("Bench Press");
      });
      return myWorkouts;
    },
    pressWorkouts() {
      let myWorkouts = this.workouts.filter(workout => {
        return workout.exercise.match("Press");
      });
      return myWorkouts;
    },
    deadLiftWorkouts() {
      let myWorkouts = this.workouts.filter(workout => {
        return workout.exercise.match("Deadlift");
      });
      return myWorkouts;
    }
  }
};
</script>

<style>
</style>