<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{todo.text}}</li>
  </ul>
</template>

<script>
export default {
  //   name: Burnlist,
  data() {
    return {
      todos: [{ text: "fix pointer" }, { text: "add form" }]
    };
  }
};
</script>

<style>
</style>
