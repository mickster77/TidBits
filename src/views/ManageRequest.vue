<template>
  <div>
    <v-container>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <h2>Request Info:</h2>
          <table class="center striped">
            <tbody>
              <tr>
                <td>Request ID:</td>
                <td>{{this.requestID}}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{{request.name}}</td>
              </tr>

              <tr>
                <td class="table-entry">Request Status:</td>
                <td>
                  <v-btn-toggle v-model="request.status">
                    <v-btn flat value="new">
                      <span>New</span>
                    </v-btn>
                    <v-btn flat value="ticketed">
                      <span>Ticketed</span>
                    </v-btn>
                    <v-btn flat value="ongoing">
                      <span>Ongoing</span>
                    </v-btn>
                    <v-btn flat value="completed">
                      <span>Completed</span>
                    </v-btn>
                  </v-btn-toggle>
                </td>
              </tr>
              <tr>
                <td>Travel Memo Submited?</td>
                <td>
                  <v-checkbox v-model="request.tripMemoSubmitted"></v-checkbox>
                </td>
              </tr>
              <tr>
                <td>Travel Memo Number:</td>
                <td>
                  <v-text-field label="Memo Number" v-model="request.memoNumber"></v-text-field>
                </td>
              </tr>
              <tr>
                <td>Envelope Received?</td>
                <td>
                  <v-checkbox v-model="request.envelopeReceived"></v-checkbox>
                </td>
              </tr>
              <tr>
                <td>Voucher Submitted?</td>
                <td>
                  <v-checkbox v-model="request.voucherSubmitted"></v-checkbox>
                </td>
              </tr>
              <tr>
                <td>Voucher Signed?</td>
                <td>
                  <v-checkbox v-model="request.voucherSigned"></v-checkbox>
                </td>
              </tr>
              <tr>
                <td>Voucher Paid?</td>
                <td>
                  <v-checkbox v-model="request.voucherPaid"></v-checkbox>
                </td>
              </tr>
            </tbody>
          </table>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="editRequest">Submit Changes</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>



<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "ManageRequest",
  data() {
    return {
      requestID: null,
      request: null,
      memoNumber: null
    };
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
    });
  },
  methods: {
    editRequest() {
      db.collection("newRequests")
        .doc(this.requestID)
        .update({
          // versionNumber = this.versionNumber + 1,
          status: this.request.status,
          tripMemoSubmitted: this.request.tripMemoSubmitted,
          memoNumber: this.request.memoNumber,
          voucherSubmitted: this.request.voucherSubmitted,
          voucherSigned: this.request.voucherSigned,
          voucherPaid: this.request.voucherPaid,
          envelopeReceived: this.request.envelopeReceived
        })
        .then(() => {
          // delete the smoothie from the array to update page
          this.$router.push({
            name: "Home"
          });
        });
    }
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
