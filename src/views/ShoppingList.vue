<template>
  <v-container align-center id="top">
    <v-row>
      <!-- this is the floating button to go to top -->
      <v-btn
        @click="$vuetify.goTo(topTarget)"
        fab
        color="primary"
        fixed
        bottom
        right
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-col cols="12">
        <v-card class="ma-1 pa-1">
          <v-btn color="primary" @click="$vuetify.goTo('#shelf')">Shelf</v-btn>
        </v-card>
        <v-card class="ma-1 pa-1">
          <v-card-title>List:</v-card-title>
          <v-btn
            v-for="(type, index) in types"
            :key="'btn' + index"
            color="primary"
            class="ma-1"
            v-show="anyItems(type)"
            @click="$vuetify.goTo('#' + type)"
            >{{ type }}</v-btn
          >
          <!-- this card is repeated for each type -->

          <v-card
            color="grey darken-4"
            class="ma-1 pa-1"
            v-for="(type, index) in types"
            :key="'list-type' + index"
            v-show="anyItems(type)"
            :id="type"
          >
            <v-card-title class="justify-center"> {{ type }} </v-card-title>

            <div v-for="item in shoppingList" :key="item.id">
              <div v-show="item.type == type">
                <!-- if complete -->
                <div v-if="item.completed" class="box">
                  <v-btn icon @click="markIncomplete(item.id)">
                    <v-icon color="green">mdi-checkbox-marked-outline</v-icon>
                  </v-btn>
                  <span class="completed">{{ item.name }}</span>
                  <v-btn icon @click="deleteItem(item.id)" class="push">
                    <v-icon color="red">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </div>

                <!-- if not complete -->
                <div v-else class="box">
                  <v-btn icon @click="markComplete(item.id)">
                    <v-icon color="green">mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </v-card>

          <v-card color="grey darken-4" class="ma-1 pa-1">
            <v-card-title>Add random item to list</v-card-title>
            <v-row class="mx-3">
              <v-col cols="12" lg="4" md="6">
                <v-text-field
                  v-model="newItemforList"
                  label="name"
                  @keydown.enter="addItemToList"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="4" md="6">
                <v-btn color="primary" @click="addItemToList">Add</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <v-btn
            class="ma-3"
            color="warning"
            @click="deleteAllCompletedShoppingItems()"
            >Clear All Completed</v-btn
          >
          <v-btn class="ma-3" color="error" @click="deleteAllShoppingItems()"
            >Clear All
          </v-btn>
        </v-card>

        <!-- Shelf Card!! -->

        <v-card class="ma-1 pa-1" id="shelf">
          <v-card-title>Shelf:</v-card-title>
          <v-btn
            v-for="(type, index) in types"
            :key="'btn-shelf' + index"
            color="primary"
            class="ma-1"
            @click="$vuetify.goTo('#shelf' + type)"
            >{{ type }}</v-btn
          >
          <v-card
            color="grey darken-4"
            class="ma-1 pa-1"
            v-for="(type, index) in types"
            :key="'shelf' + index"
            :id="'shelf' + type"
          >
            <v-card-title class="justify-center"> {{ type }} </v-card-title>

            <div v-for="item in shelfList" :key="item.id">
              <div v-show="item.type == type" class="box">
                <v-btn icon @click="addToList(item.name, item.type)">
                  <v-icon color="green">mdi-plus</v-icon>
                </v-btn>
                <span>
                  {{ item.name }}
                </span>
                <v-btn icon @click="deleteShelfItem(item.id)" class="push">
                  <v-icon color="red">mdi-trash-can-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
          <v-card color="grey darken-4" class="ma-1 pa-1">
            <v-card-title>Add item to shelf</v-card-title>
            <v-row>
              <v-col lg="4" md="6" sm="12" xs12>
                <v-text-field
                  v-model="newItemName"
                  label="name"
                  @keydown.enter="addToShelf"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="4" md="6">
                <v-select
                  :items="types"
                  label="Standard"
                  v-model="newItemType"
                ></v-select>
              </v-col>
              <v-col cols="12" lg="4" md="6">
                <v-btn color="primary" @click="addToShelf">Add</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-card v-show="false">
      <h1>Burnlist</h1>
      <ul>
        <li>detele shelf item - done</li>
        <li>clear list button - done</li>
        <li>clear completed list butto - done</li>
        <li>Conditionaly render buy list only if items are there... - Done</li>
      </ul>
    </v-card>
  </v-container>
</template>

<script>
import db from "@/firebase/init"; //needed for database calls

export default {
  name: "ShoppingList",
  data() {
    return {
      shoppingList: [],
      shelfList: [],
      types: [
        "Fruit",
        "Veggies",
        "Meat",
        "Seafood",
        "Deli",
        "Condiments-Spices",
        "Dairy",
        "Canned-Goods",
        "Pasta",
        "Grains",
        "Frozen",
        "Beverages",
        "Household",
        "Costco",
        "Trader Joes",
        "Other",
      ],
      //for adding foods to shelf
      newItemName: null,
      newItemType: null,
      // for adding item to list
      newItemforList: null,
      // for scroll targets
      scrollName: "Mike",
    };
  },
  async created() {
    //   get shopping list
    this.shoppingList = [];
    let newList = [];
    db.collection("shoppingList").onSnapshot((snapshot) => {
      newList = [];
      snapshot.forEach((doc) => {
        newList.push({
          name: doc.data().name,
          type: doc.data().type,
          completed: doc.data().completed,
          id: doc.id,
        });
      });
      this.shoppingList = newList;
    });

    //   get shelf list

    this.shelfList = [];
    let newShelfList = [];
    db.collection("shelfList").onSnapshot((snapshot) => {
      newShelfList = [];
      snapshot.forEach((doc) => {
        newShelfList.push({
          name: doc.data().name,
          type: doc.data().type,
          id: doc.id,
        });
      });
      this.shelfList = newShelfList;
    });
  },
  methods: {
    addToList(name, type) {
      db.collection("shoppingList").add({
        name: name,
        type: type,
        completed: false,
      });
    },
    addItemToList() {
      if (this.newItemforList != null) {
        db.collection("shoppingList")
          .add({
            name: this.newItemforList,
            type: "Other",
            completed: false,
          })
          .then(() => {
            this.newItemforList = null;
          });
      }
    },

    deleteItem(id) {
      if (id) {
        db.collection("shoppingList")
          .doc(id)
          .delete()
          .then(function () {})
          .catch(function (error) {
            this.error = error;
          });
      } else {
        this.error = "Invalid ID";
      }
    },

    deleteShelfItem(id) {
      if (id) {
        db.collection("shelfList")
          .doc(id)
          .delete()
          .then(function () {})
          .catch(function (error) {
            this.error = error;
          });
      } else {
        this.error = "Invalid ID";
      }
    },

    deleteAllShoppingItems() {
      this.shoppingList.forEach((item) => {
        let id = item.id;
        db.collection("shoppingList")
          .doc(id)
          .delete()
          .then(function () {})
          .catch(function (error) {
            this.error = error;
          });
      });
    },

    deleteAllCompletedShoppingItems() {
      this.shoppingList.forEach((item) => {
        if (item.completed == true) {
          let id = item.id;
          db.collection("shoppingList")
            .doc(id)
            .delete()
            .then(function () {})
            .catch(function (error) {
              this.error = error;
            });
        }
      });
    },

    markComplete(id) {
      db.collection("shoppingList").doc(id).set(
        {
          completed: true,
        },
        { merge: true }
      );
    },
    markIncomplete: function (id) {
      db.collection("shoppingList").doc(id).set(
        {
          completed: false,
        },
        { merge: true }
      );
    },
    addToShelf() {
      if (this.newItemType == null) {
        this.newItemType = "Other";
      }

      if (this.shelfList.some((e) => e.name === this.newItemName)) {
        alert("This item is already on the shelf");
      } else {
        db.collection("shelfList")
          .add({
            name: this.newItemName,
            type: this.newItemType,
          })
          .then(() => {
            this.newItemName = null;
            this.newItemType = null;
          });
      }
    },
    anyItems(type) {
      if (this.shoppingList.some((e) => e.type === type)) {
        return true;
      } else {
        return false;
      }
    },
    goToScrollTarget(name) {
      this.scrollName = name.replace(/\s/g, "");
      this.$vuetify.goTo(this.target);
    },
  },
  computed: {
    topTarget() {
      return screenTop;
    },
    target() {
      // for v-scroll
      // alert(this.scrollName);
      return "#" + this.scrollName;
    },
  },
};
</script>

<style>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.push {
  margin-left: auto;
}
</style>