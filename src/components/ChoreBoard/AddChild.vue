<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-list two-line>
          <v-list-item v-for="child in children" :key="child.id">
            <v-list-item-content>
              <v-list-item-title>{{child.name}}</v-list-item-title>
              <v-list-item-subtitle>points: {{child.points}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-actions>
              <v-icon @click="addTen(child.id, child.points)">mdi-plus</v-icon>
              <v-icon @click="zeroPoints(child.id)">mdi-reload-alert</v-icon>
            </v-list-actions>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="9">
        <v-card flat color="cardColor">
          <v-card-title>Add Child</v-card-title>
          <v-card-text>
            <v-text-field
              label="name"
              append-outer-icon="mdi-plus"
              @click:append-outer="addChild"
              v-model="childName"
            ></v-text-field>
          </v-card-text>
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
      childName: null,
      children: []
    };
  },
  methods: {
    addChild() {
      if (this.childName !== "") {
        db.collection("ChoreBoard")
          .doc(firebase.auth().currentUser.uid)
          .collection("children")
          .add({
            name: this.childName,
            created_at: Date.now(),
            points: "0"
          })
          .then(() => {
            this.childName = null;
          })
          .catch(error => {
            alert(error);
          });
      } else {
        alert("Please enter a name");
      }
    },
    zeroPoints(id) {
      db.collection("ChoreBoard")
        .doc(firebase.auth().currentUser.uid)
        .collection("children")
        .doc(id)
        .update({
          points: "0"
        });
    },
    addTen(id, points) {
      var newPoints = parseInt(points, 10) + 5;
      db.collection("ChoreBoard")
        .doc(firebase.auth().currentUser.uid)
        .collection("children")
        .doc(id)
        .update({
          points: newPoints.toString()
        });
    }
  },
  created() {
    let newChild = [];
    // db.collection("UserOwned")
    //   .doc(firebase.auth().currentUser.uid)
    //   .collection("ChoreBoard")
    //   .doc("Children")
    //   .collection("Items")
    //   .onSnapshot(snapshot => {
    //     newChild = [];
    //     snapshot.forEach(doc => {
    //       newChild.push({
    //         id: doc.id,
    //         name: doc.data().name,
    //         points: doc.data().points
    //       });
    //     });
    //     this.children = newChild;
    //   });
    db.collection("ChoreBoard")
      .doc(firebase.auth().currentUser.uid)
      .collection("children")
      .onSnapshot(snapshot => {
        newChild = [];
        snapshot.forEach(doc => {
          newChild.push({
            id: doc.id,
            name: doc.data().name,
            points: doc.data().points
          });
        });
        this.children = newChild;
      });
  },
  computed: {}
};
</script>

<style>
</style>