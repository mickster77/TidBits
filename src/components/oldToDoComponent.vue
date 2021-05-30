<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title class="justify-center display-1">{{name}} todo list</v-card-title>
            <v-card-text>
              <v-list v-for="(item, key) in items" :key="key">
                <v-list-item v-if="item.completed">
                  <span class="completed">{{item.title}}</span>
                  <v-spacer></v-spacer>
                  <v-btn flat icon @click="deleteItem(item.id)">
                    <v-icon color="red">mdi-trash-can-outline</v-icon>
                  </v-btn>
                  <!-- <v-btn flat icon @click="showItemDetail(item.id)">
                    <v-icon color="green">info</v-icon>
                  </v-btn>-->
                  <v-btn flat icon @click="markIncomplete(item.id)">
                    <v-icon color="green">mdi-checkbox-marked-outline</v-icon>
                  </v-btn>
                </v-list-item>
                <v-list-item v-else>
                  <span>{{item.title}}</span>
                  <v-spacer></v-spacer>
                  <v-btn flat icon @click="showItemDetail(item.id)">
                    <v-icon color="green">mdi-information-outline</v-icon>
                  </v-btn>
                  <v-btn flat icon @click="markComplete(item.id)">
                    <v-icon color="green">mdi-checkbox-blank-outline</v-icon>
                  </v-btn>
                </v-list-item>

                <v-list-tile-content v-if="item.body">{{item.body}}</v-list-tile-content>
              </v-list>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="New Todo"
                    type="text"
                    v-model="myTodo"
                    @keyup.enter="addToDo"
                  ></v-text-field>
                </v-flex>
                <v-flex p>
                  <v-btn flat icon @click="addToDo">
                    <v-icon color="green">add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-card-text v-if="errors" class="red--text">{{ errors }}</v-card-text>
            </v-card-text>

            <!-- dropdown menu -->
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">Dropdown</v-btn>
              </template>

              <v-list>
                <v-btn @click="dialog=true">Delete</v-btn>
                <v-btn @click="movetoEnd">Move to End</v-btn>
                <v-btn @click="clearCompleted">Clear Completed</v-btn>
              </v-list>
            </v-menu>

            <!-- dropdown menu -->
            <!-- dialog popup -->
            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>Delete the list?</v-card-title>
                <v-card-actions>
                  <v-btn @click.stop="deleteList">Yes</v-btn>
                  <v-btn @click.stop="dialog=false">No</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- dialog popup -->
            <!-- todo detail dialog popup -->
            <v-dialog v-model="todoDialog" max-width="600px">
              <v-card>
                <v-card-title>Todo Details</v-card-title>
                <v-card-text>{{itemDetail.title}}</v-card-text>
                <v-card-text>{{itemDetail.body}}</v-card-text>

                <v-btn @click.stop="todoDialog=false">Close</v-btn>
              </v-card>
            </v-dialog>
            <!-- todo detail dialog popup -->
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
