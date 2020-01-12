<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar>
          <!-- <v-img src="https://randomuser.me/api/portraits/women/100.jpg"></v-img> -->
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>{{displayName}}</v-list-item-title>

        <!-- <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>-->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="drawer=!drawer"
          link
          router
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <hr />
      <!-- Sign in links -->

      <v-list v-if="!user">
        <v-list-item :to="{path: '/login'}">
          <v-list-item-content>Sign in</v-list-item-content>
        </v-list-item>
        <v-list-item :to="{path: '/signup'}">
          <v-list-item-content>Sign up</v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Signout Links -->
      <v-list v-if="user">
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="logout" color="warning">Signout</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>TidBits</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="warning" v-if="user" @click="logout">signOut</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";
// import db from "@/firebase/init";

export default {
  components: {},
  data() {
    return {
      drawer: null,
      user: null,
      showSidebar: false,
      isAdmin: true,
      items: [
        {
          title: "TidBits",
          icon: "mdi-home-city",
          link: { name: "Tidbits", params: { uid: this.getUID() } }
        },
        {
          title: "ToDo",
          icon: "mdi-account-group-outline",
          link: { name: "ToDo", params: { uid: this.getUID() } }
        },
        // {
        //   title: "Test",
        //   icon: "mdi-account-group-outline",
        //   link: { path: "/test" }
        // },
        {
          title: "Letters",
          icon: "mdi-account",
          link: { name: "Letters" }
        }
      ],
      links: [
        {
          icon: "mdi_exit_to_app",
          text: "Login",
          route: "/login",
          show: !this.user
        },
        {
          icon: "exit_to_app",
          text: "Signup",
          route: "/signup",
          show: !this.user
        }
      ]
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Tidbits" });
    },

    logout() {
      // console.log(firebase.auth().currentUser.displayName);
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login"
          });
        });
      // console.log("logout");
    },
    testFirebase() {
      // console.log("display name: " + firebase.auth().currentUser.displayName);
      // console.log("email: " + firebase.auth().currentUser.email);
      // console.log("UID: " + firebase.auth().currentUser.uid);
      // console.log("UID: " + firebase.auth().currentUser.displayName);
    },
    getUID() {
      if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.uid;
      } else {
        return null;
      }
    }
  },

  computed: {
    isDeveloper: function() {
      if (this.user) {
        let isMike =
          firebase.auth().currentUser.email == "shit.mail@icloud.com";
        let isKtravel =
          firebase.auth().currentUser.email == "ktravel930@gmail.com";

        if (isMike || isKtravel) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    displayName() {
      if (this.user) {
        return firebase.auth().currentUser.displayName;
      } else {
        return null;
      }
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
    // this fires everytime there is a change in user status
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
.myFont {
  font-size: 1.4em;
}
</style>
