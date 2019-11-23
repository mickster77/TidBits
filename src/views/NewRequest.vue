 <template>
  <div>
    <h1>New Request</h1>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <h3 xs12>Basic Travel Info</h3>
          <v-flex xs12>
            <v-text-field label="Traveler Name:" v-model="name"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              label="What organization?"
              placeholder="e.g., NNL-Bettis, BPMIT"
              v-model="placeVisited"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field label="Location:" v-model="location"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field label="Depart Date" type="date" v-model="departDate"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field label="Return Date" type="date" v-model="returnDate"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-checkbox v-model="takingLeave" label="Are you taking leave?"></v-checkbox>
          </v-flex>
          <v-flex xs12 sm6 v-show="takingLeave">
            <v-text-field label="Leave Start Date" type="date" v-model="leaveStartDate"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="takingLeave">
            <v-text-field label="Leave End Date" type="date" v-model="leaveEndDate"></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-checkbox v-model="otherTravelers" label="Are others traveling with you?"></v-checkbox>
          </v-flex>

          <v-flex xs12 v-show="otherTravelers">
            <v-select :items="[1,2,3,4,5]" v-model="numberOtherTravelers" label="How Many"></v-select>
          </v-flex>

          <v-flex xs12 v-show="otherTravelers">
            <v-combobox
              xs12
              v-show="otherTravelers"
              v-model="otherTravelerNames"
              hide-selected
              hint="Hit enter for each name"
              label="Names:"
              multiple
              persistent-hint
              small-chips
            ></v-combobox>
          </v-flex>

          <v-flex xs12 v-show="otherTravelers">
            <v-textarea
              box
              label="Enter any specific notes for the other travels."
              auto-grow
              v-model="otherTravelerNotes"
            ></v-textarea>
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <h3 xs12>Transportion Details</h3>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-radio-group v-model="leavingFrom">
                  <template v-slot:label>
                    <div>Where are you leaving from?</div>
                  </template>
                  <v-radio value="home" label="Home"></v-radio>
                  <v-radio value="work" label="Work"></v-radio>
                  <v-radio value="other" label="Other"></v-radio>
                </v-radio-group>
                <v-text-field
                  label="Where are you leaving from"
                  v-model="leavingFromOther"
                  class="pr-4"
                  v-show="leavingFrom == 'other'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-radio-group v-model="returningTo">
                  <template v-slot:label>
                    <div>Where are you returning to?</div>
                  </template>
                  <v-radio value="home" label="Home"></v-radio>
                  <v-radio value="work" label="Work"></v-radio>
                  <v-radio value="other" label="Other"></v-radio>
                </v-radio-group>
                <v-text-field
                  label="Where are you leaving from"
                  v-model="returningToOther"
                  v-show="returningTo == 'other'"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-flex>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <v-radio-group v-model="tranportationMode" row>
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
          <v-flex xs12 v-show="tranportationMode == 'air'">
            <h4 v-show="tranportationMode == 'air'">Departing Flight Information</h4>
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12 sm6 v-show="tranportationMode == 'air'">
            <v-text-field label="Departing airport" v-model="homeDepartAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="tranportationMode == 'air'">
            <v-text-field label="Arriving Airport" v-model="destinationArrivalAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="tranportationMode == 'air'">
            <v-text-field
              label="What time should your flight be"
              v-model="departTimeframe"
              placeholder="e.g., evening, afternoon"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="tranportationMode == 'air'">
            <v-text-field
              label="If you know you flight code(s), enter it below"
              v-model="departflightCode"
            ></v-text-field>
          </v-flex>
          <!-- returning -->
          <v-flex xs12 v-show="tranportationMode == 'air'">
            <h4 v-show="tranportationMode == 'air'">Returning Flight Information</h4>
          </v-flex>
          <v-flex xs12 sm6 v-show="tranportationMode == 'air'">
            <v-text-field label="Departing airport" v-model="destinationDepartAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="tranportationMode == 'air'">
            <v-text-field label="Arriving airport" v-model="homeArrivalAirport"></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="tranportationMode == 'air'">
            <v-text-field
              label="What time should your flight be"
              v-model="returnTimeframe"
              placeholder="e.g., evening, afternoon "
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="tranportationMode == 'air'">
            <v-text-field
              label="If you know you flight code(s), enter it below"
              v-model="returnflightCode"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="tranportationMode == 'air'">
            <v-textarea box label="Flight Notes" auto-grow v-model="flightNotes"></v-textarea>
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

          <v-flex xs12 sm6 v-show="tranportationMode == 'pov'">
            <v-text-field label="Departing Zip Code" v-model="povDepartZip"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="tranportationMode == 'pov'">
            <v-text-field label="Returning Zip Code" v-model="povReturnZip"></v-text-field>
          </v-flex>

          <v-flex xs12 v-show="tranportationMode == 'van'">
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
            <v-checkbox v-model="rentalCar" label="Do you need a rental car?"></v-checkbox>
          </v-flex>
          <v-flex xs12 v-show="rentalCar">
            <h4>Rental Car</h4>
          </v-flex>

          <v-flex xs12 sm6 v-show="rentalCar">
            <v-text-field label="Pickup Location:" v-model="pickupLocation"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="rentalCar">
            <v-text-field label="Pickup Timeframe:" v-model="povReturnZip"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="rentalCar">
            <v-text-field label="Dropoff Location:" v-model="dropoffLocation"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="rentalCar">
            <v-text-field label="Dropoff Timeframe:" v-model="dropoffTimeframe"></v-text-field>
          </v-flex>
          <v-flex xs12 v-show="rentalCar">
            <v-text-field label="Rental Car Size:" v-model="rentalCarSize"></v-text-field>
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
            <v-checkbox v-model="hotel" label="Do you need a hotel?"></v-checkbox>
          </v-flex>
          <v-flex xs12 v-show="hotel">
            <h4>Hotel</h4>
          </v-flex>
          <v-flex xs12 v-show="hotel">
            <v-text-field label="Preferred Hotel:" v-model="preferredHotel"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="hotel">
            <v-text-field label="Check in date:" v-model="checkInDate" type="date"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-show="hotel">
            <v-text-field label="Check out date:" v-model="checkOutDate" type="date"></v-text-field>
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
              <v-checkbox v-model="JPAS" label="JPAS?"></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox v-model="visitRequest" label="Visit Request?"></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-checkbox v-model="radForm" label="Rad Form?"></v-checkbox>
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
              v-model="travelNotes"
            ></v-textarea>
          </v-flex>

          <v-flex xs12>
            <p class="red--text">{{feedback}}</p>
          </v-flex>
          <v-flex>
            <v-btn @click="addRequest" :loading="loading">Submit</v-btn>
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
  data() {
    return {
      //Form stuff
      feedback: null,
      loading: false,
      //basic travel info
      name: null,
      placeVisited: null,
      location: null,
      departDate: null,
      returnDate: null,
      takingLeave: false,
      leaveEndDate: null,
      leaveStartDate: null,
      dateSubmitted: null,
      otherTravelers: null,
      numberOtherTravelers: null,
      otherTravelerNames: [],
      otherTravelerNotes: null,

      //transportion details
      leavingFrom: null,
      leavingFromOther: null,
      returningTo: null,
      returningToOther: null,
      tranportationMode: null,

      //flight details
      homeDepartAirport: null,
      destinationArrivalAirport: null,
      departTimeframe: null,
      departflightCode: null,
      destinationDepartAirport: null,
      homeArrivalAirport: null,
      returnTimeframe: null,
      returnflightCode: null,
      flightNotes: null,

      //other travel options
      vanAvailable: null,
      povDepartZip: null,
      povReturnZip: null,

      //Rental Car
      rentalCar: null,
      pickupLocation: null,
      pickupTimeframe: null,
      dropoffLocation: null,
      dropoffTimeframe: null,
      rentalCarSize: null,

      //Hotel
      hotel: null,
      preferredHotel: null,
      checkInDate: null,
      checkOutDate: null,

      // forms needed

      radForm: null,
      JPAS: null,
      visitRequest: null,
      travelNotes: null,

      templateName: null,

      // Travel request info

      status: "new",
      tripMemoSubmitted: null,
      memoNumber: null,
      voucherSubmitted: null,
      voucherSigned: null,
      voucherPaid: null,
      envelopeReceived: null,
      submittedBy: null,
      versionNumber: 1
    };
  },
  computed: {},
  methods: {
    addRequest() {
      var today = new Date();
      if (this.name) {
        this.loading = true; //This adds to spinner to the submit button
        this.feedback = null;
        // db.collection("testRequests") //  testing database
        db.collection("newRequests") // Real database
          .add({
            //basic travel info
            dateSubmitted:
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate(),

            // basic travel info
            name: this.name,
            placeVisited: this.placeVisited,
            location: this.location,
            departDate: this.departDate,
            returnDate: this.returnDate,
            takingLeave: this.takingLeave,
            leaveEndDate: this.leaveEndDate,
            leaveStartDate: this.leaveStartDate,
            otherTravelers: this.otherTravelers,
            otherTravelerNames: this.otherTravelerNames,
            numberOtherTravelers: this.numberOtherTravelers,
            otherTravelerNotes: this.otherTravelerNotes,

            //transportion details
            leavingFrom: this.leavingFrom,
            leavingFromOther: this.leavingFromOther,
            returningTo: this.returningTo,
            returningToOther: this.returningToOther,
            tranportationMode: this.tranportationMode,

            //flight details
            homeDepartAirport: this.homeDepartAirport,
            destinationArrivalAirport: this.destinationArrivalAirport,
            departTimeframe: this.departTimeframe,
            departflightCode: this.departflightCode,
            destinationDepartAirport: this.destinationDepartAirport,
            homeArrivalAirport: this.homeArrivalAirport,
            returnflightCode: this.returnflightCode,
            returnTimeframe: this.returnTimeframe,
            flightNotes: this.flightNotes,

            //other travel options
            vanAvailable: this.vanAvailable,
            povDepartZip: this.povDepartZip,
            povReturnZip: this.povReturnZip,

            //Rental Car
            rentalCar: this.rentalCar,
            pickupLocation: this.pickupLocation,
            pickupTimeframe: this.pickupTimeframe,
            dropoffLocation: this.dropoffLocation,
            dropoffTimeframe: this.dropoffTimeframe,
            rentalCarSize: this.rentalCarSize,

            //Hotel
            hotel: this.hotel,
            preferredHotel: this.preferredHotel,
            checkInDate: this.checkInDate,
            checkOutDate: this.checkOutDate,

            // forms needed

            radForm: this.radForm,
            JPAS: this.JPAS,
            visitRequest: this.visitRequest,
            travelNotes: this.travelNotes,

            // Travel request info

            status: "new",
            tripMemoSubmitted: null,
            memoNumber: null,
            voucherSubmitted: null,
            voucherSigned: null,
            voucherPaid: null,
            envelopeReceived: null,
            versionNumber: 1,
            submittedBy: firebase.auth().currentUser.displayName

            //other travelers practice
          })
          .then(() => {
            this.loading = false;
            this.$router.push({ name: "Home" });
          })
          .catch(function(error) {
            this.loading = false;
            alert(error.message);
          });
      } else {
        this.feedback = "At a minimum, give me a name...";
      }
    }
  }
};
</script>

<style>
</style>
