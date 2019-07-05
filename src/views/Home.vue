<template>
  <div>
    <v-container align-center fluid>
      <h1>New Requests</h1>

      <v-layout row wrap align-center>
        <v-flex xs12 sm4 md3 v-for="request in newRequests" :key="request.id" class="ma-2">
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
                    v-show="isAdmin"
                  >
                    <v-list-tile-title>Manage</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    router
                    :to="{name: 'EditRequest', params: {request_id: request.id}}"
                    v-show="request.submittedBy == userName"
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
    <v-container align-center fluid>
      <h1>All Requests</h1>

      <template>
        <v-card>
          <v-card-title>
            <v-btn-toggle v-model="showRequests">
              <v-btn flat value="all">
                <span>All</span>
              </v-btn>
              <v-btn flat value="new">
                <span>New</span>
              </v-btn>
              <v-btn flat value="ongoing">
                <span>Ongoing</span>
              </v-btn>
              <v-btn flat value="completed">
                <span>Completed</span>
              </v-btn>
            </v-btn-toggle>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="visibleRequests" :search="search">
            <!-- Data table -->

            <template v-slot:items="props">
              <tr @click="props.expanded = !props.expanded" :v-show="true">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.dateSubmitted }}</td>
                <td>{{ props.item.departDate }}</td>
                <td>{{ props.item.location }}</td>
                <td>
                  <v-chip small :class="`${props.item.status} caption my-2`">{{ props.item.status }}</v-chip>
                </td>
              </tr>
            </template>

            <!-- seach results  -->
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </template>

            <!-- expansion panel for table row -->

            <template v-slot:expand="props">
              <v-toolbar>
                <span>{{props.item.id}}</span>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn
                    flat
                    router
                    :to="{name: 'ViewRequest', params: {request_id: props.item.id}}"
                  >View</v-btn>

                  <v-btn
                    flat
                    v-show="isAdmin"
                    router
                    :to="{name: 'EditRequest', params: {request_id: props.item.id}}"
                  >Edit</v-btn>
                  <v-btn
                    flat
                    v-show="isAdmin"
                    router
                    :to="{name: 'ManageRequest', params: {request_id: props.item.id}}"
                  >Manage</v-btn>
                  <!-- <v-btn
                    flat
                    v-show="isAdmin"
                    router
                    :to="{name: 'ManageRequest', params: {request_id: request.id}}"
                  >Manage</v-btn>-->

                  <!-- Delete button in dropdown-->
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn flat class="red--text" v-on="on" v-show="isAdmin">Delete Request</v-btn>
                    </template>

                    <v-card>
                      <v-card-title>Delete Request</v-card-title>

                      <v-divider></v-divider>
                      <v-card-text>Are you sure you want to delete this request?</v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn flat @click="dialog = false">Cancel</v-btn>
                        <v-btn flat color="warning" @click="deleteRequest(props.item.id)">Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar-items>
              </v-toolbar>
            </template>

            <!-- close data table -->
          </v-data-table>
        </v-card>
      </template>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";

export default {
  name: "Home",
  data() {
    return {
      // for detele dialog

      dialog: false,

      // For populating data table
      showRequests: "all",

      // for expanding row
      expand: false,

      // for seach bar
      search: "",

      // all requests
      requests: [],
      // for data table
      headers: [
        { text: "Name", align: "left", value: "name" },
        { text: "Date Submited", value: "dateSubmitted" },
        { text: "Departing Date", value: "departDate" },
        { text: "Location", value: "location" },
        { text: "Status", value: "status" }
      ]
    };
  },
  created() {
    db.collection("newRequests")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let request = doc.data();
          request.id = doc.id;
          // each request is pushed in the the requests array
          this.requests.push(request);
          // console.log(request.id);
        });
      });
  },

  computed: {
    visibleRequests: function() {
      /* This funciton detemines which requests should be shown
      in the data table based on the status of each request along
      with the state of the button group (all, new, ongoing, completed) */
      // console.log(this.showRequests);
      // this.showRequests is the state of the button in the data table
      let currentState = this.showRequests;

      return this.requests.filter(function(request) {
        if (request.status == currentState) {
          return true;
        }
        if (currentState == "all") {
          return true;
        } else {
          return false;
        }
      });
    },
    newRequests: function() {
      return this.requests.filter(function(request) {
        if (request.status == "new") {
          return true;
        } else {
          return false;
        }
      });
    },
    isAdmin: function() {
      let isMike = firebase.auth().currentUser.email == "shit.mail@icloud.com";
      let isKay =
        firebase.auth().currentUser.email == "kathryn.marshall@navy.mil";
      let isKtravel =
        firebase.auth().currentUser.email == "ktravel930@gmail.com";
      let isWilliam =
        firebase.auth().currentUser.email == "william.bolton@navy.mil";

      if (isMike || isKay || isKtravel || isWilliam) {
        return true;
      } else {
        return false;
      }
    },
    isDeveloper: function() {
      let isMike = firebase.auth().currentUser.email == "shit.mail@icloud.com";
      let isKtravel =
        firebase.auth().currentUser.email == "ktravel930@gmail.com";

      if (isMike || isKtravel) {
        return true;
      } else {
        return false;
      }
    },
    userName: function() {
      if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.displayName;
      } else {
        return "not siged in";
      }
    }
  },

  methods: {
    btnPressed() {
      // console.log(this.visibleRequests);
    },

    deleteRequest(id) {
      db.collection("newRequests") // Gets the smoothie collection
        .doc(id) // Gets the doc of a specific id
        .delete() // This deletes it from the database
        .then(() => {
          // delete the smoothie from the array to update page
          this.requests = this.requests.filter(request => {
            if (request.id == id) {
              return false;
            } else {
              return true;
            }
          });
          this.dialog = false;
        });
    },
    manageRequest() {
      console.log("display name:", firebase.auth().currentUser.displayName);
      console.log("email:", firebase.auth().currentUser.email);
      console.log("uid:", firebase.auth().currentUser.uid);
      console.log("is Admin?", this.isAdmin);
      console.log("is Developer?", this.isDeveloper);

      // let userID = firebase.auth().currentUser.displayName;
      // let docRef = db.collection("users").doc(userID);
      // console.log(docRef);
      // docRef
      //   .get()
      //   .then(function(doc) {
      //     if (doc.exists) {
      //       console.log("Document data:", doc.data());
      //       console.log(doc.data().alias);
      //       console.log(doc.data().slugh);
      //     } else {
      //       // doc.data() will be undefined in this case
      //       console.log("No such document!");
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log("Error getting document:", error);
      //   });
    }
  }
};
</script>

<style>
.my-card {
  padding-right: 50px;
}

.v-chip.new {
  background: red;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.completed {
  background: green;
}
</style>
