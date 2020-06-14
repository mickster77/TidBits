<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  mixins: reactiveProp,
  extends: Line,
  props: {
    label: {
      type: String
    },
    label2: {
      type: String
    },
    chartData: {
      type: Array
    },
    chartData2: {
      type: Array
    },
    chartLabels: {
      type: Array
    },
    options: {
      type: Object
    },
    workouts: {
      type: Array
    },
    exercise: {
      type: String
    }
    // chartColors: {
    //   type: Object
    // }
  },
  data() {
    return {
      workoutDataSets: [],
      colors: [
        "#FF000000",
        "#00FF00",
        "#0000FF",
        "#FF000000",
        "#00FF00",
        "#0000FF",
        "#FF000000",
        "#00FF00",
        "#0000FF"
      ]
    };
  },
  created() {
    this.workouts.forEach(this.createDataset);
  },
  mounted() {
    // const labels = this.chartLabels;
    // const labels2 = this.chartLabels2;
    // const data = this.chartData;
    // const data2 = this.chartData2;

    // const {
    //   borderColor,
    //   pointBorderColor,
    //   pointBackgroundColor,
    //   backgroundColor
    // } = this.chartColors;

    // if (data2) {
    //   this.renderChart(
    //     {
    //       labels: labels,
    //       labels2: labels2,
    //       datasets: [
    //         {
    //           label: this.label,
    //           data: data,
    //           borderColor: "#00FF00",
    //           pointBorderColor: "#00FF00",
    //           pointBackgroundColor: "#000000",
    //           backgroundColor: "#000000",
    //           fill: false
    //         },
    //         {
    //           label: this.label2,
    //           data: data2,
    //           borderColor: "#FF0000",
    //           pointBorderColor: "#FF0000",
    //           pointBackgroundColor: "#000000",
    //           backgroundColor: "#000000",
    //           fill: false,
    //           cubicInterpolationMode: "monotone"
    //         }
    //       ]
    //     },
    //     this.options
    //   );
    // } else {
    //   this.renderChart(
    //     {
    //       labels: labels,
    //       datasets: [
    //         {
    //           label: this.label,
    //           data: data,
    //           borderColor: "#FF0000",
    //           pointBorderColor: "#FF0000",
    //           pointBackgroundColor: "#000000",
    //           backgroundColor: "#000000",
    //           fill: false,
    //           cubicInterpolationMode: "monotone"
    //         }
    //       ]
    //     },
    //     this.options
    //   );
    // }

    this.renderChart(
      {
        labels: [3, 3, 3, 3, 3, 3, 3],
        datasets: this.workoutDataSets
      },
      this.options
    );

    this.$data._chart.update();
  },
  methods: {
    createDataset(workout) {
      // createDataset(workout, index) {
      // console.log(index);
      if (
        this.exercise == workout.exercise &&
        this.workoutDataSets.length < 3
      ) {
        const myDataset = {
          label: workout.date,
          data: workout.weights,
          borderColor: "red",
          pointBorderColor: "green",
          pointBackgroundColor: "#green",
          backgroundColor: "#000000",
          fill: false,
          cubicInterpolationMode: "monotone"
        };
        this.workoutDataSets.push(myDataset);
      }
    }
  }
};
</script>
