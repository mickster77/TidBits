<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card color="red">
          <v-tabs v-model="tab" centered>
            <v-tabs-slider></v-tabs-slider>
            <v-tab>Add Kid</v-tab>
            <v-tab>Add Chore</v-tab>
            <v-tab>View Chores</v-tab>
            <v-tab>Rewards</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <AddChild />
            </v-tab-item>
            <v-tab-item>
              <AddChore />
            </v-tab-item>
            <v-tab-item>
              <ChoreList />
            </v-tab-item>
            <v-tab-item>
              <Reward />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChoreList from "@/components/ChoreBoard/ChoreList";
import AddChore from "@/components/ChoreBoard/AddChore";
import AddChild from "@/components/ChoreBoard/AddChild";
import Reward from "@/components/ChoreBoard/Reward";

export default {
  name: "ChoreBoard",
  components: {
    ChoreList,
    AddChore,
    AddChild,
    Reward
  },
  data() {
    return {
      tab: null,
      childName: null
    };
  }
};
</script>

<style>
</style>