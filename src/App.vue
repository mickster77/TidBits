<template>
  <v-app :dark="darkTheme">
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <v-btn @click="darkTheme = !darkTheme">Change Theme</v-btn>
      <v-spacer></v-spacer>
      <span class="px-5">v 1.07</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      darkTheme: true
    };
  }
};
</script>
