<template>
  <div>
    <v-container fluid>
      <v-row justify-center>
        <v-col cols="12">
          <v-card>
            <v-card-title class="display-2">TidBits</v-card-title>
            <v-card-subtitle
              class="headline"
            >The TidBits app (thisis a test) is a way to annote small blurbs of information, called TidBits. TidBits typically have a source, such as a book, podcast or even passing conversation. TidBits also can be tagged, which allows looking over all TidBits related to a certain topic.</v-card-subtitle>
            <v-card-subtitle
              class="headline"
            >Use the plus button in the corner to create a new Tidbits. The other controls below allow selective viewing of TidBits.</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- all tidbits -->
    <v-container>
      <v-row>
        <v-col>
          <h1>All TidBits</h1>
          <v-btn rounded color="primary" @click="showAll=!showAll">Show All</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="showAll">
        <v-col cols="12" sm="4" v-for="tidBit in allTidBits" :key="tidBit.title">
          <TidBit :tidBit="tidBit" />
        </v-col>
      </v-row>
    </v-container>

    <!-- By Source  -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>TidBits by Source</h1>
          <v-btn rounded color="primary" @click="showSources=!showSources">TidBit Sources</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="showSources">
        <v-col v-for="(source, index) in tidBitSourcesUnique" :key="index">
          <v-btn
            rounded
            :color="sourceButtonColor(source)"
            @click="selectSources(source)"
          >{{source}} ({{totalSource(source)}})</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" sm="4" v-for="tidBit in getTidBitsbySource" :key="tidBit.title">
          <TidBit :tidBit="tidBit" />
        </v-col>
      </v-row>
      <v-row v-if="showAll" cols="12"></v-row>
    </v-container>

    <!-- By Tag  -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>TidBits by Tags</h1>
          <v-btn rounded color="primary" class="mx-3" @click="showTags=!showTags">TidBit Tags</v-btn>
          <v-btn
            rounded
            color="success"
            class="mx-3"
            @click="sortTagsbyTotal=!sortTagsbyTotal"
          >Sort by Number: {{sortTagsbyTotal}}</v-btn>
          <!-- <v-btn
            rounded
            color="success"
            class="mx-3"
            @click="sortTagsAlpha=!sortTagsAlpha"
          >Sort Alphabetically: {{sortTagsAlpha}}</v-btn>-->
        </v-col>
      </v-row>
      <v-row v-if="showTags">
        <v-col v-for="(tag, index) in tidBitTagsUnique" :key="index">
          <v-btn
            rounded
            :color="tagButtonColor(tag)"
            @click="selectTags(tag)"
          >{{tag}} ({{totalTags(tag)}})</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" sm="4" v-for="tidBit in getTidBitsbyTags" :key="tidBit.title">
          <TidBit :tidBit="tidBit" />
        </v-col>
      </v-row>
      <v-row v-if="showAll" cols="12"></v-row>
    </v-container>

    <!-- Random TidBit -->
    <v-container>
      <v-row>
        <v-col>
          <h1>Random TidBits</h1>
          <v-btn rounded color="primary" @click="toggleRandomTidBit">Random Tidbit</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" sm="4" v-show="showRandomTidbit">
          <TidBit :tidBit="randomTidBit" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Add TidBit -->
    <v-container align-center fluid>
      <v-row row justify-center>
        <v-col xs12>
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ on }">
              <v-btn fab color="info" v-on="on" fixed bottom right>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-container>
                <v-row>
                  <v-col>
                    <v-card-title>
                      <span class="headline">Add Tidbit</span>
                      <v-spacer></v-spacer>
                      <v-btn-toggle v-model="template">
                        <v-btn text value="book">Book</v-btn>
                        <v-btn text value="movie">Movie</v-btn>
                        <v-btn text value="podcast">Podcast</v-btn>
                      </v-btn-toggle>
                    </v-card-title>
                  </v-col>
                </v-row>
                <v-row></v-row>
              </v-container>

              <v-card-text>
                <v-container grid-list-md>
                  <v-row>
                    <v-col cols="12">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-textarea v-on="on" filled label="Tidbit..." auto-grow v-model="title"></v-textarea>
                        </template>
                        <span>{{tidBitToolTip}}</span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="12">
                      <v-combobox
                        v-model="source"
                        :items="tidBitSourcesUnique"
                        label="Select a source or enter a new one"
                      ></v-combobox>
                      <!-- <v-text-field label="Source" required v-model="source" v-on="on"></v-text-field> -->
                    </v-col>
                    <!-- Template Fields -->
                    <!-- Books -->
                    <v-col cols="12" v-show="template=='book'">
                      <v-text-field label="Book Title" v-model="bookTitle"></v-text-field>
                    </v-col>
                    <v-col cols="12" v-show="template=='book'">
                      <v-text-field label="Author" v-model="bookAuthor"></v-text-field>
                    </v-col>
                    <!-- Movie -->
                    <v-col cols="12" v-show="template=='movie'">
                      <v-text-field label="Movie Title" v-model="movieTitle"></v-text-field>
                    </v-col>
                    <v-col cols="12" v-show="template=='movie'">
                      <v-text-field label="Director" v-model="movieDirector"></v-text-field>
                    </v-col>
                    <!-- Podcast -->
                    <v-col cols="12" v-show="template=='podcast'">
                      <v-text-field label="Podcast Title" v-model="podcastTitle"></v-text-field>
                    </v-col>

                    <!-- Tags -->
                    <v-col cols="12">
                      <v-combobox
                        v-model="tags"
                        hide-selected
                        hint="Hit enter for each tag"
                        label="tags: "
                        multiple
                        persistent-hint
                        small-chips
                        :items="tidBitTagsUnique"
                      ></v-combobox>
                    </v-col>
                    <v-col>
                      <v-text-field label="Image URL" v-model="imageURL"></v-text-field>
                    </v-col>
                    <v-col cols="12" my-3>
                      <v-textarea box label="Thoughts..." auto-grow v-model="thought"></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="cancel">Cancel</v-btn>
                <v-btn color="primary" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="ma-1">
            <v-card-title>Sidebar</v-card-title>

            <v-card class="mx-auto" max-width="500">
              <v-list>
                <v-list-item-group v-model="model">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>All TidBits</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>By Source</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>By Tags</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Random</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-card>
        </v-col>

        <v-col cols="12" md="9">
          <v-card class="ma-1">
            <v-card-title>Main</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";
import TidBit from "@/components/TidBit";

export default {
  name: "Tidbits",
  components: { TidBit },

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
      // image
      imageURL: null,
      // tooltips
      tidBitToolTip:
        "A tidbit is something that spurs a thought.  It can be a line from a book, a memorable quote, or an interaction with a friend.",
      sourceToolTip:
        "The source of a tidbit can be a book, a person, or whatever spurred the thought.",

      showAll: false,

      // filters
      selectedSources: [],
      showSources: false,
      selectedTags: [],
      showTags: false,
      sortTagsAlpha: false,
      sortTagsbyTotal: false,

      // random tidbit
      randomTid: 0,
      showRandomTidbit: false,

      // side bar
      items: [
        {
          icon: "mdi-inbox",
          text: "All TidBits"
        },
        {
          icon: "mdi-star",
          text: "By Source"
        },
        {
          icon: "mdi-send",
          text: "By Tags"
        },
        {
          icon: "mdi-email-open",
          text: "Random"
        }
      ],
      model: 1
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
      if (this.sortTagsAlpha) {
        return array.sort();
      } else if (this.sortTagsbyTotal) {
        return array.sort((a, b) => {
          if (this.totalTags(a) > this.totalTags(b)) {
            return -1;
          } else if (this.totalTags(b) > this.totalTags(a)) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        return array;
      }
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
          podcastTitle: this.podcastTitle,

          // imageURL
          imageURL: this.imageURL
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
//       <v-row row wrap>
//         <v-col xs12>
//           <h1>Templates</h1>
//         </v-col>
//         <v-col xs12 class="py-2">
//           <v-btn-toggle v-model="template">
//             <v-btn text value="book">Book</v-btn>
//             <v-btn text value="movie">Movie</v-btn>
//             <v-btn text value="podcast">Podcast</v-btn>
//           </v-btn-toggle>
//           <!-- template  -->
//         </v-col>
//         <!-- book -->

//         <v-col xs12 sm6 pr-5 v-show="template=='book'">
//           <v-text-field label="Book Title" v-model="bookTitle"></v-text-field>
//         </v-col>
//         <v-col xs12 sm6 pr-5 v-show="template=='book'">
//           <v-text-field label="Author" v-model="bookAuthor"></v-text-field>
//         </v-col>
//         <!-- Movie -->
//         <v-col xs12 sm6 pr-5 v-show="template=='movie'">
//           <v-text-field label="Movie Title" v-model="movieTitle"></v-text-field>
//         </v-col>
//         <v-col xs12 sm6 pr-5 v-show="template=='movie'">
//           <v-text-field label="Director" v-model="movieDirector"></v-text-field>
//         </v-col>
//         <!-- Podcast -->
//         <v-col xs12 sm6 pr-5 v-show="template=='podcast'"> 
//           <v-text-field label="Podcast Title" v-model="podcastTitle"></v-text-field>
//         </v-col>
//       </v-row>
//     </v-container>