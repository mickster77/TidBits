<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <!-- vuetify example -->
        <!-- <v-expansion-panel>
        <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
          <template v-slot:header>
            <div>Item</div>
          </template>
          <v-card>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        </v-expansion-panel>-->

        <v-container>
          <v-expansion-panel>
            <v-expansion-panel-content v-for="question in Questions" :key="question.title">
              <template v-slot:header>
                <div class="myFaq">{{question.title}}</div>
              </template>
              <v-card>
                <v-card-text>{{question.answer}}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "FAQ",
  data() {
    return {
      Questions: [
        {
          title: "What do I do after submitting a request?",
          answer:
            "You should verify the requests populates on the home page and you get an email.  If the request is on the home page, and no email, shoot Kay an email to ensure she sees the new request."
        },
        {
          title:
            "What do the different states represent?  E.g., 'new,' 'ongoing,' 'completed'",
          answer:
            "The states reflect where the travel request is in its lifecycle.  'New' means the request is for action with Kay.  'Ticketed' means Kay has finished and the William has action to provide an envelope.  'Ongoing' means the envelope has been delieved to the user.  Action is on the user to submit a travel claim.  'Completed' means the travel claim is complete and there is no further action on the request"
        },
        {
          title: "question 3",
          answer: "answer 3"
        }
      ]
    };
  }
};
</script>

<style>
.myFaq {
  color: lightgreen;
  font-weight: bold;
  font-size: 12pt;
}
</style>