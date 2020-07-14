<template>
  <div>
    <v-card color="cardColor">
      <v-card-title>Add Reward</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="reward name"></v-text-field>
        <v-text-field v-model="points" label="points"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="addReward">Submit</v-btn>
      </v-card-actions>
      <v-card-text class="red--text">
        <h3 v-show="feedback">{{feedback}}</h3>
      </v-card-text>
    </v-card>
    <!-- all rewards  -->
    <v-card class="ma-auto my-4">
      <v-card-title primary-title class="justify-center display-1">All Rewards</v-card-title>
      <v-list three-line subheader>
        <v-list-item v-for="(item, index) in availRewards" :key="index" @click="itemClick">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle>
              <p class="my-3">Points: {{item.points}}</p>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="deleteReward(item.id)">Delete</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- redeemed rewards  -->

    <v-card class="ma-auto my-4">
      <v-card-title primary-title class="justify-center display-1">Redeemed Rewards</v-card-title>
      <v-list three-line subheader>
        <v-list-item v-for="(item, index) in redeemedRewards" :key="index" @click="itemClick">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle>
              <p class="my-3">Child: {{item.child}}</p>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="deleteReward(item.id)">Delete</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- used rewards  -->

    <v-card class="ma-auto my-4">
      <v-card-title primary-title class="justify-center display-1">Used Rewards</v-card-title>
      <v-list three-line subheader>
        <v-list-item v-for="(item, index) in usedRewards" :key="index" @click="itemClick">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle>
              <p class="my-3">Child: {{item.child}}</p>
              <p class="my-3">Date used: {{item.dateUsed}}</p>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="deleteReward(item.id)">Delete</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import db from "@/firebase/init";
// import firebase from "firebase";
// import moment from "moment";

export default {
  Name: "Reward",
  data() {
    return {
      name: null,
      points: null,
      rewards: [],
      feedback: null
    };
  },
  methods: {
    addReward() {
      this.feedback = null;
      if (this.name && this.points) {
        db.collection("ChoreBoard")
          .doc(this.$store.getters.uid)
          .collection("rewards")
          .add({
            name: this.name,
            points: this.points
          })
          .then(() => {
            this.name = null;
            this.points = null;
          })
          .catch(error => {
            alert(error);
          });
      } else {
        this.feedback = "fill out the form";
      }
    },
    deleteReward(id) {
      db.collection("ChoreBoard")
        .doc(this.$store.getters.uid)
        .collection("rewards")
        .doc(id)
        .delete()
        .catch(error => {
          alert(error);
        });
    },
    itemClick() {
      console.log("click");
    }
  },
  computed: {
    redeemedRewards() {
      return this.rewards.filter(
        reward => reward.child && reward.status !== "used"
      );
    },
    usedRewards() {
      return this.rewards.filter(reward => reward.status == "used");
    },
    availRewards() {
      return this.rewards.filter(reward => !reward.child);
    }
  },
  created() {
    let newRewards = [];
    db.collection("ChoreBoard")
      .doc(this.$store.getters.uid)
      .collection("rewards")
      .onSnapshot(snapshot => {
        newRewards = [];
        snapshot.forEach(doc => {
          newRewards.push({
            id: doc.id,
            name: doc.data().name,
            points: doc.data().points,
            child: doc.data().child,
            status: doc.data().status,
            dateUsed: doc.data().dateUsed
          });
        });
        this.rewards = newRewards;
      });
  }
};
</script>

<style>
</style>