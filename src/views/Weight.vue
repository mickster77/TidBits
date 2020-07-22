<template>
  <div>
    <!-- headline -->
    <v-container fluid>
      <v-row justify-center>
        <v-col>
          <v-card>
            <v-card-title primary-title class="justify-center display-3">Weight App</v-card-title>
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-sparkline
                    :value="computedWeights"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="width"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
                  ></v-sparkline>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- add current weight   -->
    <v-container v-if="weighedIn">
      <v-row>
        <v-col>
          <h1 class="text-center">Weigh In (last: {{currentWeight}})</h1>
          <v-row>
            <v-col cols="12">
              <Slider :baseWeight="currentWeight" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- add past weight   -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="justify-center">
              Add Weight
              <span>
                <v-btn class="ml-4" @click="showCalendar=!showCalendar">Show</v-btn>
              </span>
            </v-card-title>
            <v-container v-show="showCalendar">
              <v-row>
                <v-col xs="12" md="6">
                  <v-text-field
                    v-model="weight"
                    append-outer-icon="mdi-plus"
                    @click:append-outer="addWeight"
                    @keydown.enter="addWeight"
                    @click:prepend="showCalendar=!showCalendar"
                    label="add weight"
                    prepend-icon="mdi-calendar"
                  >Test</v-text-field>
                </v-col>
                <v-col xs="12" md="6">
                  <v-date-picker v-model="picker"></v-date-picker>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- charts   -->
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="showChart=!showChart">Show Graphs</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="showData=!showData">Show Data</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row v-if="showChart">
        <v-col xs="12" md="6">
          <line-chart
            :chartData="computedChartDataMonth"
            :chartLabels="computedChartLabelsMonth"
            :options="chartMonthOptions"
            label="Last 30 Measurements"
          />
        </v-col>
        <v-col xs="12" md="6">
          <line-chart
            :chartData="computedChartDataWeek"
            :chartLabels="computedChartLabelsWeek"
            :options="chartDaysOptions"
            label="Last 7 Measurements"
          />
        </v-col>
      </v-row>
      <v-row v-if="showChart">
        <v-col cols="12">
          <line-chart
            :chartData="computedChartData"
            :chartLabels="computedChartLabels"
            :options="chartOptions"
            label="All Time Weights"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- data   -->
    <v-container>
      <v-row v-show="showData">
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Date</th>
                  <th class="text-left">Weight</th>
                  <th class="text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in weights" :key="item.id">
                  <td>{{ item.date }}</td>
                  <td>{{ item.weight }}</td>
                  <td>
                    <v-icon @click="deleteWeight(item.id)">mdi-delete</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
// import Chart from "chart.js";
import moment from "moment";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth
import LineChart from "@/components/Charts/LineChart";
import Slider from "@/components/Weight/Slider";

// Sparkline
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  name: "Weight",
  components: {
    LineChart,
    Slider
  },
  data() {
    return {
      weight: null,
      model: null,
      picker: null,
      showCalendar: false,
      weights: [],

      // Debug
      showDebug: true,

      //sparkline
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,

      // chart

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "month"
              }
            }
          ]
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "#FFFFFF"
          }
        }
      },
      chartMonthOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "week"
              }
            }
          ]
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "#FFFFFF"
          }
        }
      },
      chartDaysOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day"
              }
            }
          ]
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "#FFFFFF"
          }
        }
      },
      showChart: false,
      showData: false
    };
  },

  async created() {
    this.weights = [];
    let newWeights = [];
    db.collection("UserOwned")
      .doc(firebase.auth().currentUser.uid)
      .collection("Weight")
      .orderBy("date", "desc")
      //   .orderBy("date")

      .onSnapshot(snapshot => {
        newWeights = [];
        snapshot.forEach(doc => {
          newWeights.push({
            weight: doc.data().weight,
            id: doc.id,
            date: doc.data().date
          });
        });
        this.weights = newWeights;
      });
  },
  computed: {
    selectedDate() {
      let myDate = null;
      if (this.picker) {
        myDate = moment(this.picker).format("YYYY-MM-DD");
      } else {
        myDate = moment(Date.now()).format("YYYY-MM-DD");
      }
      return myDate;
    },
    currentWeight() {
      if (this.weights.length > 0) {
        let weightString = this.weights[0].weight;
        return Number(weightString);
      } else {
        return 0;
      }
    },
    computedWeights() {
      let justWeights = [];
      if (this.weights.length > 0) {
        this.weights.forEach(element => {
          justWeights.push(element.weight);
        });
        return justWeights.map(Number).reverse();
      } else {
        return justWeights;
      }
    },
    computedDates() {
      let justDates = [];
      this.weights.forEach(element => {
        justDates.push(element.date);
      });
      return justDates.reverse();
    },
    computedChartData() {
      let justWeights = [];
      this.weights.forEach(element => {
        justWeights.push(element.weight);
      });
      return justWeights.map(Number);
    },
    computedChartLabels() {
      let justDates = [];
      this.weights.forEach(element => {
        justDates.push(element.date);
      });
      return justDates;
    },
    computedChartDataMonth() {
      let justWeights = [];
      this.weights.forEach(element => {
        justWeights.push(element.weight);
      });
      return justWeights
        .map(Number)
        .slice(0, 30)
        .reverse();
    },
    computedChartLabelsMonth() {
      let justDates = [];
      this.weights.forEach(element => {
        justDates.push(element.date);
      });
      return justDates.slice(0, 30).reverse();
    },
    computedChartDataWeek() {
      let justWeights = [];
      this.weights.forEach(element => {
        justWeights.push(element.weight);
      });
      return justWeights
        .map(Number)
        .slice(0, 7)
        .reverse();
    },
    computedChartLabelsWeek() {
      let justDates = [];
      this.weights.forEach(element => {
        justDates.push(element.date);
      });
      return justDates.slice(0, 7).reverse();
    },
    weighedIn() {
      if (this.weights.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    sendMessage() {
      let uid = this.$store.getters.uid;
      //   let userName = this.$store.getters.userDisplayName;
      alert(uid);
    },

    nextDate() {
      if (this.picker) {
        this.picker = moment(this.picker)
          .add(1, "days")
          .format("YYYY-MM-DD");
      } else {
        this.picker = moment(Date.now())
          .add(1, "days")
          .format("YYYY-MM-DD");
      }
    },

    addWeight() {
      let uid = this.$store.getters.uid;
      this.picker = moment(Date.now()).format("YYYY-MM-DD");

      if (this.weight !== "") {
        db.collection("UserOwned")
          .doc(uid)
          .collection("Weight")
          .add({
            weight: this.weight,
            created_at: Date.now(),
            date: this.selectedDate
          })
          .then(
            ((this.weight = null),
            (this.picker = moment(this.picker)
              .add(1, "days")
              .format("YYYY-MM-DD")))
          )
          .catch(error => {
            alert(error);
          });
      } else {
        alert("Please enter a weight");
      }
    },
    deleteWeight(id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("Weight")
        .doc(id) // Gets the doc of a specific id
        .delete(); // This deletes it from the database
    },
    printWeights() {
      console.table(this.weights);
      console.log(this.computedWeights);
      console.log(this.computedDates);
      this.showChart = !this.showChart;
    }
  }
};
</script>

<style>
</style>