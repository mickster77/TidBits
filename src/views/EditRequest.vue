 <template>
  <div>
    <h1>Edit Request</h1>
    <p>Request number: {{requestID}}</p>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <h3 xs12>Basic Travel Info</h3>
          <v-flex xs12>
            <v-text-field label="Traveler Name:" v-model="request.name"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              label="What organization?"
              placeholder="e.g., NNL-Bettis, BPMIT"
              v-model="request.placeVisited"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field label="Location:" v-model="request.location"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field label="Depart Date" type="date" v-model="request.departDate"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field label="Return Date" type="date" v-model="request.returnDate"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-checkbox v-model="request.takingLeave" label="Are you taking leave?"></v-checkbox>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.takingLeave">
            <v-text-field label="Leave Start Date" type="date" v-model="request.leaveStartDate"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.takingLeave">
            <v-text-field label="Leave End Date" type="date" v-model="request.leaveEndDate"></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-checkbox v-model="request.otherTravelers" label="Are others traveling with you?"></v-checkbox>
          </v-flex>
          <v-flex xs12 v-show="request.otherTravelers">
            <v-text-field label="Enter their names below:" v-model="request.otherTravelerNames"></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="request.otherTravelers">
            <v-textarea
              box
              label="Enter any specific notes for the other travels.  If their travel plans are sufficnetly different, I suggest subbmiting a seperatue request"
              auto-grow
              v-model="request.otherTravelerNotes"
            ></v-textarea>
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <h3 xs12>Transportion Details</h3>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-radio-group v-model="request.leavingFrom">
                  <template v-slot:label>
                    <div>Where are you leaving from?</div>
                  </template>
                  <v-radio value="home" label="Home"></v-radio>
                  <v-radio value="work" label="Work"></v-radio>
                  <v-radio value="other" label="Other"></v-radio>
                </v-radio-group>
                <v-text-field
                  label="Where are you leaving from"
                  v-model="request.leavingFromOther"
                  class="pr-4"
                  v-show="request.leavingFrom == 'other'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-radio-group v-model="request.returningTo">
                  <template v-slot:label>
                    <div>Where are you returning to?</div>
                  </template>
                  <v-radio value="home" label="Home"></v-radio>
                  <v-radio value="work" label="Work"></v-radio>
                  <v-radio value="other" label="Other"></v-radio>
                </v-radio-group>
                <v-text-field
                  label="Where are you leaving from"
                  v-model="request.returningToOther"
                  v-show="request.returningTo == 'other'"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-flex>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <v-radio-group v-model="request.tranportationMode" row>
              <template v-slot:label>
                <div>How will you be traveling?</div>
              </template>
              <v-radio label="Air" value="air"></v-radio>
              <v-radio label="POV" value="pov"></v-radio>
              <v-radio label="Gov Van" value="van"></v-radio>
              <v-radio label="Other" value="other"></v-radio>
            </v-radio-group>
          </v-flex>

          <!-- flight details -->
          <!-- departing -->
          <v-flex xs12 v-show="request.tranportationMode == 'air'">
            <h4 v-show="request.tranportationMode == 'air'">Departing Flight Information</h4>
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12 sm6 v-show="request.tranportationMode == 'air'">
            <v-text-field label="Departing airport" v-model="request.homeDepartAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.tranportationMode == 'air'">
            <v-text-field label="Arriving Airport" v-model="request.destinationArrivalAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="request.tranportationMode == 'air'">
            <v-text-field
              label="What time should your flight be"
              v-model="request.departTimeframe"
              placeholder="e.g., evening, afternoon"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="request.tranportationMode == 'air'">
            <v-text-field
              label="If you know you flight code(s), enter it below"
              v-model="request.departflightCode"
            ></v-text-field>
          </v-flex>
          <!-- returning -->
          <v-flex xs12 v-show="request.tranportationMode == 'air'">
            <h4 v-show="request.tranportationMode == 'air'">Returning Flight Information</h4>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.tranportationMode == 'air'">
            <v-text-field label="Departing airport" v-model="request.destinationDepartAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.tranportationMode == 'air'">
            <v-text-field label="Arriving airport" v-model="request.homeArrivalAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="request.tranportationMode == 'air'">
            <v-text-field
              label="What time should your flight be"
              v-model="request.returnTimeframe"
              placeholder="e.g., evening, afternoon"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="request.tranportationMode == 'air'">
            <v-text-field
              label="If you know you flight code(s), enter it below"
              v-model="request.returnflightCode"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="request.tranportationMode == 'air'">
            <v-textarea box label="Flight Notes" auto-grow v-model="request.flightNotes"></v-textarea>
          </v-flex>

          <!-- homeDepartAirport: null,
      destinationArrivalAirport: null,
      departTimeframe: null,
      departflightCode: null,
      destinationDepartAirport: null,
      homeArrivalAirport: null,
      returnflightCode: null,
          flightNotes: null,-->

          <!-- other travel options -->

          <v-flex xs12 sm6 v-show="request.tranportationMode == 'pov'">
            <v-text-field label="Departing Zip Code" v-model="request.povDepartZip"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.tranportationMode == 'pov'">
            <v-text-field label="Returning Zip Code" v-model="request.povReturnZip"></v-text-field>
          </v-flex>

          <v-flex xs12 v-show="request.tranportationMode == 'van'">
            <p>Make sure you lock down the van. If you need help contact William or Kay</p>
          </v-flex>

          <!-- vanAvailable: null,
          povDepartZip: null,
          povReturnZip: null,
          -->

          <!-- Rental Car -->
          <v-flex>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <v-checkbox v-model="request.rentalCar" label="Do you need a rental car?"></v-checkbox>
          </v-flex>
          <v-flex xs12 v-show="request.rentalCar">
            <h4>Rental Car</h4>
          </v-flex>

          <v-flex xs12 sm6 v-show="request.rentalCar">
            <v-text-field label="Pickup Location:" v-model="request.pickupLocation"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.rentalCar">
            <v-text-field label="Pickup Timeframe:" v-model="request.pickupTimeframe"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.rentalCar">
            <v-text-field label="Dropoff Location:" v-model="request.dropoffLocation"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.rentalCar">
            <v-text-field label="Dropoff Timeframe:" v-model="request.dropoffTimeframe"></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="request.rentalCar">
            <v-text-field label="Rental Car Size:" v-model="request.rentalCarSize"></v-text-field>
          </v-flex>
          <!-- rentalCar: null,
          pickupLocation: null,
          pickupTimeframe: null,
          dropoffLocation: null,
          dropoffTimeframe: null,
          rentalCarSize: null,-->

          <!-- Hotel -->
          <v-flex>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <v-checkbox v-model="request.hotel" label="Do you need a hotel?"></v-checkbox>
          </v-flex>
          <v-flex xs12 v-show="request.hotel">
            <h4>Hotel</h4>
          </v-flex>
          <v-flex xs12 v-show="request.hotel">
            <v-text-field label="Preferred Hotel:" v-model="request.preferredHotel"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.hotel">
            <v-text-field label="Check in date:" v-model="request.checkInDate" type="date"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="request.hotel">
            <v-text-field label="Check out date:" v-model="request.checkOutDate" type="date"></v-text-field>
          </v-flex>
          <!-- hotel: null,
          preferredHotel: null,
          checkInDate: null,
          checkOutDate: null,-->

          <!-- forms needed -->
          <v-flex>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <h3>Select any forms you need filled out for your trip:</h3>
          </v-flex>

          <v-layout row wrap>
            <v-flex xs4>
              <v-checkbox v-model="request.JPAS" label="JPAS?"></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox v-model="request.visitRequest" label="Visit Request?"></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox v-model="request.radForm" label="Rad Form?"></v-checkbox>
            </v-flex>
          </v-layout>

          <!-- radForm: null,
          JPAS: null,
          visitRequest: null,-->
          <!-- travel notes -->

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12>
            <v-textarea
              box
              label="If you have any other notes for your trip, enter them below"
              auto-grow
              v-model="request.travelNotes"
            ></v-textarea>
          </v-flex>

          <v-flex xs12>
            <p class="red--text">{{feedback}}</p>
          </v-flex>
          <v-flex>
            <v-btn @click="editRequest">Submit Changes</v-btn>
          </v-flex>
          <v-flex xs12>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn color="red" v-on="on">Delete Request</v-btn>
              </template>

              <v-card>
                <v-card-title>Delete Request?</v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn flat @click="dialog = false">Cancel</v-btn>
                  <v-btn flat color="warning" @click="deleteRequest">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>



<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "EditRequest",
  data() {
    return {
      request: null,
      originalRequest: null,
      dialog: false,
      requestID: null,
      testBool: false,
      //Form stuff
      feedback: null,

      templateName: null,

      // Travel request info
      versionNumber: 1
    };
  },
  methods: {
    deleteRequest(id) {
      db.collection("newRequests") // Gets the smoothie collection
        .doc(this.requestID) // Gets the doc of a specific id
        .delete() // This deletes it from the database
        .then(() => {
          // delete the smoothie from the array to update page
          this.$router.push({
            name: "Home"
          });
        });
    },
    editRequest() {
      // console.log("do this later");
      let docRef = db.collection("newRequests").doc(this.requestID);

      db.collection("newRequests")
        .doc(this.requestID)
        .update({
          // versionNumber = this.versionNumber + 1,
          name: this.request.name,
          placeVisited: this.request.placeVisited,
          location: this.request.location,
          departDate: this.request.departDate,
          returnDate: this.request.returnDate,
          takingLeave: this.request.takingLeave,
          leaveEndDate: this.request.leaveEndDate,
          leaveStartDate: this.request.leaveStartDate,
          dateSubmitted: this.request.dateSubmitted,
          otherTravelers: this.request.otherTravelers,
          otherTravelerNames: this.request.otherTravelerNames,
          otherTravelerNotes: this.request.otherTravelerNotes,

          //transportion details
          leavingFrom: this.request.leavingFrom,
          leavingFromOther: this.request.leavingFromOther,
          returningTo: this.request.returningTo,
          returningToOther: this.request.returningToOther,
          tranportationMode: this.request.tranportationMode,

          //flight details
          homeDepartAirport: this.request.homeDepartAirport,
          destinationArrivalAirport: this.request.destinationArrivalAirport,
          departTimeframe: this.request.departTimeframe,
          departflightCode: this.request.departflightCode,
          destinationDepartAirport: this.request.destinationDepartAirport,
          homeArrivalAirport: this.request.homeArrivalAirport,
          // returnTimeframe: this.request.returnTimeframe,
          returnflightCode: this.request.returnflightCode,
          flightNotes: this.request.flightNotes,

          //other travel options
          vanAvailable: this.request.vanAvailable,
          povDepartZip: this.request.povDepartZip,
          povReturnZip: this.request.povReturnZip,

          //Rental Car
          rentalCar: this.request.rentalCar,
          pickupLocation: this.request.pickupLocation,
          pickupTimeframe: this.request.pickupTimeframe,
          dropoffLocation: this.request.dropoffLocation,
          dropoffTimeframe: this.request.dropoffTimeframe,
          rentalCarSize: this.request.rentalCarSize,

          //Hotel
          hotel: this.request.hotel,
          preferredHotel: this.request.preferredHotel,
          checkInDate: this.request.checkInDate,
          checkOutDate: this.request.checkOutDate,
          submittedBy: firebase.auth().currentUser.displayName,

          // forms needed

          radForm: this.request.radForm,
          JPAS: this.request.JPAS,
          visitRequest: this.request.visitRequest,
          travelNotes: this.request.travelNotes
        })
        .then(() => {
          // delete the smoothie from the array to update page
          this.$router.push({
            name: "Home"
          });
        });
    }
  },
  created() {
    // console.log("request id: ");
    // console.log(this.$route.params.request_id);
    this.requestID = this.$route.params.request_id;
    // console.log("myID is: ");
    // console.log(this.myID);
    var docRef = db.collection("newRequests").doc(this.requestID);

    docRef.get().then(doc => {
      this.request = doc.data();
      this.originalRequest = doc.data();
      console.log(this.request);
    });
  }
};
</script>

<style>
table,
th,
td {
  border: none;
}

table {
  width: 100%;
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
}

table.striped tr {
  border-bottom: none;
}

table.striped > tbody > tr:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.1);
}
table.striped > tbody > tr:nth-child(even) {
  background-color: rgba(100, 100, 100, 0.1);
}

table.striped > tbody > tr > td {
  border-radius: 0;
}

table.highlight > tbody > tr {
  -webkit-transition: background-color 0.25s ease;
  transition: background-color 0.25s ease;
}

table.highlight > tbody > tr:hover {
  background-color: rgba(242, 242, 242, 0.5);
}

table.centered thead tr th,
table.centered tbody tr td {
  text-align: center;
}

tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

td,
th {
  padding: 15px 5px;
  display: table-cell;
  text-align: left;
  vertical-align: middle;
  border-radius: 2px;
}
</style>
