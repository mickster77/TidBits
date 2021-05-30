<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Random Tidbit</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>{{tidbit.tidBit}}</v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <!-- <v-card>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>-->
  </v-dialog>
</template>

<script>
export default {
  name: "ViewTidBit",
  props: ["value", "tidbit"],
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>