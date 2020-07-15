<template>
  <v-card class="ma-4">
    <v-card-title>{{name}}</v-card-title>
    <v-card-subtitle>Date Started: {{reps[0].date}}</v-card-subtitle>
    <v-card-text align="center">
      <h1>Total {{name}} Done Today:</h1>
      <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
      <h1 v-else>{{todayReps}}</h1>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="add(1)">Add 1</v-btn>
      <v-btn @click="add(5)">Add 5</v-btn>
      <v-btn @click="add(10)">Add 10</v-btn>
      <v-btn @click="showGraph=!showGraph">Show Graph</v-btn>
      <v-btn @click="showTable=!showTable">Show Table</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="zeroReps()" color="error">Reset</v-btn>
    </v-card-actions>
    <v-card-text v-if="showGraph">
      <line-chart
        :chartData="repsArray"
        :chartLabels="datesArray"
        :options="chartOptions"
        label="Reps over time"
      />
    </v-card-text>
    <v-card-text v-if="showTable">
      <h1>Table</h1>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Reps</th>
              <th class="text-right">Delete</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="item in desserts" :key="item.name"> -->
            <tr v-for="(item, index) in reps" :key="index">
              <td>{{ item.date }}</td>
              <td>{{item.reps}}</td>
              <td class="text-right">
                <v-icon @click="deleteDay(item.date)">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth
import LineChart from "@/components/Charts/LineChart";

export default {
  props: {
    name: String
  },
  components: {
    LineChart
  },
  data() {
    return {
      reps: [],
      loading: false,
      showGraph: false,
      showTable: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
          text: "Reps",
          fontColor: "#FFFFFF",
          fontSize: 24
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "#FFFFFF"
          }
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time",
                fontColor: "#FFFFFF",
                fontSize: 10
              },
              ticks: {
                fontColor: "white",
                fontSize: 14
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Reps",
                fontColor: "#FFFFFF",
                fontSize: 10
              },
              ticks: {
                fontColor: "white",
                fontSize: 14
              }
            }
          ]
        }
      }
    };
  },
  async created() {
    let allReps = [];
    db.collection("UserShared")
      .doc(firebase.auth().currentUser.displayName)
      .collection(this.$props.name)
      .onSnapshot(snapshot => {
        allReps = [];
        snapshot.forEach(doc => {
          allReps.push({
            date: doc.id,
            reps: doc.data().reps
          });
        });
        this.reps = allReps;
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    add(numAdd) {
      this.loading = true;
      let todayDate = moment(Date.now()).format("YYYY-MM-DD");
      let oldReps = 0;
      var docRef = db
        .collection("UserShared")
        .doc(firebase.auth().currentUser.displayName)
        .collection(this.$props.name)
        .doc(todayDate);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            oldReps = doc.data().reps;
            docRef
              .update({
                reps: numAdd + oldReps
              })
              .then(() => {
                this.loading = false;
              });
          } else {
            // doc.data() will be undefined in this case
            docRef
              .set({
                reps: numAdd
              })
              .then(() => {
                this.loading = false;
              });
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
    zeroReps() {
      let todayDate = moment(Date.now()).format("YYYY-MM-DD");
      db.collection("UserShared")
        .doc(firebase.auth().currentUser.displayName)
        .collection(this.$props.name)
        .doc(todayDate)
        .set({
          reps: 0
        });
    },
    deleteDay(id) {
      db.collection("UserShared")
        .doc(firebase.auth().currentUser.displayName)
        .collection(this.$props.name)
        .doc(id)
        .delete();
    }
  },
  computed: {
    todayReps() {
      if (this.reps.length > 0) {
        // get today's date
        let todayDate = moment(Date.now()).format("YYYY-MM-DD");
        // find the array index for today's date
        let index = this.reps.map(e => e.date).indexOf(todayDate);
        // get the corresponding reps
        let myReps = this.reps[index].reps;

        return myReps;
      } else {
        return 0;
      }
    },
    repsArray() {
      let justReps = [];
      this.reps.forEach(element => {
        justReps.push(element.reps);
      });
      return justReps.map(Number).reverse();
    },
    datesArray() {
      let justDates = [];
      this.reps.forEach(element => {
        justDates.push(element.date);
      });
      return justDates.reverse();
    }
  }
};
</script>

<style>
</style>