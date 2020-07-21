<template>
  <v-container>
    <!-- <v-row>
      <v-col xs="12" md="6" lg="4">
        <HabitComponent name="Pushups" />
      </v-col>
      <v-col xs="12" md="6" lg="4">
        <HabitComponent name="Pullups" />
      </v-col>
      <v-col xs="12" md="6" lg="4">
        <HabitComponent name="Squats" />
      </v-col>
    </v-row>-->

    <v-row>
      <v-col xs="12" md="6" lg="4" v-for="(item, index) in habits" :key="index">
        <HabitComponent :name="item.name" :startDate="item.startDate" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          label="New Habit"
          v-model="newHabit"
          append-outer-icon="mdi-plus"
          @click:append-outer="addHabit()"
          color="accent"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth
import HabitComponent from "@/components/Tracker/HabitComponent.vue";

export default {
  name: "Habits",
  components: { HabitComponent },
  data() {
    return {
      newHabit: null,
      habits: []
    };
  },
  async created() {
    this.habits = [];
    let newHabits = [];
    db.collection("UserShared")
      .doc(firebase.auth().currentUser.displayName)
      .collection("Habits")
      .onSnapshot(snapshot => {
        newHabits = [];
        snapshot.forEach(doc => {
          newHabits.push({
            name: doc.data().name,
            id: doc.id,
            startDate: doc.data().startDate
          });
        });
        this.habits = newHabits;
      });
  },
  methods: {
    addHabit() {
      if (this.habits.length > 5) {
        alert("too many habits");
        return;
      }
      // if (this.habits.filter(habit => habit.name === this.newHabit)) {
      //   alert("duplicate habit");
      //   return;
      // }
      if (this.newHabit !== null) {
        let docRef = db
          .collection("UserShared")
          .doc(firebase.auth().currentUser.displayName)
          .collection("Habits")
          .doc(this.newHabit);

        docRef.get().then(doc => {
          if (doc.exists) {
            alert("you already have a habit for that...");
          } else {
            docRef
              .set({
                name: this.newHabit,
                created_at: Date.now(),
                startDate: moment(Date.now()).format("YYYY-MM-DD")
              })
              .then(() => {
                this.newHabit = null;
              })
              .catch(error => {
                alert(error);
              });
          }
        });
      } else {
        alert("Please enter a habit");
      }
    }
  },
  computed: {}
};
</script>

<style>
</style>