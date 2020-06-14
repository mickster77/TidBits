<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  mixins: reactiveProp,
  extends: Line,
  props: {
    options: {
      type: Object
    },
    workouts: {
      type: Array
    },
    exercise: {
      type: String
    }
  },
  data() {
    return {
      workoutDataSets: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Last Squat",
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
                labelString: "Reps",
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
                labelString: "Weight",
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
  created() {
    this.workoutDataSets = [
      {
        label: "First Dataset",
        data: [3, 4, 5],
        borderColor: "#FF0000",
        pointBorderColor: "#FF0000",
        pointBackgroundColor: "#000000",
        backgroundColor: "#000000",
        fill: false,
        cubicInterpolationMode: "monotone"
      },
      {
        label: "Second Dataset",
        data: [3, 4, 5],
        borderColor: "#FF0000",
        pointBorderColor: "#FF0000",
        pointBackgroundColor: "#000000",
        backgroundColor: "#000000",
        fill: false,
        cubicInterpolationMode: "monotone"
      }
    ];
    // this.$props.workouts.forEach(this.createDataset);
    // this.chartOptions.title.text = this.exercise;
    // this.$props.workouts.forEach(workout => {
    //   console.log(workout.exercise);
    //   const myDataset = {
    //     label: workout.date + "  " + workout.exercise,
    //     data: workout.weights,
    //     borderColor: "#FF0000",
    //     pointBorderColor: "#FF0000",
    //     pointBackgroundColor: "#000000",
    //     backgroundColor: "#000000",
    //     fill: false,
    //     cubicInterpolationMode: "monotone"
    //   };
    //   if (this.exercise == workout.exercise) {
    //     this.workoutDataSets.push(myDataset);
    //   }
    // });
  },
  beforeMount() {
    console.table(this.$props.workouts);
  },
  methods: {
    // createDataset(workout, index) {
    //     console.log(workout.exercise);
    //   console.log(index);
    createDataset(workout) {
      console.log("hey");

      const myDataset = {
        label: workout.date + "  " + workout.exercise,
        data: workout.weights,
        borderColor: "#FF0000",
        pointBorderColor: "#FF0000",
        pointBackgroundColor: "#000000",
        backgroundColor: "#000000",
        fill: false,
        cubicInterpolationMode: "monotone"
      };
      if (this.exercise == workout.exercise) {
        this.workoutDataSets.push(myDataset);
      }
    }
  },

  mounted() {
    this.renderChart(
      {
        labels: [3, 3, 3, 3, 3, 3, 3],
        datasets: this.workoutDataSets
      },
      this.chartOptions
    );
    this.$data._chart.update();
  }
};
</script>
