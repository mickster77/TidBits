<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="showSidebar = !showSidebar"></v-toolbar-side-icon>
      <!-- <v-btn flat router :to="{name: 'Home', params: { uid: user.uid }}">
        <span class="font-weight-light myFont">Tid</span>
        <span class="myFont">Bits</span>
      </v-btn>-->
      <v-btn>
        <span class="font-weight-light myFont">Tid</span>
        <span class="myFont">Bits</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="hidden-sm-and-down" @click="testFirebase" v-show="isDeveloper">
        <span>Test Firebase</span>
      </v-btn>
      <v-btn class="hidden-sm-and-down" v-if="!user" router :to="{name: 'Signup'}">
        <span>Sign up</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <v-btn class="hidden-sm-and-down" v-if="!user" router :to="{name: 'Login'}">
        <span>Log in</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <!-- <v-btn class="hidden-sm-and-down" @click="testFirebase" v-if="user">
        <span>User Creds</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>-->
      <v-btn class="hidden-sm-and-down" @click="logout" v-if="user">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- Sidebar code -->
    <v-navigation-drawer app v-model="showSidebar">
      <!-- TidBit link Link -->
      <v-list>
        <v-list-tile router :to="{name: 'Tidbits', params: { uid: getUID() }}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>TidBits</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- </v-list>
        <v-list>-->
        <v-list-tile router :to="{name: 'Letters'}">
          <v-list-tile-action>
            <v-icon>class</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Letters</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router :to="{name: 'ToDo', params: { uid: getUID() }}">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Todo List</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!-- New Tidbit Link -->
      <!-- <v-list>
        <v-list-tile router to="/new-request">
          <v-list-tile-action>
            <v-icon>create_new_folder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>New Tidbit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>-->
      <!-- FAQ Link -->
      <hr />
      <v-list v-show="user">
        <v-list-tile router to="/FAQ">
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Feeback</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <!-- Auth Links -->

      <v-list v-if="!user">
        <!-- this code uses the links parameters in component data to populate the menu -->
        <v-list-tile v-for="(link, index) in links" :key="index" router :to="link.route">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <!-- Signout Links -->
      <v-list v-if="user">
        <v-list-tile>
          <!-- <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>-->
          <v-list-tile-content>
            <v-btn @click="logout">Signout</v-btn>
            <!-- <v-list-tile-title>Signout</v-list-tile-title> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from "firebase";
// import db from "@/firebase/init";

export default {
  components: {},
  data() {
    return {
      user: null,
      showSidebar: false,
      isAdmin: true,
      links: [
        {
          icon: "exit_to_app",
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
      console.log("email: " + firebase.auth().currentUser.email);
      console.log("UID: " + firebase.auth().currentUser.uid);
      console.log("UID: " + firebase.auth().currentUser.displayName);
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
    }
    // uid: function() {
    //   if (firebase.auth().currentUser) {
    //     return firebase.auth().currentUser.uid;
    //   } else {
    //     return null;
    //   }
    // }
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
