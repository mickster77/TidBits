<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-title class="fix">{{tidBit.title}}</v-card-title>
          <v-img v-if="tidBit.imageURL" :src="tidBit.imageURL"></v-img>
        </v-col>
        <!-- <v-col cols="12">
          <v-img v-if="tidBit.imgSrc" :src="tidBit.imgSrc" aspect-ratio="2.75"></v-img>
        </v-col>-->
        <!-- <v-col cols="12">
          <div class="iframe-container">
            <iframe
              width="100%"
              height="100%"
              v-if="tidBit.youtubeSrc"
              :src="tidBit.youtubeSrc"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </v-col>-->
        <v-col cols="12">
          <v-card-text class="font-italic">{{tidBit.source}}</v-card-text>
        </v-col>
        <v-col cols="12">
          <span v-for="(tag, index) in tidBit.tags" :key="index">
            <v-chip>{{tag}}</v-chip>
          </span>
        </v-col>
        <v-col cols="12">
          <v-card-text>{{tidBit.thought}}</v-card-text>
        </v-col>
        <!-- <v-col cols="12"></v-col> -->
        <v-col cols="12">
          <v-card-actions>
            <!-- dropdown menu -->

            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="teal" dark v-on="on">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteTidBit(tidBit.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";

export default {
  name: "TidBit",
  props: ["tidBit"],
  data() {
    return {
      //   tidBit: {
      //     title: "My Title",
      //     source: "My Source",
      //     thought: "My Thoughts",
      //     tags: ["tag 1", "tag 2"],
      //     nowDate: Date.now(),
      //     id: "12345"
      //   }
    };
  },
  methods: {
    deleteTidBit(id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("TidBits")
        .doc(id) // Gets the doc of a specific id
        .delete(); // This deletes it from the database
    }
  }
};
</script>

<style>
.iframe-container {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
}
.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.fix {
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: normal;
  hyphens: auto;
}
</style>