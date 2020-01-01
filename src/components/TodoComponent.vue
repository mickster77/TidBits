<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title class="justify-center display-1">{{name}} todo list</v-card-title>
            <v-card-text>
              <v-list v-for="(item, key) in items" :key="key">
                <v-list-tile v-if="item.completed">
                  <span class="completed">{{item.title}}</span>
                  <v-spacer></v-spacer>
                  <v-btn flat icon @click="deleteItem(item.id)">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                  <!-- <v-btn flat icon @click="showItemDetail(item.id)">
                    <v-icon color="green">info</v-icon>
                  </v-btn>-->
                  <v-btn flat icon @click="markIncomplete(item.id)">
                    <v-icon color="green">done</v-icon>
                  </v-btn>
                </v-list-tile>
                <v-list-tile v-else>
                  <span>{{item.title}}</span>
                  <v-spacer></v-spacer>
                  <!-- <v-btn flat icon @click="showItemDetail(item.id)">
                    <v-icon color="green">info</v-icon>
                  </v-btn>-->

                  <v-btn flat icon @click="markComplete(item.id)">
                    <v-icon color="green">crop_din</v-icon>
                  </v-btn>
                </v-list-tile>

                <v-list-tile-content v-if="item.body">{{item.body}}</v-list-tile-content>
              </v-list>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="New Todo"
                    type="text"
                    v-model="myTodo"
                    @keyup.enter="addToDo"
                  ></v-text-field>
                </v-flex>
                <v-flex p>
                  <v-btn flat icon @click="addToDo">
                    <v-icon color="green">add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-card-text v-if="errors" class="red--text">{{ errors }}</v-card-text>
            </v-card-text>
            <!-- dropdown menu -->
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">Dropdown</v-btn>
              </template>

              <v-list>
                <v-btn @click="dialog=true">Delete</v-btn>
                <!-- <router-link :to="{name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}"> -->

                <v-btn @click="movetoEnd">Move to End</v-btn>
                <v-btn @click="clearCompleted">Clear Completed</v-btn>
              </v-list>
            </v-menu>

            <!-- dropdown menu -->
            <!-- dialog popup -->
            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>Delete the list?</v-card-title>
                <v-card-actions>
                  <v-btn @click.stop="deleteList">Yes</v-btn>
                  <v-btn @click.stop="dialog=false">No</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- dialog popup -->
            <!-- todo detail dialog popup -->
            <v-dialog v-model="todoDialog" max-width="600px">
              <v-card>
                <v-card-title>Todo Details</v-card-title>
                <v-card-text>{{itemDetail.title}}</v-card-text>
                <v-card-text>{{itemDetail.body}}</v-card-text>

                <v-btn @click.stop="todoDialog=false">Close</v-btn>
              </v-card>
            </v-dialog>
            <!-- todo detail dialog popup -->
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init"; //needed for database call

export default {
  name: "ToDo",
  props: ["name"],
  data() {
    return {
      myTodo: "",
      errors: "",
      items: [],
      dialog: false,
      todoDialog: false,
      detailID: null,
      itemDetail: { title: "someTitle", body: "someBody" },
      title: null,
      body: null,
      completed: false,
      deleteID: null,
      menuItems: [
        { title: "Delete", action: "dialog=true" },
        { title: "Manage", action: "deleteList" },
        { title: "Move to End", action: "deleteList" }
      ]
    };
  },

  created: function() {
    this.items = [];
    let newItems = [];
    db.collection("UserOwned")
      .doc(firebase.auth().currentUser.uid)
      .collection("ToDos")
      .doc(this.$props.name)
      .collection("items")
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        newItems = [];
        snapshot.forEach(doc => {
          newItems.push({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            completed: doc.data().completed
          });
        });
        this.items = newItems;
      });
  },

  methods: {
    addToDo() {
      this.errors = "";
      if (this.myTodo !== "") {
        db.collection("UserOwned")
          .doc(firebase.auth().currentUser.uid)
          .collection("ToDos")
          .doc(this.$props.name)
          .collection("items")
          .add({
            title: this.myTodo,
            created_at: Date.now()
          })
          .then(response => {
            if (response) {
              this.myTodo = "";
            }
          })
          .catch(error => {
            this.errors = error;
          });
      } else {
        this.errors = "Please enter some text";
      }
    },
    deleteList() {
      let id = this.$props.name;
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("ToDos")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted");
        })
        .catch(function(error) {
          this.error = error;
        });

      this.dialog = false;
    },
    deleteItem: function(id) {
      if (id) {
        db.collection("UserOwned")
          .doc(firebase.auth().currentUser.uid)
          .collection("ToDos")
          .doc(this.$props.name)
          .collection("items")
          .doc(id)
          .delete()
          .then(function() {
            // console.log("Document successfully deleted");
          })
          .catch(function(error) {
            this.error = error;
          });
      } else {
        this.error = "Invalid ID";
      }
    },

    showItemDetail: function(id) {
      console.log(id);
      // this.detailID = id;
      // this.todoDialog = true;
      // let title = null;
      // let body = null;
      // var docRef = db
      //   .collection("UserOwned")
      //   .doc(firebase.auth().currentUser.uid)
      //   .collection("ToDos")
      //   .doc(this.$props.name)
      //   .collection("items")
      //   .doc(id);
      // docRef
      //   .get()
      //   .then(doc => {
      //     if (doc.data().title) {
      //       title = doc.data().title;
      //       console.log(title);
      //       this.itemDetail.title = title;
      //     }
      //     if (doc.data().body) {
      //       body = doc.data().body;
      //       console.log(body);
      //       this.itemDetail.body = body;
      //     }
      //   })
      //   .catch(error => {
      //     this.error = error;
      //   });
    },

    markComplete: function(id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("ToDos")
        .doc(this.$props.name)
        .collection("items")
        .doc(id)
        .set(
          {
            completed: true
          },
          { merge: true }
        );
    },
    markIncomplete: function(id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("ToDos")
        .doc(this.$props.name)
        .collection("items")
        .doc(id)
        .set(
          {
            completed: false
          },
          { merge: true }
        );
    },

    clearCompleted() {
      console.log("need to code");
    },

    movetoEnd() {
      // console.log("move the end");
      // this.$emit("send", this.$props.name);
      let name = this.$props.name;
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("ToDos")
        .doc(name)
        .delete()
        .then(function() {
          db.collection("todos")
            .doc(name)
            .set({
              title: name,
              created_at: Date.now()
            });
        });
    }
  },

  computed: {},
  mounted() {}
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
