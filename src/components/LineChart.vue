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
    chartData: {
      type: Array
    },
    chartLabels: {
      type: Array
    },
    options: {
      type: Object
    }
    // chartColors: {
    //   type: Object
    // }
  },
  mounted() {
    const dates = this.chartLabels;
    const totals = this.chartData;

    // const {
    //   borderColor,
    //   pointBorderColor,
    //   pointBackgroundColor,
    //   backgroundColor
    // } = this.chartColors;

    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: totals,
            borderColor: "#077187",
            pointBorderColor: "#0E1428",
            pointBackgroundColor: "#AFD6AC",
            backgroundColor: "#74A57F",
            fill: false
          }
        ]
      },
      this.options
    );
    this.$data._chart.update();
  }
};
</script>
