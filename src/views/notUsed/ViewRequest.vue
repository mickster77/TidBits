<template>
  <div>
    <v-container>
      <p>Request ID:{{this.requestID}}</p>
      <v-divider class="my-4"></v-divider>
      <h2>Basic Info</h2>
      <table class="center striped">
        <tbody>
          <tr>
            <td class="table-entry">Name:</td>
            <td>{{request.name}}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{{request.location}}</td>
          </tr>
          <tr>
            <td>Place Visited</td>
            <td>{{request.placeVisited}}</td>
          </tr>
          <tr>
            <td>Depart Date:</td>
            <td>{{request.departDate}}</td>
          </tr>
          <tr>
            <td>Return Date:</td>
            <td>{{request.returnDate}}</td>
          </tr>
          <tr>
            <td>Taking Leave:</td>
            <td>{{request.takingLeave}}</td>
          </tr>
          <tr v-show="request.takingLeave">
            <td>Leave start date:</td>
            <td>{{request.leaveStartDate}}</td>
          </tr>
          <tr v-show="request.takingLeave">
            <td>Leave end date:</td>
            <td>{{request.leaveEndDate}}</td>
          </tr>
          <tr>
            <td>Departing from:</td>
            <td>{{request.leavingFrom}}</td>
          </tr>
          <tr>
            <td>Returning to:</td>
            <td>{{request.returningTo}}</td>
          </tr>
          <tr>
            <td>Transportation method:</td>
            <td>{{request.tranportationMode}}</td>
          </tr>
          <tr>
            <td>Other Travelers?:</td>
            <td>{{request.otherTravelers}}</td>
          </tr>
          <tr>
            <td>Other Traveler Names:</td>
            <td>{{request.otherTravelerNames}}</td>
          </tr>
        </tbody>
      </table>

      <!-- flight info -->
      <v-divider class="my-4"></v-divider>
      <h2 v-show="request.tranportationMode=='air'">Flight Info</h2>

      <table class="center striped" v-show="request.tranportationMode=='air'">
        <tbody>
          <tr>
            <td class="table-entry">Home Departing Airport:</td>
            <td>{{request.homeDepartAirport}}</td>
          </tr>
          <tr>
            <td>Departing Timeframe:</td>
            <td>{{request.departTimeframe}}</td>
          </tr>
          <tr>
            <td>Destination Arrival Airport:</td>
            <td>{{request.destinationArrivalAirport}}</td>
          </tr>
          <tr>
            <td>Flight Code(s)?</td>
            <td>{{request.departflightCode}}</td>
          </tr>
          <tr>
            <td>Destination Departing Airport:</td>
            <td>{{request.destinationDepartAirport}}</td>
          </tr>
          <tr>
            <td>Home Arriving Airport:</td>
            <td>{{request.homeArrivalAirport}}</td>
          </tr>
          <tr>
            <td>Returning Timeframe:</td>
            <td>{{request.returnTimeframe}}</td>
          </tr>
          <tr>
            <td>Returning Flight Code?</td>
            <td>{{request.returnflightCode}}</td>
          </tr>
          <tr>
            <td>Flight notes:</td>
            <td>{{request.flightNotes}}</td>
          </tr>
        </tbody>
      </table>

      <!-- Van travel options -->
      <h2 v-show="request.tranportationMode=='van'">Van Info</h2>
      <table class="center striped" v-show="request.tranportationMode=='van'">
        <tbody>
          <tr>
            <td class="table-entry pr-2">Transportation Mode:</td>
            <td>{{request.tranportationMode}}</td>
          </tr>
          <tr>
            <td>Notes:</td>
            <td>{{request.otherTravelNotes}}</td>
          </tr>
        </tbody>
      </table>

      <!-- POV travel options -->

      <h2 v-show="request.tranportationMode=='pov'">POV Info</h2>
      <table class="center striped" v-show="request.tranportationMode=='pov'">
        <tbody>
          <tr>
            <td class="table-entry">Transportation Mode:</td>
            <td>{{request.tranportationMode}}</td>
          </tr>
          <tr>
            <td class="table-entry">POV Departing Zip:</td>
            <td>{{request.povDepartZip}}</td>
          </tr>
          <tr>
            <td>POV Returning Zip:</td>
            <td>{{request.povReturnZip}}</td>
          </tr>
          <tr>
            <td>Notes:</td>
            <td>{{request.otherTravelNotes}}</td>
          </tr>
        </tbody>
      </table>

      <!-- RENTAL CAR -->
      <v-divider class="my-4"></v-divider>

      <h2 v-show="request.rentalCar">Rental Car Info</h2>
      <table class="center striped" v-show="request.rentalCar">
        <tbody>
          <tr>
            <td class="table-entry">Pickup Location:</td>
            <td>{{request.pickupLocation}}</td>
          </tr>
          <tr>
            <td>Pickup Time:</td>
            <td>{{request.pickupTimeframe}}</td>
          </tr>
          <tr>
            <td>Dropoff Location:</td>
            <td>{{request.dropoffLocation}}</td>
          </tr>
          <tr>
            <td>Dropoff Time:</td>
            <td>{{request.dropoffTimeframe}}</td>
          </tr>
          <tr>
            <td>Rental Car Size:</td>
            <td>{{request.rentalCarSize}}</td>
          </tr>
        </tbody>
      </table>

      <!-- Hotel -->
      <v-divider class="my-4"></v-divider>

      <h2 v-show="request.hotel">Hotel Info</h2>
      <table class="center striped" v-show="request.hotel">
        <tbody>
          <tr>
            <td class="table-entry">Hotel Needed?</td>
            <td>{{request.hotel}}</td>
          </tr>
          <tr>
            <td class="table-entry">Preferred Hotel:</td>
            <td>{{request.preferredHotel}}</td>
          </tr>
          <tr>
            <td>Checkin Date:</td>
            <td>{{request.checkInDate}}</td>
          </tr>
          <tr>
            <td>Checkout Date:</td>
            <td>{{request.checkOutDate}}</td>
          </tr>
        </tbody>
      </table>

      <!-- FORMS NEEDED -->
      <v-divider class="my-4"></v-divider>

      <h2>General</h2>
      <table class="center striped">
        <tbody>
          <tr>
            <td class="table-entry">JPAS:</td>
            <td>{{request.JPAS}}</td>
          </tr>
          <tr>
            <td>Visit Request:</td>
            <td>{{request.visitRequest}}</td>
          </tr>
          <tr>
            <td>Radform:</td>
            <td>{{request.radForm}}</td>
          </tr>
          <tr>
            <td>Travel Notes:</td>
            <td>{{request.travelNotes}}</td>
          </tr>
        </tbody>
      </table>
    </v-container>
  </div>
</template>



<script>
import db from "@/firebase/init";

export default {
  name: "ViewRequest",
  data() {
    return {
      requestID: null,
      request: null
    };
  },
  methods: {},
  created() {
    // console.log("request id: ");
    // console.log(this.$route.params.request_id);
    this.requestID = this.$route.params.request_id;
    // console.log("myID is: ");
    // console.log(this.myID);
    var docRef = db.collection("newRequests").doc(this.requestID);

    docRef.get().then(doc => {
      this.request = doc.data();
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
.table-entry {
  width: 50%;
}
</style>
