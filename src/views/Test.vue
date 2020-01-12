<template>
  <div>
    <v-container fluid>
      <v-row row wrap>
        <v-col xs12 sm4 class="ma-2">
          <TidBit :tidBit="tidBit" />
        </v-col>
        <v-col xs12 sm4 class="ma-2">
          <TidBit :tidBit="tidBitTwo" />
        </v-col>
        <v-col xs12 sm4 class="ma-2">
          <TidBit :tidBit="tidBitThree" />
        </v-col>
      </v-row>
    </v-container>
    <v-container sucess ma-5>
      <v-row row wrap>
        <v-col grey darken-3 xs12 ma-3 pa-3>
          <h2>TidBits</h2>
          <p>The total # of tidbits are {{totalTids}}</p>
          <v-btn @click="printTidBits">printTidBits</v-btn>
        </v-col>
        <v-col grey darken-3 xs12 ma-3 pa-3>
          <h2>TidBit Titles</h2>
          <div v-for="(element, index) in tidBitTitles" :key="index">
            <p>{{element}}</p>
          </div>
        </v-col>
        <v-col grey darken-3 xs12 ma-3 pa-3>
          <h2>TidBit Sources</h2>
          <div v-for="(element, index) in tidBitSources" :key="index">
            <p>{{element}}</p>
          </div>
        </v-col>
        <v-col grey darken-3 xs12 red ma-3 pa-3>
          <h2>TidBit Thoughts</h2>
          <div v-for="(element, index) in tidBitThoughts" :key="index">
            <p>{{element}}</p>
          </div>
        </v-col>
        <v-col grey darken-3 xs12 red ma-3 pa-3>
          <h2>TidBit Tag Arrays</h2>
          <div v-for="(element, index) in tidBitTagsArray" :key="index">
            <p>{{element}}</p>
          </div>
        </v-col>
        <v-col grey darken-3 xs12 red ma-3 pa-3>
          <h2>TidBit Tags</h2>
          <p>There are {{tidBitTags.length}} total tags</p>

          <div v-for="(element, index) in tidBitTags" :key="index">
            <p>{{element}}</p>
          </div>
        </v-col>
        <v-col grey darken-3 xs12 red ma-3 pa-3>
          <h2>TidBit Unique Tags</h2>
          <p>There are {{tidBitTagsUnique.length}} unique tags</p>
          <div v-for="(element, index) in tidBitTagsUnique" :key="index">
            <p>{{element}}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";
import TidBit from "@/components/TidBit";

export default {
  name: "Test",
  components: { TidBit },
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
      }
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
    }
  },
  computed: {
    totalTids() {
      return this.tidBits.length;
    },
    tidBitTitles() {
      let array = [];
      this.tidBits.forEach(element => {
        array.push(element.tidBit);
      });
      return array;
    },
    tidBitSources() {
      let array = [];
      this.tidBits.forEach(element => {
        array.push(element.source);
      });
      return array;
    },
    tidBitSourcesUnique() {
      let array = [];
      this.getStoreTidBits.forEach(element => {
        if (!array.includes(element)) {
          array.push(element);
        }
      });
      return array;
    },
    tidBitThoughts() {
      let array = [];
      this.tidBits.forEach(element => {
        array.push(element.thought);
      });
      return array;
    },
    tidBitTagsArray() {
      let array = [];
      this.tidBits.forEach(element => {
        array.push(element.tags);
      });
      return array;
    },
    tidBitTags() {
      let array = [];
      this.tidBitTagsArray.forEach(element => {
        element.forEach(newElement => {
          array.push(newElement);
        });
      });
      return array;
    },
    tidBitTagsUnique() {
      let array = [];
      this.tidBitTags.forEach(element => {
        if (!array.includes(element)) {
          array.push(element);
        }
      });
      return array;
    }
  }
};
</script>

<style>
</style>