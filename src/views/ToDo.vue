/* eslint-disable vue/valid-v-on */
<template>
  <v-container align-center id="top">
    <v-row>
      <v-btn @click="$vuetify.goTo(topTarget)" fab color="primary" fixed bottom right>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-col cols="12">
        <v-card class="pa-5">
          <v-card-title primary-title>Todo Lists:</v-card-title>
          <v-btn
            v-for="todo in todos"
            :key="todo.id"
            class="ma-1 primary"
            @click="goToScrollTarget(todo.id)"
          >{{todo.title}}</v-btn>
        </v-card>
      </v-col>
      <v-col>
        <!-- <v-btn @click="$vuetify.goTo(target)" color="warning ">scroll to {{scrollName}}</v-btn> -->
        <div v-for="(todoList, index) in todos" :key="index" :id="todoList.id.replace(/\s/g, '')">
          <!-- <p>{{todoList.title}}</p> -->
          <!-- <span>{{todoList.id}}</span> -->
          <TodoComponent :name="todoList.title" v-on:send="updateTime" />
        </div>
        <v-text-field label="New Todo List" v-model="newTodoName" @keyup.enter="addToDo"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn @click.prevent="addToDo" color="primary">Add Todo</v-btn>
      </v-col>
      <v-col cols="12">
        <p v-show="feedback">{{feedback}}</p>
      </v-col>
    </v-row>
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
      feedback: null,
      scrollName: "Mike",
      scrollTop: "top"
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
          // console.log("updated");
        });
    },
    goToScrollTarget(name) {
      this.scrollName = name.replace(/\s/g, "");
      this.$vuetify.goTo(this.target);
    }
  },
  computed: {
    target() {
      // for v-scroll
      // alert(this.scrollName);
      return "#" + this.scrollName;
    },
    topTarget() {
      return screenTop;
    }
  },
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
