<template>
  <v-card>
    <v-card-title>
      <span class="headline">Log Workout</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field label="Title" required v-model="workoutTitle"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-combobox v-model="workoutType" :items="workoutTypes" label="Workout Type" required></v-combobox>
          </v-col>

          <v-dialog v-model="dateDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-col xs="12" sm="6">
                <v-text-field v-model="picker" label="date" v-on="on"></v-text-field>
              </v-col>
            </template>
            <v-card>
              <v-date-picker v-model="picker"></v-date-picker>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- Strength  -->
        <v-row v-if="workoutType=='Strength'">
          <!-- baseline  -->
          <v-col cols="12" sm="6">
            <v-text-field clearable ref="repField" label="#Reps" v-model="anotherRep"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Weight"
              hint="hit enter for next set"
              v-model="anotherWeight"
              @keydown.enter="addSet"
              clearable
            ></v-text-field>
          </v-col>
          <!-- Added Sets  -->
          <v-col cols="12">
            <v-container>
              <v-row v-for="(set, index) in reverseSets" :key="index" class="ma-0 pa-0">
                <v-col cols="6" sm="6" class="ma-0 pa-0">
                  <v-text-field
                    prepend-icon="mdi-delete"
                    v-model="sets[index].reps"
                    @click:prepend="deleteSet(index)"
                    class="ma-0 pa-0"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" class="ma-0 pa-0">
                  <v-text-field
                    v-model="sets[index].weight"
                    @keydown.enter="addSet"
                    class="ma-0 py-0 pl-3"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <!-- table attempt 
          -->
          <v-col cols="12" v-show="false">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Set #</th>
                    <th class="text-left">Reps</th>
                    <th class="text-left">Weight</th>
                    <th class="text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="item in desserts" :key="item.name"> -->
                  <tr v-for="(set, index) in reverseSets" :key="index">
                    <td>{{ index + 1 }}</td>
                    <!-- <td>{{ set.reps }}</td> -->
                    <td>
                      <v-text-field v-model="sets[index].reps" centered></v-text-field>
                    </td>
                    <td>
                      <v-text-field v-model="sets[index].weight"></v-text-field>
                    </td>
                    <td @click="deleteSet(index)">
                      <v-icon>mdi-delete</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12">
            <v-textarea label="workout notes" v-model="workoutNotes"></v-textarea>
          </v-col>
        </v-row>
        <!-- Metcon  -->
        <v-row v-if="workoutType=='Metcon'">
          <v-col>
            <p>Metcon</p>
          </v-col>
        </v-row>
        <!-- Other  -->
        <v-row v-show="workoutType=='Other'">
          <v-col>
            <v-textarea label="Description" v-model="otherWorkoutDescription"></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" text @click="saveWorkout">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init"; //needed for database call
// import firebase from "firebase"; // needed for user auth

export default {
  props: {
    title: null
  },
  data() {
    return {
      // log workout title
      workoutTypes: ["Strength", "Metcon", "Other"],
      workoutTitle: this.$props.title,
      workoutType: "Strength",
      workoutNotes: null,
      otherWorkoutDescription: null,
      // date
      picker: moment(Date.now()).format("YYYY-MM-DD"),
      dateDialog: false,

      //Strength
      sets: [],
      anotherWeight: null,
      anotherRep: null,

      //
      previousWorkout: false
    };
  },
  methods: {
    addSet() {
      let mySet = {
        reps: this.anotherRep,
        weight: this.anotherWeight
      };
      this.clearAnother();
      this.sets.push(mySet);
      this.$refs.repField.focus();
    },
    deleteSet(index) {
      console.log(index);
      this.sets.splice(index, 1);
    },
    clearAnother() {
      this.anotherRep = null;
      this.anotherWeight = null;
    },
    clearForm() {
      this.clearAnother();
      this.workoutTitle = null;
      this.workoutType = null;
      this.sets = null;
    },
    saveWorkout() {
      if (this.workoutTitle !== "") {
        db.collection("UserOwned")
          .doc(this.$store.getters.uid)
          .collection("Workout")
          .add({
            title: this.workoutTitle,
            type: this.workoutType,
            sets: this.sets,
            notes: this.workoutNotes,
            created_at: Date.now(),
            date: this.picker
          })
          .then(() => {
            this.clearForm();
            this.closeDialog();
          })
          .catch(error => {
            alert(error);
          });
      } else {
        alert("Please enter a title");
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  created() {
    if (this.$store.getters.workoutTitle) {
      alert("previous workout: ");
      this.workoutTitle = this.$store.getters.workoutTitle;
      this.previousWorkout = true;
    }
  },
  computed: {
    reverseSets() {
      let myArrary = this.sets;
      return myArrary.reverse();
    }
  }
};
</script>

<style>
</style>