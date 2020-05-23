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
  </div>
</template>

<script>
import firebase from "firebase"; // needed for cloud storage
import db from "@/firebase/init";
// import TidBit from "@/components/TidBit";

export default {
  name: "Test",
  // components: { TidBit },
  data() {
    return {
      myData: "data",
      tidBits: [],
      tidBit: {
        title: "My Title",
        source: "My Source",
        thought: "My Thoughts",
        tags: ["tag 1", "tag 2"],
        nowDate: Date.now(),
        id: "12345",
        youtubeSrc: "https://www.youtube.com/embed/paNuap1mw3A",
        imgSrc: null
      },
      tidBitTwo: {
        title: "My Title Two",
        source: "My Source Two",
        thought: "My Thoughts Two",
        tags: ["tag 3", "tag 2"],
        nowDate: Date.now(),
        id: "23456",
        youtubeSrc: null,
        imgSrc: "https://cdn.vuetifyjs.com/images/cards/forest.jpg"
      },
      tidBitThree: {
        title: "My Title Three",
        source: "My Source Three",
        thought: "My Thoughts Three",
        tags: ["tag 3", "tag 5"],
        nowDate: Date.now(),
        id: "34567",
        youtubeSrc: null,
        imgSrc: "https://images.app.goo.gl/JaTQzQTo9EFGZUu8A"
      },
      // file input
      file: null,
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      selectedFile: null
    };
  },
  created() {
    db.collection("TidBits")
      //   .doc("T9sYDh8nUMgknDTIXZVmzeTORxD3")
      .doc("rzVz2xWp03QloC8HEkXQ2tpyWb82")
      .collection("TidBits")
      .orderBy("nowDate")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          let TidBit = doc.data();
          let id = doc.id;
          TidBit.id = id;
          this.tidBits.push(TidBit);
        });
      });
  },
  methods: {
    printTidBits() {
      // console.table(this.tidBitTags);
    },
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