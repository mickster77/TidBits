<template>
  <v-card flat>
    <v-card-title class="justify-center">Add New Weight</v-card-title>
    <!-- <v-card-text>{{baseWeight}}</v-card-text>
    <v-card-text>{{adjustWeight}}</v-card-text>-->
    <v-card-text class="display-4 text-center">{{newWeight}}</v-card-text>
    <v-slider
      v-model="adjustWeight"
      :step="step"
      :min="min"
      :max="max"
      append-icon="mdi-plus"
      prepend-icon="mdi-minus"
      @click:append="incrementWeight"
      @click:prepend="decrementWeight"
    ></v-slider>
    <v-card-text class="red--text text-center">{{feedback}}</v-card-text>

    <v-card-actions>
      <v-btn text color="success" @click="addWeight">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import db from "@/firebase/init"; //needed for database call
import moment from "moment";

export default {
  props: {
    baseWeight: { type: Number, required: true }
  },
  data() {
    return {
      // Weight Slider
      adjustWeight: 0,
      step: 0.1,
      min: -10,
      max: 10,
      feedback: null
    };
  },
  methods: {
    incrementWeight() {
      this.adjustWeight = this.adjustWeight + this.step;
      this.feedback = null;
    },
    decrementWeight() {
      this.adjustWeight = this.adjustWeight - this.step;
      this.feedback = null;
    },
    addWeight() {
      let uid = this.$store.getters.uid;

      if (this.newWeight !== "") {
        db.collection("UserOwned")
          .doc(uid)
          .collection("Weight")
          .add({
            weight: this.newWeight,
            created_at: Date.now(),

            date: moment(Date.now()).format("YYYY-MM-DD")
          })
          .then(() => {
            this.adjustWeight = 0;
            this.feedback = "Weight Saved!";
          })
          .catch(error => {
            alert(error);
          });
      } else {
        alert("Please enter a weight");
      }
    }
  },
  computed: {
    newWeight() {
      let myWeight = this.baseWeight + this.adjustWeight;
      return Math.round(myWeight * 10) / 10;
    }
  }
};
</script>

<style>
</style>