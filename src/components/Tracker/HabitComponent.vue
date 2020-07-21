<template>
  <v-card class="ma-4">
    <v-card-subtitle class="text-left">Date Started: {{startDate}}</v-card-subtitle>
    <v-card-text align="center">
      <h1>{{name}} Today:</h1>
      <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
      <h1 v-else>{{todayReps}}</h1>
      <div>
        <v-btn class="mx-2" fab small color="primary" @click="add(1)">
          <!-- <v-icon dark>mdi-plus</v-icon> -->
          1+
        </v-btn>
        <v-btn class="mx-2" fab color="primary" @click="add(5)">5+</v-btn>
        <v-btn class="mx-2" fab large color="primary" @click="add(10)">
          <!-- <v-icon dark>mdi-plus</v-icon> -->
          10+
        </v-btn>
      </div>
    </v-card-text>
    <v-card-actions>
      <!-- ****************** -->

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="primary">Show:</v-btn>
        </template>
        <v-list>
          <v-list-item @click="showGraph=!showGraph">
            <v-list-item-title>Graph</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showTable=!showTable">
            <v-list-item-title>Table</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showStats=!showStats">
            <v-list-item-title>Stats</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- ****************** -->
      <v-spacer></v-spacer>
      <v-btn @click="zeroReps()" color="error">Reset</v-btn>
    </v-card-actions>

    <!-- showGraph -->
    <v-card-text v-if="showGraph">
      <v-divider class="my-2"></v-divider>
      <line-chart
        :chartData="repsArray"
        :chartLabels="datesArray"
        :options="chartOptions"
        label="Reps over time"
      />
    </v-card-text>

    <!-- showTable -->
    <v-card-text v-if="showTable">
      <v-divider class="my-2"></v-divider>
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
            <tr v-for="(item, index) in reps" :key="index">
              <td>{{item.date }}</td>
              <td>{{item.reps}}</td>
              <td class="text-right">
                <v-icon @click="deleteDay(item.date)" color="error">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>

    <!-- showStats -->
    <v-card-text v-if="showStats">
      <v-divider class="my-2"></v-divider>
      <h2>Stats</h2>
      <h3>Total Reps: {{totalReps}}</h3>
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
    name: String,
    startDate: String
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
      showStats: false,

      Newreps: [],

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
        // if there are any entries, return the reps of the most recent entry
        return this.reps[this.reps.length - 1].reps;
      } else {
        // else, return zero
        return 0;
      }
    },
    // startDate() {
    //   if (this.reps.length > 0) {
    //     // if there are any entries, return the reps of the most recent entry
    //     return this.reps[this.reps.length - 1].date;
    //   } else {
    //     // else, return zero
    //     return "Get Going Already!";
    //   }
    // },
    totalReps() {
      if (this.reps.length > 0) {
        // ensure there is an entry
        let tReps = 0;
        this.reps.forEach(object => {
          tReps = tReps + object.reps;
        });
        return tReps;
      } else {
        // else, return zero
        return 0;
      }
    },
    repsArray() {
      let justReps = [];
      this.reps.forEach(element => {
        justReps.push(element.reps);
      });
      return justReps.map(Number);
    },
    datesArray() {
      let justDates = [];
      this.reps.forEach(element => {
        justDates.push(element.date);
      });
      return justDates;
    }
  }
};
</script>

<style>
</style>