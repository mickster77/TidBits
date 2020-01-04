<template>
  <div>
    <v-container>
      <v-flex xs12>
        <h3>A tidbit is a ...</h3>
      </v-flex>
    </v-container>

    <!-- All TidBits  -->
    <v-container align-center fluid>
      <v-flex xs12>
        <h1>All Tidbits</h1>
        <v-btn round color="primary" @click="showAll=!showAll">Show All</v-btn>
      </v-flex>
      <div v-show="showAll">
        <v-layout row wrap align-start>
          <v-flex xs12 sm4 md3 v-for="tidBit in allTidBits" :key="tidBit.id" class="ma-2">
            <v-card min-height="100">
              <v-card-title primary-title>
                <span class="headline mb-0">{{ tidBit.title }}</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

              <v-card-media contain height="auto" class="mx-3">
                <iframe
                  width="300"
                  height="200"
                  src="https://www.youtube.com/embed/paNuap1mw3A"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-card-media>
              <v-card-text class="font-italic">{{tidBit.source}}</v-card-text>
              <span v-for="(tag, index) in tidBit.tags" :key="index">
                <v-chip>{{tag}}</v-chip>
              </span>
              <v-card-text>{{tidBit.thought}}</v-card-text>
              <v-card-actions>
                <!-- dropdown menu -->
                <v-menu offset-y>
                  <v-btn flat slot="activator" color="orange">
                    <v-icon left>expand_more</v-icon>
                    <span>Actions</span>
                  </v-btn>
                  <v-list>
                    <v-list-tile @click="dialog = true">
                      <!-- <v-list-tile-title>Edit</v-list-tile-title> -->
                      <v-icon>edit</v-icon>
                    </v-list-tile>
                    <v-list-tile @click="deleteTidBit(tidBit.id)">
                      <v-icon>delete</v-icon>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <!-- By Source  -->
    <v-container fluid>
      <v-flex xs12>
        <h1>Tidbit Sources</h1>
        <v-btn @click="showSources=!showSources" round color="primary">Show by Sources</v-btn>
      </v-flex>
      <div v-show="showSources">
        <v-layout row wrap>
          <v-flex v-for="(source, index) in tidBitSourcesUnique" :key="index">
            <v-btn
              round
              :color="sourceButtonColor(source)"
              @click="selectSources(source)"
            >{{source}} ({{totalSource(source)}})</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap align-start>
          <v-flex
            xs12
            sm4
            md3
            v-for="(tidBit,index) in getTidBitsbySource"
            :key="index"
            class="ma-2"
          >
            <v-card min-height="100">
              <v-card-title primary-title>
                <span class="headline mb-0">{{ tidBit.title }}</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text class="font-italic">Source: {{tidBit.source}}</v-card-text>
              <span v-for="(tag, index) in tidBit.tags" :key="index">
                <v-chip>{{tag}}</v-chip>
              </span>
              <v-card-text>{{tidBit.thought}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <!-- By Tag -->
    <v-container fluid>
      <v-flex xs12>
        <h1>Tidbit Tags</h1>
        <v-btn @click="showTags=!showTags" round color="primary">Show by Tags</v-btn>
      </v-flex>

      <div v-show="showTags">
        <v-layout row wrap>
          <v-flex v-for="(tag, index) in tidBitTagsUnique" :key="index">
            <v-btn
              round
              :color="tagButtonColor(tag)"
              @click="selectTags(tag)"
            >{{tag}} ({{totalTags(tag)}})</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap align-start>
          <v-flex xs12 sm4 md3 v-for="(tidBit,index) in getTidBitsbyTags" :key="index" class="ma-2">
            <v-card min-height="100">
              <v-card-title primary-title>
                <span class="headline mb-0">{{ tidBit.title }}</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text class="font-italic">Source: {{tidBit.source}}</v-card-text>
              <span v-for="(tag, index) in tidBit.tags" :key="index">
                <v-chip>{{tag}}</v-chip>
              </span>
              <v-card-text>{{tidBit.thought}}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <!-- Random TidBit -->
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>Random Tidbit</h1>
          <v-btn round color="primary" @click="toggleRandomTidBit">Random Tidbit</v-btn>
        </v-flex>
        <v-flex xs12 sm4 md3 v-show="showRandomTidbit">
          <v-card min-height="100">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{randomTidBit.title}}</h3>
              </div>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="font-italic">{{randomTidBit.source}}</v-card-text>
            <span v-for="(tag, index) in randomTidBit.tags" :key="index">
              <v-chip>{{tag}}</v-chip>
            </span>
            <v-card-text>{{randomTidBit.thought}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Add TidBit -->
    <v-container align-center fluid>
      <v-layout row justify-center>
        <v-btn fab color="info" fixed top right @click="printTidBit">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-flex xs12>
          <v-dialog v-model="dialog" persistent fullscreen>
            <template v-slot:activator="{ on }">
              <v-btn fab color="info" v-on="on" fixed bottom right>
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Tidbit</span>
                <v-spacer></v-spacer>
                <v-btn-toggle v-model="template">
                  <v-btn flat value="book">Book</v-btn>
                  <v-btn flat value="movie">Movie</v-btn>
                  <v-btn flat value="podcast">Podcast</v-btn>
                </v-btn-toggle>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-textarea box label="Tidbit..." required auto-grow v-model="title"></v-textarea>
                        </template>
                        <span>{{tidBitToolTip}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs12 v-show="!template">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-combobox
                            v-model="source"
                            :items="tidBitSourcesUnique"
                            label="Select a source or enter a new one"
                          ></v-combobox>
                          <!-- <v-text-field label="Source" required v-model="source" v-on="on"></v-text-field> -->
                        </template>
                        <span>{{sourceToolTip}}</span>
                      </v-tooltip>
                    </v-flex>
                    <!-- Template Fields -->
                    <!-- Books -->
                    <v-flex xs12 sm6 pr-5 v-show="template=='book'">
                      <v-text-field label="Book Title" v-model="bookTitle"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 pr-5 v-show="template=='book'">
                      <v-text-field label="Author" v-model="bookAuthor"></v-text-field>
                    </v-flex>
                    <!-- Movie -->
                    <v-flex xs12 sm6 pr-5 v-show="template=='movie'">
                      <v-text-field label="Movie Title" v-model="movieTitle"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 pr-5 v-show="template=='movie'">
                      <v-text-field label="Director" v-model="movieDirector"></v-text-field>
                    </v-flex>
                    <!-- Podcast -->
                    <v-flex xs12 sm6 pr-5 v-show="template=='podcast'">
                      <v-text-field label="Podcast Title" v-model="podcastTitle"></v-text-field>
                    </v-flex>

                    <!-- Tags -->
                    <v-flex xs12>
                      <v-combobox
                        xs12
                        v-model="tags"
                        hide-selected
                        hint="Hit enter for each tag"
                        label="tags: "
                        multiple
                        persistent-hint
                        small-chips
                        :items="tidBitTagsUnique"
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 my-3>
                      <v-textarea box label="Thoughts..." auto-grow v-model="thought"></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="cancel">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";

export default {
  name: "Tidbits",

  data() {
    return {
      // for dialog
      dialog: false,
      // TidBit Properties
      title: null,

      source: null,
      thought: null,
      tags: [],

      // Props to help with dialog
      anotherTag: null,
      newTags: [],
      tidBitType: null,
      template: null,
      // book
      bookTitle: null,
      bookAuthor: null,
      // movie
      movieTitle: null,
      movieDirector: null,
      // podcast
      podcastTitle: null,
      // tooltips
      tidBitToolTip:
        "A tidbit is something that spurs thining.  It can be a line from a book, a transient thought, or a favorite quote.",
      sourceToolTip:
        "The source of a tidbit can be a book, a person, or whatever spurred the thought.",

      showAll: false,

      // filters
      selectedSources: [],
      showSources: false,
      selectedTags: [],
      showTags: false,

      // random tidbit
      randomTid: 0,
      showRandomTidbit: false
    };
  },
  created() {
    this.$store.dispatch("updateTidBits");
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },

  computed: {
    isAdmin: function() {
      let isMike = firebase.auth().currentUser.email == "shit.mail@icloud.com";

      if (isMike) {
        return true;
      } else {
        return false;
      }
    },

    isDeveloper: function() {
      let isMike = firebase.auth().currentUser.email == "shit.mail@icloud.com";
      if (isMike) {
        return true;
      } else {
        return false;
      }
    },

    // Filtered tidbit arrays

    // This prop is all tidbits, an array of objects
    allTidBits() {
      return this.$store.state.TidBits;
    },

    // Sources section

    // this array returns tidbits which are filtered by the current selected sources
    getTidBitsbySource() {
      let array = [];
      this.allTidBits.forEach(element => {
        if (this.selectedSources.includes(element.source)) {
          array.push(element);
        } else if (this.selectedSources.includes("none")) {
          if (!element.source) {
            array.push(element);
          }
        }
      });
      return array;
    },

    // this array is a list of sources with duplicates
    tidBitSources() {
      let array = [];
      this.allTidBits.forEach(element => {
        if (element.source) {
          array.push(element.source);
        } else {
          array.push("none");
        }
      });

      return array;
    },

    // this array is a list of sources, unique
    tidBitSourcesUnique() {
      let array = [];
      this.allTidBits.forEach(element => {
        if (!array.includes(element.source)) {
          if (element.source) {
            array.push(element.source);
          } else {
            if (!array.includes("none")) {
              array.push("none");
            }
          }
        }
      });
      return array;
    },

    // Tags Section

    // this property returns an arrary of tags arrays.  Each array is the tags of a tidbit
    tidBitTagsArray() {
      let array = [];
      this.allTidBits.forEach(element => {
        array.push(element.tags);
      });
      return array;
    },
    // This returns an array of all tags, non unique
    tidBitTags() {
      let array = [];
      this.tidBitTagsArray.forEach(element => {
        element.forEach(newElement => {
          array.push(newElement);
        });
      });
      return array;
    },
    // This returns an array of all tags, but only the unique ones.

    tidBitTagsUnique() {
      let array = [];
      this.tidBitTags.forEach(element => {
        if (!array.includes(element)) {
          array.push(element);
        }
      });
      return array;
    },
    // This array is all tidbits which match the currently selected tags
    getTidBitsbyTags() {
      let array = [];
      let allTidBits = this.$store.state.TidBits;
      this.selectedTags.forEach(tag => {
        allTidBits.forEach(tidbit => {
          if (this.hasTags(tidbit, tag)) {
            if (!array.includes(tidbit)) {
              array.push(tidbit);
            }
          }
        });
      });
      return array;
    },

    // This property return a random tidbit
    randomTidBit() {
      if (this.allTidBits.length) {
        return this.allTidBits[this.randomTid];
      } else {
        return { title: "No tidbits" };
      }
    }
  },

  methods: {
    // This method is used to filter tidbits by tags.  It return true if a tidbit has a tag
    hasTags(tidbit, tag) {
      if (tidbit.tags.includes(tag)) {
        return true;
      } else {
        return false;
      }
    },
    // this method nulls the dialog params.  Note, the template params are not nulled
    nullDialogParams() {
      this.title = null;
      this.tags = [];
      this.source = null;
      this.thought = null;
    },
    // Closes the dialog without saving
    cancel() {
      this.dialog = false;
      this.nullDialogParams();
    },
    //Saves the tidbit to the database
    save() {
      this.dialog = false;
      let today = new Date();
      // if a template is selected, set the source value to the template
      if (this.template) {
        this.source = this.template;
      }
      switch (this.source) {
        case "book":
          this.movieTitle = null;
          this.movieDirector = null;
          this.podcastTitle = null;
          break;
        case "movie":
          this.bookAuthor = null;
          this.bookTitle = null;
          this.podcastTitle = null;
          break;
        case "podcast":
          this.movieTitle = null;
          this.movieDirector = null;
          this.bookTitle = null;
          this.bookAuthor = null;
          break;

        default:
          this.movieTitle = null;
          this.movieDirector = null;
          this.bookTitle = null;
          this.bookAuthor = null;
          this.podcastTitle = null;
          break;
      }
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("TidBits")
        .add({
          date:
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate(),
          title: this.title,
          source: this.source,
          thought: this.thought,
          tags: this.tags,
          nowDate: Date.now(),

          // template values
          movieTitle: this.movieTitle,
          movieDirector: this.movieDirector,
          bookTitle: this.bookTitle,
          bookAuthor: this.bookAuthor,
          podcastTitle: this.podcastTitle
        });
      this.nullDialogParams();
    },
    // This method is used for adding tags in the dialog
    addTag() {
      this.tags.push(this.anotherTag);
      this.anotherTag = null;
    },
    // this funciton deletes the tidbit with the specified id
    deleteTidBit(id) {
      db.collection("UserOwned")
        .doc(firebase.auth().currentUser.uid)
        .collection("TidBits")
        .doc(id) // Gets the doc of a specific id
        .delete(); // This deletes it from the database
    },
    printTidBit() {
      // console.log("test");
      console.table(this.randomTidBit.title);
      // console.log(this.randomTidBit.title);

      // console.log(this.allTidBits[0].title);
      // console.table(this.allTidBits);
      // console.log("totoal tidbits: " + this.$store.getters.totalTidBits);
      // console.table(this.$store.state.TidBits);
      // console.log(this.$store.getters.totalTidBits);
      // console.log(this.showAll);
      // console.table(this.tidBitSourcesUnique);
      // console.table(this.getTidBitsbyTags);
    },
    bookTemplate() {
      this.tidBitType = "book";
      this.source = "book";
    },

    // sources section
    // this method adds a source to selectedSources property if it does not contain it (it removes it otherwise)
    selectSources(source) {
      if (source) {
        console.log(source);
      }
      let index = this.selectedSources.indexOf(source);
      if (index > -1) {
        this.selectedSources.splice(index, 1);
      } else {
        this.selectedSources.push(source);
      }
      // console.table(this.selectedSources);
    },

    // this  funciton return a color for the buttons which are used to filter tidbits by source
    sourceButtonColor(source) {
      if (this.selectedSources.includes(source)) {
        return "info";
      } else {
        return "warning";
      }
    },
    // this function returns the number of instances of a specific course
    totalSource(source) {
      let count = 0;
      for (let index = 0; index < this.tidBitSources.length; index++) {
        if (this.tidBitSources[index] === source) {
          count = count + 1;
        }
      }
      return count;
    },
    // tags section

    selectTags(tag) {
      let index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      // console.table(this.selectedTags);
    },

    // this  funciton return a color for the buttons which are used to filter tidbits by tag
    tagButtonColor(tag) {
      if (this.selectedTags.includes(tag)) {
        return "info";
      } else {
        return "warning";
      }
    },
    totalTags(tag) {
      let count = 0;
      for (let index = 0; index < this.tidBitTags.length; index++) {
        if (this.tidBitTags[index] === tag) {
          count = count + 1;
        }
      }
      return count;
    },
    toggleRandomTidBit() {
      let numTidBit = this.allTidBits.length;
      this.randomTid = Math.floor(numTidBit * Math.random());
      this.showRandomTidbit = !this.showRandomTidbit;
    }
  }
};
</script>

<style>
.my-card {
  padding-right: 50px;
}

.v-chip.new {
  background: red;
}
.v-chip.ticketed {
  background: blue;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.completed {
  background: green;
}

.fab {
  /* position: fixed; */
  right: 0;
  bottom: 0;
}
</style>


//     <!-- Template Code -->
//  <v-container fluid>
//       <v-layout row wrap>
//         <v-flex xs12>
//           <h1>Templates</h1>
//         </v-flex>
//         <v-flex xs12 class="py-2">
//           <v-btn-toggle v-model="template">
//             <v-btn flat value="book">Book</v-btn>
//             <v-btn flat value="movie">Movie</v-btn>
//             <v-btn flat value="podcast">Podcast</v-btn>
//           </v-btn-toggle>
//           <!-- template  -->
//         </v-flex>
//         <!-- book -->

//         <v-flex xs12 sm6 pr-5 v-show="template=='book'">
//           <v-text-field label="Book Title" v-model="bookTitle"></v-text-field>
//         </v-flex>
//         <v-flex xs12 sm6 pr-5 v-show="template=='book'">
//           <v-text-field label="Author" v-model="bookAuthor"></v-text-field>
//         </v-flex>
//         <!-- Movie -->
//         <v-flex xs12 sm6 pr-5 v-show="template=='movie'">
//           <v-text-field label="Movie Title" v-model="movieTitle"></v-text-field>
//         </v-flex>
//         <v-flex xs12 sm6 pr-5 v-show="template=='movie'">
//           <v-text-field label="Director" v-model="movieDirector"></v-text-field>
//         </v-flex>
//         <!-- Podcast -->
//         <v-flex xs12 sm6 pr-5 v-show="template=='podcast'"> 
//           <v-text-field label="Podcast Title" v-model="podcastTitle"></v-text-field>
//         </v-flex>
//       </v-layout>
//     </v-container>