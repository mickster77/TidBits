<script>
import { Scatter } from "vue-chartjs";

export default {
  extends: Scatter,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    },
    chartColors: {
      type: Object
    }
  },
  mounted() {
    // const dates = this.chartData.map(d => d.date).reverse();
    // const totals = this.chartData.map(d => d.total).reverse();

    const {
      borderColor,
      pointBorderColor,
      pointBackgroundColor,
      backgroundColor
    } = this.chartColors;

    this.renderChart(
      {
        datasets: [
          {
            label: this.label,
            data: [
              { x: 1, y: 2 },
              { x: 2, y: 4 }
            ],
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor
          }
        ]
      },
      this.options
    );
  }
};
</script>
