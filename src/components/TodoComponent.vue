<template>
  <!-- <v-container fluid> -->
  <!-- <v-row no-gutters> -->
  <v-col cols="12">
    <v-card class="mx-auto">
      <v-card-title primary-title class="justify-center display-1">{{
        name
      }}</v-card-title>
      <v-list v-for="(item, key) in items" :key="key">
        <!-- if completed -->
        <v-list-item v-if="item.completed">
          <v-btn icon @click="markIncomplete(item.id)">
            <v-icon color="green">mdi-checkbox-marked-outline</v-icon>
          </v-btn>
          <span class="completed">{{ item.title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="deleteItem(item.id)">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
          <v-btn icon @click="showItemDetail(item.id)">
            <v-icon color="green">mdi-information-outline</v-icon>
          </v-btn>
        </v-list-item>
        <!-- if not complete -->
        <v-list-item v-else>
          <v-btn icon @click="markComplete(item.id)">
            <v-icon color="green">mdi-checkbox-blank-outline</v-icon>
          </v-btn>
          <span>{{ item.title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="showItemDetail(item.id)">
            <v-icon color="green">mdi-information-outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <!-- <v-card-text>
            <v-text-field label="New Todo" type="text" v-model="myTodo" @keyup.enter="addToDo"></v-text-field>
            <span>hey there</span>
      </v-card-text>-->

      <v-list>
        <v-list-item>
          <v-text-field
            label="New Todo"
            type="text"
            v-model="myTodo"
            @keyup.enter="addToDo"
          ></v-text-field>
          <!-- <v-spacer></v-spacer> -->
          <v-btn icon @click="addToDo" dense>
            <v-icon color="green">mdi-plus</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <!-- dropdown menu -->

      <v-card-actions>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Actions</v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn @click="dialog = true">Delete</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="movetoEnd">Move to End</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="clearCompleted">Clear Completed</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>

      <!-- dropdown menu -->

      <!-- dialog popup -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>Delete the list?</v-card-title>
          <v-card-actions>
            <v-btn @click.stop="deleteList">Yes</v-btn>
            <v-btn @click.stop="dialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- dialog popup -->

      <!-- todo detail dialog popup -->
      <v-dialog v-model="todoDialog" max-width="600px">
        <v-card>
          <v-card-title>Todo Details</v-card-title>
          <v-card-text>{{ itemDetail.title }}</v-card-text>
          <v-card-text>{{ itemDetail.body }}</v-card-text>

          <v-btn @click.stop="todoDialog = false">Close</v-btn>
        </v-card>
      </v-dialog>
      <!-- todo detail dialog popup -->
    </v-card>
  </v-col>
  <!-- </v-row> -->
  <!-- </v-container> -->
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
        { title: "Move to End", action: "deleteList" },
      ],
      options: { duration: 50, offset: 5, easing: "linear" },
    };
  },

  created: function () {
    this.items = [];
    let newItems = [];
    db.collection("UserOwned")
      .doc(firebase.auth().currentUser.uid)
      .collection("ToDos")
      .doc(this.$props.name)
      .collection("items")
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        newItems = [];
        snapshot.forEach((doc) => {
          newItems.push({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            completed: doc.data().completed,
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
            created_at: Date.now(),
          })
          .then((response) => {
            if (response) {
              this.myTodo = "";
            }
          })
          .catch((error) => {
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
        .then(function () {
          // console.log("Document successfully deleted");
        })
        .catch(function (error) {
          this.error = error;
        });

      this.dialog = false;
    },
    deleteItem: function (id) {
      if (id) {
        db.collection("UserOwned")
          .doc(firebase.auth().currentUser.uid)
          .collection("ToDos")
          .doc(this.$props.name)
          .collection("items")
          .doc(id)
          .delete()
          .then(function () {
            // console.log("Document successfully deleted");
          })
          .catch(function (error) {
            this.error = error;
          });
      } else {
        this.error = "Invalid ID";
      }
    },

    showItemDetail: function (id) {
      alert(id);
      // console.log(id);
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

    markComplete: function (id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("ToDos")
        .doc(this.$props.name)
        .collection("items")
        .doc(id)
        .set(
          {
            completed: true,
          },
          { merge: true }
        );
    },
    markIncomplete: function (id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("ToDos")
        .doc(this.$props.name)
        .collection("items")
        .doc(id)
        .set(
          {
            completed: false,
          },
          { merge: true }
        );
    },

    clearCompleted() {
      // console.log("need to code");
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
        .then(function () {
          db.collection("todos").doc(name).set({
            title: name,
            created_at: Date.now(),
          });
        });
    },
  },

  computed: {},
  mounted() {},
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
