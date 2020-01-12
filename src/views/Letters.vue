<template>
  <div>
    <v-container>
      <!-- <v-btn @click="printNotes">Print Notes</v-btn> -->
      <v-row>
        <v-col xs="12">
          <v-combobox v-model="selectedLetter" :items="numLetter" label="Select a letter"></v-combobox>
        </v-col>
        <div v-if="selectedLetter">
          <v-col xs="12">
            <h2>{{visibleLetter.title}}</h2>
          </v-col>
          <v-col xs="12">
            <span v-html="visibleLetter.content"></span>
            <hr />
            <h5>Footnotes:</h5>
            <span v-html="visibleLetter.footnotes"></span>
          </v-col>
          <v-col xs="6">
            <v-text-field filled label="Add a note" v-model="newNote" @keyup.enter="addNote"></v-text-field>
          </v-col>
        </div>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col xs="12" sm="5" v-for="(note,index) in notes" :key="index" class="ma-2">
          <v-card>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{note.note}}</h3>
            </v-card-title>
            <v-card-text>{{note.userName}}</v-card-text>
            <v-card-actions>
              <v-btn text color="warning" @click="deleteNote(note.id)">delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase"; // needed for user auth

export default {
  name: "Letters",
  data() {
    return {
      letters: [],
      selectedLetter: null,
      newNote: null,
      notes: [],
      isLoading: true
    };
  },
  created() {
    let myArray = [];
    db.collection("Letters")
      .orderBy("letterNumber")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          let letter = doc.data();
          myArray.push(letter);
        });
      });
    this.letters = myArray;
    // this.letters = _.sortBy(myArray, [
    //   function(o) {
    //     return o.letterNumber;
    //   }
    // ]);
    // this.letters = _.orderBy(myArray, ["letterNumber"], ["asc"]);
  },
  computed: {
    numLetter() {
      let array = [];
      let i = 0;
      this.letters.forEach(() => {
        i++;
        array.push(i);
      });
      return array;
    },
    visibleLetter() {
      return this.letters[this.selectedLetter - 1];
    }
  },
  watch: {
    // whenever selectedLetter changes, this function will run
    selectedLetter: function() {
      // this.answer = 'Waiting for you to stop typing...'
      // this.debouncedGetAnswer()
      this.updateNotes();
    }
  },
  methods: {
    updateNotes() {
      this.notes = [];
      db.collection("Letters")
        .doc(this.selectedLetter.toString())
        .collection("notes")
        .orderBy("createdAt")
        .onSnapshot(snapshot => {
          this.notes = [];

          snapshot.forEach(doc => {
            // console.log(doc.data());
            let noteDoc = doc.data();
            noteDoc.id = doc.id;
            this.notes.push(noteDoc);
          });
        });
    },
    deleteNote(id) {
      this.notes = [];
      db.collection("Letters")
        .doc(this.selectedLetter.toString())
        .collection("notes")
        .doc(id) // Gets the doc of a specific id
        .delete(); // This deletes it from the database
      // this.updateNotes();
    },
    tester() {
      //   console.table(this.numLetter);
      //   console.log(this.selectedLetter);
      //   console.log(this.visibleLetter);
    },
    addNote() {
      if (firebase.auth().currentUser) {
        this.notes = [];
        db.collection("Letters")
          .doc(this.selectedLetter.toString())
          .collection("notes")
          .add({
            note: this.newNote,
            createdAt: Date.now(),
            uid: firebase.auth().currentUser.uid,
            userName: firebase.auth().currentUser.displayName,
            public: true
          });
      } else {
        alert("You need to be logged in to add a note");
      }
      this.newNote = null;
    },

    printNotes() {
      // console.log(this.visibleNotes);
      // console.log(this.selectedLetter);
      // console.table(this.notes);
      console.table(this.letters);
    }
  }
};
</script>

<style>
</style>