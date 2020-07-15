<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          label="New Topic"
          v-model="newTopic"
          append-outer-icon="mdi-plus"
          @click:append-outer="addTopic()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TrackerComponent name="Pushups" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TrackerComponent name="Pullups" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth
import TrackerComponent from "@/components/Tracker/TrackerComponent.vue";

export default {
  name: "Tracker",
  components: { TrackerComponent },
  data() {
    return {
      newTopic: null,
      topics: []
    };
  },
  async created() {
    this.topics = [];
    let newTopics = [];
    db.collection("UserShared")
      .doc(firebase.auth().currentUser.displayName)
      .collection("Topics")
      .orderBy("date", "desc")
      //   .orderBy("date")

      .onSnapshot(snapshot => {
        newTopics = [];
        snapshot.forEach(doc => {
          newTopics.push({
            name: doc.data().name,
            id: doc.id,
            date: doc.data().date
          });
        });
        this.topics = newTopics;
      });
  },
  methods: {
    addTopic() {
      if (this.topics.length > 1) {
        alert("too many topics");
        return;
      }
      if (this.newTopic !== null) {
        db.collection("UserShared")
          .doc(firebase.auth().currentUser.displayName)
          .collection("Topics")
          .add({
            name: this.newTopic,
            created_at: Date.now(),
            date: moment(Date.now()).format("YYYY-MM-DD")
          })
          .then(() => {
            this.newTopic = null;
          })
          .catch(error => {
            alert(error);
          });
      } else {
        alert("Please enter a topic");
      }
    },
    addOne(topicName) {
      let todayDate = moment(Date.now()).format("YYYY-MM-DD");
      var docRef = db
        .collection("UserShared")
        .doc(firebase.auth().currentUser.displayName)
        .collection(topicName)
        .doc(todayDate);
      docRef.update({
        reps: firebase.firestore.FieldValue.increment(1)
      });
      // Atomically increment the population of the city by 50.
    }
  }
};
</script>

<style>
</style>