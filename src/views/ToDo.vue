<template>
  <v-container align-center fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <div v-for="(todoList, index) in todos" :key="index">
          <!-- <p>{{todoList.title}}</p> -->
          <!-- <span>{{todoList.id}}</span> -->
          <TodoComponent :name="todoList.title" v-on:send="updateTime" />
        </div>
        <v-text-field label="new list" v-model="newTodoName" @keyup.enter="addToDo"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-btn @click.prevent="addToDo" color="primary">Add Todo</v-btn>
      </v-flex>
      <v-flex xs12>
        <p v-show="feedback">{{feedback}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import TodoComponent from "@/components/TodoComponent";
import db from "@/firebase/init"; //needed for database call
import firebase from "firebase"; // needed for user auth

export default {
  name: "ToDo",
  components: {
    TodoComponent
  },
  data() {
    return {
      todos: [],
      newTodoName: null,
      feedback: null
    };
  },
  methods: {
    addToDo: function() {
      this.feedback = "";
      if (this.myTodo !== "") {
        // should check is a list of this type already exists...
        db.collection("UserOwned")
          .doc(firebase.auth().currentUser.uid)
          .collection("ToDos")
          .doc(this.newTodoName)
          .set({
            title: this.newTodoName,
            created_at: Date.now()
          })

          .catch(error => {
            this.feedback = error;
          });
        this.newTodoName = null;
      } else {
        this.feedback = "Please enter some text";
      }
    },
    updateTime(name) {
      db.collection("todos")
        .doc(name)
        .set({
          title: name,
          created_at: Date.now()
        })
        .then(function() {
          console.log("updated");
        });
    }
  },
  computed: {},
  created() {
    this.todos = [];
    let newTodos = [];
    db.collection("UserOwned")
      .doc(firebase.auth().currentUser.uid)
      .collection("ToDos")
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        newTodos = [];
        snapshot.forEach(doc => {
          newTodos.push({ id: doc.id, title: doc.data().title });
        });

        this.todos = newTodos;
      });
  }
};
</script>

<style>
</style>
