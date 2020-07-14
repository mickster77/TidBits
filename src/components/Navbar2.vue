<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-if="user" :src="imgURL"></v-img>
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

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title @click="goHome">TidBits</v-toolbar-title>
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
      imgURL: "https://randomuser.me/api/portraits/lego/1.jpg",
      items: [
        {
          title: "TidBits",
          icon: "mdi-home-city",
          link: { name: "Tidbits", params: { uid: this.getUID() } }
        },
        {
          title: "ToDo",
          icon: "mdi-clipboard-check-multiple",
          link: { name: "ToDo", params: { uid: this.getUID() } }
        },
        // {
        //   title: "Test",
        //   icon: "mdi-account-group-outline",
        //   link: { path: "/test" }
        // },
        {
          title: "Weight",
          icon: "mdi-scale",
          link: { name: "Weight" }
        },
        {
          title: "Workout",
          icon: "mdi-weight-lifter",
          link: { name: "Workout" }
        },
        {
          title: "ChoreBoard",
          icon: "mdi-android-debug-bridge",
          link: { name: "ChoreBoard" }
        },
        {
          title: "Letters",
          icon: "mdi-book-multiple",
          link: { name: "Letters" }
        },
        {
          title: "FAQ",
          icon: "mdi-frequently-asked-questions",
          link: { name: "FAQ" }
        }

        // {
        //   title: "Blog",
        //   icon: "mdi-boom-gate-down-outline",
        //   link: { name: "UnderConstruction" }
        // }
        // {
        //   title: "Library",
        //   icon: "mdi-boom-gate-down-outline",
        //   link: { name: "UnderConstruction" }
        // },
        // {
        //   title: "Forum",
        //   icon: "mdi-boom-gate-down-outline",
        //   link: { name: "UnderConstruction" }
        // },
        // {
        //   title: "Voice Notes",
        //   icon: "mdi-boom-gate-down-outline",
        //   link: { name: "UnderConstruction" }
        // }
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
      this.$router.push({ name: "Home" });
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
    },
    updateProfilePic() {
      var storage = firebase.storage();
      var path = this.$store.getters.userDisplayName + "/profilePic.jpg";
      var pathReference = storage.ref(path);
      pathReference
        .getDownloadURL()
        .then(url => {
          this.imgURL = url;
        })
        .catch(function(error) {
          console.warn(error);
          console.log(error.code);
          // storage/object-not-found
        });
    }
  },
  computed: {
    displayName() {
      // if (this.user) {
      //   return firebase.auth().currentUser.displayName;
      // } else {
      //   return null;
      // }
      if (this.$store.state.user) {
        return this.$store.state.user.displayName;
      } else {
        return "no user";
      }
    }
    // user() {
    //   if (this.$store.state.user) {
    //     return this.$store.state.user;
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
        this.updateProfilePic();
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
