.<template>
  <div>
    <div>
      <v-data-table
        :headers="headers"
        :items="workouts"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        show-expand
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>All Workouts</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <span>The date is {{ item.date }}</span>
          </td>
        </template>
        <template v-slot:item.minWeight="{item}">
          <v-chip color="primary" dark>{{Math.min(...item.weights) }}</v-chip>
        </template>
        <template v-slot:item.maxWeight="{item}">
          <v-chip color="primary" dark>{{Math.max(...item.weights) }}</v-chip>
        </template>
        <template v-slot:item.reps="{item}">
          <v-chip color="primary" dark>{{totalReps(item.reps)}}</v-chip>
        </template>
        <template v-slot:item.date="{item}">
          <span color="primary" dark>The date is: {{item.date}}</span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workouts: null
  },
  data() {
    return {
      expanded: [],
      search: "",
      menu2: false,

      singleExpand: true,
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "date"
        },
        { text: "Exercise", value: "exercise" },
        {
          text: "Min Weight",
          value: "minWeight"
        },
        {
          text: "Max Weight",
          value: "maxWeight"
        },
        {
          text: "Total Reps",
          value: "reps"
        },
        {
          text: "Change Date",
          value: "data-table-expand"
        }
      ]
    };
  },
  methods: {
    printWorkout(id) {
      console.log(id);
    },
    totalReps(reps) {
      return reps.reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  }
};
</script>

<style>
</style>