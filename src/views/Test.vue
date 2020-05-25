<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <h1>File Input</h1>
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            @change="onFileSelected"
          ></v-file-input>
          <v-btn @click="uploadPhoto">Upload</v-btn>
          <img :src="file" alt="none" />
          <v-btn @click="showPic">Show Pic</v-btn>
          <v-btn @click="tester">Tester</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-container>
              <v-row>
                <v-col>
                  <div>
                    <line-chart
                      :chartData="myChartData"
                      :options="chartOptions"
                      :chartColors="myChartColors"
                      label="Positive"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div>
                    <scatter-chart
                      :chartData="myChartData"
                      :options="chartOptions"
                      :chartColors="myChartColors"
                      label="Positive"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"; // needed for cloud storage
import LineChart from "@/components/LineChart";
import ScatterChart from "@/components/ScatterChart";

// import db from "@/firebase/init";

export default {
  name: "Test",
  components: {
    LineChart,
    ScatterChart
  },
  data() {
    return {
      myData: "data",
      // file input

      file: null,
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      selectedFile: null,

      // chart
      myChartData: [
        {
          date: "2018",
          value: 50
        },
        {
          date: "2019",
          value: 60
        },
        {
          date: "2020",
          value: 70
        }
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      myChartColors: {
        borderColor: "#077187",
        pointBorderColor: "#0E1428",
        pointBackgroundColor: "#AFD6AC",
        backgroundColor: "#74A57F"
      }
    };
  },
  created() {},
  methods: {
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event;
    },
    uploadPhoto() {
      var storage = firebase.storage();
      var storageRef = storage.ref();
      let displayName = this.displayName;
      let storageString = displayName + "/profilePic.jpg";
      var ref = storageRef.child(storageString);
      ref.put(this.selectedFile).then(function(snapshot) {
        console.log("Uploaded a blob or file!");
        console.log(snapshot);
      });
    },
    showPic() {
      var storage = firebase.storage();
      var pathReference = storage.ref("mickster/profilePic.jpg");
      pathReference
        .getDownloadURL()
        .then(url => {
          this.file = url;
        })
        .catch(function(error) {
          console.log(error);
          // Handle any errors
        });
    },
    setImage(url) {
      this.file = url;
    },
    tester() {
      var storage = firebase.storage();
      var pathReference = storage.ref("mickster/profilePics.jpg");
      pathReference
        .getDownloadURL()
        .then(url => {
          alert(url);
        })
        .catch(function(error) {
          console.warn(error);
          console.log(error.code);
          // storage/object-not-found
        });
    }

    // Chart js methods
  },
  computed: {
    displayName() {
      return this.$store.getters.userDisplayName;
    }
  }
};
</script>

<style>
</style>