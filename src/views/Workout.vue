<template>
  <!-- headline -->
  <div>
    <v-container fluid>
      <v-row justify-center>
        <v-col>
          <v-card>
            <v-card-title primary-title class="justify-center display-3">Workout App</v-card-title>
            <v-card-text>Workout Description</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container grid-list-lg>
      <v-row>
        <!-- log workout 
        need code-->

        <!-- add new workout  -->
        <v-col>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Add New Workout</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add New Workout</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Title*" required v-model="NewWorkoutTitle"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-combobox
                        v-model="workoutType"
                        :items="workoutTypes"
                        label="Workout Type*"
                        required
                      ></v-combobox>
                      <p>Workout Type:: {{workoutType}}</p>
                    </v-col>
                  </v-row>
                  <v-row v-show="workoutType=='Strength'">
                    <v-col cols="12">
                      <p class="text-center headline red--text">Strength</p>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select :items="numSetsPossible" label="Number of Sets"></v-select>
                    </v-col>
                  </v-row>

                  <v-row v-show="workoutType=='Metcon'">
                    <v-col>
                      <p>Metcon</p>
                    </v-col>
                  </v-row>
                  <v-row v-show="workoutType=='Other'">
                    <v-col>
                      <v-textarea label="Description" v-model="otherWorkoutDescription"></v-textarea>
                      <p>Other</p>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>

    <!-- Thoughts -->
    <v-container fluid>
      <v-row justify-center>
        <v-col>
          <v-card>
            <v-card-title primary-title class="justify-center display-3">Thoughts</v-card-title>
            <v-card-text>
              <p>So, a workout app. Let's see. A workout app need the following functionality.</p>
              <ul>
                <li>Log Workouts</li>
                <li>View Progress</li>
              </ul>
              <p>
                The main object of the app will be a
                <b>workout</b> object. The workout object has the following properties
              </p>

              <ul>
                <li>Title</li>
                <span>The title of the workout. Eg, Helen, BP 7x3</span>
                <li>Type</li>
                <span>The Type can be Metcon, Strength, or Generic</span>
                <li>Score</li>
                <span>Score is only define for workouts that are defined. For instance, if a workout is Generic, it will not have a score. So it is good to define Workouts.</span>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      workoutTypes: ["Strength", "Metcon", "Other"],
      NewWorkoutTitle: null,
      workoutTitles: ["title1", "title2", "title3"],
      workoutType: null,
      otherWorkoutDescription: null,
      numSetsPossible: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }
};
</script>

<style>
</style>