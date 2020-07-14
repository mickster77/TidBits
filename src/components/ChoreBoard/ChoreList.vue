<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-btn @click="gotoLink">Link</v-btn>
      </v-col>
      <v-col cols="10">
        <v-card class="mx-auto my-4">
          <v-card-title primary-title class="justify-center display-1">Open Chores</v-card-title>
          <v-list three-line subheader>
            <v-list-item
              v-for="(chore, index) in openChores"
              :key="index"
              @click="itemClick"
              color="cardColor"
            >
              <v-list-item-content>
                <v-list-item-title v-text="chore.name"></v-list-item-title>
                <v-list-item-subtitle>
                  <p class="my-3">Points: {{chore.points}}</p>
                  <p>Child: {{chore.child}}</p>
                </v-list-item-subtitle>
                <v-list-item-subtitle>Date Assigned: {{chore.dateAssigned}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="error" @click="deleteChore(chore.id)">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="ma-auto my-4">
          <v-card-title primary-title class="justify-center display-1">Completed Chores</v-card-title>
          <v-list three-line subheader>
            <v-list-item v-for="(chore, index) in completedChores" :key="index" @click="itemClick">
              <v-list-item-content>
                <v-list-item-title v-text="chore.name"></v-list-item-title>
                <v-list-item-subtitle>
                  <p class="my-3">Points: {{chore.points}}</p>
                  <p>Child: {{chore.child}}</p>
                </v-list-item-subtitle>
                <v-list-item-subtitle>Date Completed: {{chore.dateCompleted}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="error" @click="deleteChore(chore.id)">mdi-delete</v-icon>
                </v-btn>
                <v-btn>Make Open</v-btn>
                <v-btn>Reactivate</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  data() {
    return {
      chores: []
    };
  },
  methods: {
    deleteChore(id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("ChoreBoard")
        .doc("Chores")
        .collection("Items")
        .doc(id)
        .delete();
    },
    gotoLink() {
      this.$router.push({
        name: "viewChoreBoard",
        params: { id: "5uVheVmJvpdyb50U9mLbDoSWW9l1" }
      });
    }
  },
  computed: {
    openChores() {
      return this.chores.filter(chore => chore.completed !== true);
    },
    completedChores() {
      return this.chores.filter(chore => chore.completed == true);
    }
  },
  created() {
    let newChores = [];
    db.collection("ChoreBoard")
      .doc(this.$store.getters.uid)
      .collection("chores")
      .onSnapshot(snapshot => {
        newChores = [];
        snapshot.forEach(doc => {
          newChores.push({
            id: doc.id,
            name: doc.data().name,
            points: doc.data().points,
            child: doc.data().child,
            completed: doc.data().completed,
            dateCompleted: doc.data().dateCompleted,
            dateAssigned: doc.data().dateAssigned
          });
        });
        this.chores = newChores;
      });
  }
};
</script>

<style>
</style>