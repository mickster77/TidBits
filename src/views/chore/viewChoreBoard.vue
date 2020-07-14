<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs v-model="tab" centered>
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="kid in children" :key="kid.id">{{kid.name}}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(kid, index) in children" :key="index">
              <v-container>
                <v-row>
                  <v-col md="3" sm="12">
                    <v-card class="mx-auto my-4">
                      <v-card-title>Points:</v-card-title>
                      <v-card-text>
                        <p class="headline">{{kid.points}}</p>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col md="9" sm="12">
                    <!-- my chores -->
                    <v-card class="mx-auto my-4">
                      <v-card-title primary-title class="justify-center display-1">My Chores</v-card-title>
                      <v-list three-line subheader>
                        <v-list-item
                          v-for="(chore, index) in myChores"
                          :key="index"
                          @click="itemClick"
                          color="cardColor"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="chore.name"></v-list-item-title>
                            <v-list-item-subtitle>Points: {{chore.points}}</v-list-item-subtitle>
                            <v-list-item-subtitle>Date Assigned: {{chore.dateAssigned}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon>
                              <v-icon
                                color="primary"
                                @click="doneChore(chore)"
                              >mdi-checkbox-blank-outline</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <!-- open chores -->
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
                            <v-list-item-subtitle>Points: {{chore.points}}</v-list-item-subtitle>
                            <v-list-item-subtitle>Date Assigned: {{chore.dateAssigned}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon>
                              <v-icon
                                color="primary"
                                @click="doneChore(chore)"
                              >mdi-checkbox-blank-outline</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>

                    <!-- completed chores -->
                    <v-card class="ma-auto my-4">
                      <v-card-title
                        primary-title
                        class="justify-center display-1"
                      >My Completed Chores</v-card-title>
                      <v-list three-line subheader>
                        <v-list-item
                          v-for="(chore, index) in myCompletedChores"
                          :key="index"
                          @click="itemClick"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="chore.name"></v-list-item-title>
                            <v-list-item-subtitle>Points: {{chore.points}}</v-list-item-subtitle>
                            <v-list-item-subtitle>Date Completed: {{chore.dateCompleted}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <!-- <v-btn icon>
                              <v-icon color="error" @click="deleteChore(chore)">mdi-delete</v-icon>
                            </v-btn>-->
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <!-- My Rewards  -->
                    <v-card class="mx-auto my-4">
                      <v-card-title class="justify-center display-1">My Rewards</v-card-title>
                      <v-list three-line subheader>
                        <v-list-item
                          v-for="(item, index) in myRewards"
                          :key="index"
                          @click="itemClick"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                            <v-list-item-subtitle>child: {{item.child}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn @click="useReward(item.id)">Use Reward</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <!-- Rewards  -->
                    <v-card class="mx-auto my-4">
                      <v-card-title class="justify-center display-1">Rewards</v-card-title>
                      <v-list three-line subheader>
                        <v-list-item v-for="(item, index) in openRewards" :key="index">
                          <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                            <v-list-item-subtitle>points: {{item.points}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn
                              color="primary"
                              text
                              @click="buyReward(item.name, item.points)"
                            >Buy</v-btn>
                            <v-btn color="blue" dark @click="sheet = !sheet">Open bottm</v-btn>
                            <v-btn color="blue" dark @click="buyDialog">Buy Reward</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="red" @click="sheet = !sheet">close</v-btn>
        <div
          class="py-3"
        >This is a bottom sheet using the controlled by v-model instead of activator</div>
      </v-sheet>
    </v-bottom-sheet>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Buy reward?</v-card-title>
        <v-card-text>Are you sure you want to buy the reward?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>

          <v-btn color="green darken-1" text @click="buyReward = false">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// import ChoreList from "@/components/ChoreBoard/ChoreList";
// import AddChore from "@/components/ChoreBoard/AddChore";
import db from "@/firebase/init";
// import firebase from "firebase";
import moment from "moment";

export default {
  name: "viewChoreBoard",
  components: {},
  data() {
    return {
      tab: null,
      uid: this.$route.params.id,
      children: ["dave", "dan"],
      chores: [],
      rewards: [],

      // Buy Dialog
      sheet: false,
      dialog: false,
      buyName: null,
      buyPoints: null
    };
  },
  methods: {
    doneChore(chore) {
      var newPoints =
        Number(this.children[this.tab].points) + Number(chore.points);
      // update kid points
      db.collection("ChoreBoard")
        .doc(this.$route.params.id)
        .collection("children")
        .doc(this.children[this.tab].id)
        .update({
          points: newPoints.toString()
        })
        .then(() => {
          //update chore completed
          db.collection("ChoreBoard")
            .doc(this.$route.params.id)
            .collection("chores")
            .doc(chore.id)
            .update({
              completed: true,
              child: this.children[this.tab].name,
              dateCompleted: moment(Date.now()).format("YYYY-MM-DD")
            });
        });
    },
    deleteChore(chore) {
      db.collection("ChoreBoard")
        .doc(this.$route.params.id)
        .collection("chores")
        .doc(chore.id)
        .delete();
    },
    buyDialog(name, points) {
      this.dialog = true;
      this.buyReward = name;
      this.buyPoints = points;
    },
    buyReward(name, points) {
      // console.log(name);
      // console.log(points);
      console.log(this.selectedKid);

      var newPoints = Number(this.children[this.tab].points) - Number(points);
      if (newPoints < 0) {
        alert("Your Dad does not like it when you have negative points...");
      }
      db.collection("ChoreBoard")
        .doc(this.$route.params.id)
        .collection("rewards")
        .add({
          name: name,
          child: this.selectedKid,
          dateRedeemed: moment(Date.now()).format("YYYY-MM-DD")
        })
        .then(() => {
          //update child points
          db.collection("ChoreBoard")
            .doc(this.$route.params.id)
            .collection("children")
            .doc(this.children[this.tab].id)
            .update({
              points: newPoints.toString()
            });
          this.dialog = false;
        })
        .catch(error => {
          alert(error);
        });
    },
    useReward(id) {
      db.collection("ChoreBoard")
        .doc(this.$route.params.id)
        .collection("rewards")
        .doc(id)
        .update({
          status: "used",
          dateUsed: moment(Date.now()).format("YYYY-MM-DD")
        })
        .catch(error => {
          alert(error);
        });
    },
    itemClick() {
      alert("item click");
    }
  },
  computed: {
    myChores() {
      return this.chores.filter(
        chore => chore.completed !== true && chore.child == this.selectedKid
      );
    },
    openChores() {
      return this.chores.filter(
        chore => chore.completed !== true && !chore.child
      );
    },
    myCompletedChores() {
      return this.chores.filter(
        chore => chore.completed == true && chore.child == this.selectedKid
      );
    },
    selectedKid() {
      return this.children[this.tab].name;
    },
    myRewards() {
      return this.rewards.filter(reward => {
        if (reward.child && reward.status !== "used") {
          return true;
        } else {
          return false;
        }
      });
    },
    openRewards() {
      return this.rewards.filter(reward => Number(reward.points) > 0);
    }
  },
  created() {
    console.log(this.$route.params.id);
    let newChild = [];
    db.collection("ChoreBoard")
      .doc(this.$route.params.id)
      .collection("children")
      .onSnapshot(snapshot => {
        newChild = [];
        snapshot.forEach(doc => {
          newChild.push({
            name: doc.data().name,
            points: doc.data().points,
            id: doc.id
          });
        });
        this.children = newChild;
      });

    let newChores = [];
    db.collection("ChoreBoard")
      .doc(this.$route.params.id)
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
            dateAssigned: doc.data().dateAssigned,
            dateCompleted: doc.data().dateCompleted
          });
        });
        this.chores = newChores;
      });
    //rewards
    let newRewards = [];
    db.collection("ChoreBoard")
      .doc(this.$route.params.id)
      .collection("rewards")
      .onSnapshot(snapshot => {
        newRewards = [];
        snapshot.forEach(doc => {
          newRewards.push({
            id: doc.id,
            name: doc.data().name,
            points: doc.data().points,
            child: doc.data().child,
            status: doc.data().status
          });
        });
        this.rewards = newRewards;
      });
  }
};
</script>

<style>
</style>