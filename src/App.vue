<template>
  <v-app>
    <Navbar2 />
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <v-btn @click="changeTheme()">Change Theme</v-btn>
      <v-spacer></v-spacer>
      <span class="px-5">v 1.00</span>
    </v-footer>
  </v-app>
</template>

<script>
// import Navbar from "@/components/Navbar";
import Navbar2 from "@/components/Navbar2";

export default {
  name: "App",
  components: {
    // Navbar,
    Navbar2
  },
  data() {
    return {
      darkTheme: true
    };
  },
  methods: {
    changeTheme() {
      if (this.$vuetify.theme.dark == true) {
        this.$vuetify.theme.dark = false;
      } else this.$vuetify.theme.dark = true;
    }
  },
  computed: {
    isDark() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isMickster() {
      return this.$store.getters.isAdmin;
    }
  }
};
</script>
