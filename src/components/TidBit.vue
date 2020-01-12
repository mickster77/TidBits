<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12">
          <!-- <v-img
            src="data:image/webp;base64,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"
          ></v-img>-->
          <v-card-title class="fix">{{tidBit.title}}</v-card-title>
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