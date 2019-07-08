<template>
  <div>
    <v-container>
      <h1>Burnlist</h1>
    </v-container>
    <v-container align-center fluid>
      <h1>New Requests</h1>

      <v-layout row wrap align-center>
        <v-flex xs12 sm4 md3 v-for="request in requests" :key="request.id" class="ma-2">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ request.name }}</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <table class="center striped card-table">
                <tbody>
                  <tr>
                    <td>Location</td>
                    <td>{{request.location}}</td>
                  </tr>
                  <tr>
                    <td>Destination</td>
                    <td>{{request.placeVisited}}</td>
                  </tr>
                  <tr>
                    <td class="table-entry">Date Submitted:</td>
                    <td>{{request.dateSubmitted}}</td>
                  </tr>
                  <tr>
                    <td class="table-entry">Departing Date:</td>
                    <td>{{request.departDate}}</td>
                  </tr>
                  <tr>
                    <td class="table-entry">Submitted By:</td>
                    <td>{{request.submittedBy}}</td>
                  </tr>
                  <tr>
                    <td class="table-entry">Other Travelers:</td>
                    <td>{{request.numberOtherTravelers}}</td>
                  </tr>
                </tbody>
              </table>
            </v-card-text>

            <v-card-actions>
              <!-- dropdown menu -->
              <v-menu offset-y>
                <v-btn flat slot="activator" color="orange">
                  <v-icon left>expand_more</v-icon>
                  <span>Actions</span>
                </v-btn>
                <v-list>
                  <v-list-tile router :to="{name: 'ViewRequest', params: {request_id: request.id}}">
                    <v-list-tile-title>View</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    router
                    :to="{name: 'ManageRequest', params: {request_id: request.id}}"
                    v-show="true"
                  >
                    <v-list-tile-title>Manage</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    router
                    :to="{name: 'EditRequest', params: {request_id: request.id}}"
                    v-show="true"
                  >
                    <v-list-tile-title>Edit</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout>
        <v-btn @click="aliasFunctionTest">Alias Test Butten</v-btn>
        <v-btn @click="emailFunctionTest">Email Test Butten</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import functions from "firebase/functions"; // needed for user auth
import db from "@/firebase/init";

export default {
  name: "Burnlist",
  data() {
    return {
      todos: [{ text: "fix pointer" }, { text: "add form" }],
      showRequest: "ongoing"
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    requests() {
      return this.$store.getters.newRequests;
    }
    // return this.$store.getters.sortedRequests;
    // return this.$store.getters.newRequests;
    // return this.$store.getters.ongoingRequests;
    // return [{ name: "request1" }];
    // return this.$store.state.requests;
  },
  methods: {
    aliasFunctionTest() {
      console.log("test my functions");
      let checkRequest = firebase.functions().httpsCallable("checkAlias");
      checkRequest({ name: "Michael Black" }).then(result => {
        console.log(result.data.unqique);
      });
    },
    emailFunctionTest() {
      console.log("testing email funciton...");
      sendEmail = firebase.functions().httpsCallable("sendMail");
      sendEmail().then(result => {
        console.log(result);
      });
    }
  },
  created() {
    console.log("created");
    this.$store.dispatch("updateRequests");
  }
};
</script>

<style>
</style>
