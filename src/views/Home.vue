<template>
  <div>
    <v-container fluid class="num1">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-4 mb-4">TidBits</h1>
          <h4 class="subheading">Some stupid tagline!</h4>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn color="secondary">Check it your TidBits!</v-btn>
      </v-row>
    </v-container>
    <v-container fluid class="num2">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-4 mb-4">Todo</h1>
          <h4 class="subheading">You really cannot have enough lists...</h4>
          <v-btn color="secondary">Check it your Todos!</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="num3">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-4 mb-4">Weight Tracker</h1>
          <h4 class="subheading">I have pretty graphs!!!</h4>
          <v-btn color="secondary">Track how fat you get!</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="num4">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-4 mb-4 black--text">Weight Tracker</h1>
          <h4 class="subheading black--text">I have pretty graphs!!!</h4>
          <v-btn color="secondary">Track how fat you get!</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="num5">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-4 mb-4 black--text">Weight Tracker</h1>
          <h4 class="subheading black--text">I have pretty graphs!!!</h4>
          <v-btn color="secondary">Track how fat you get!</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.num1 {
  background-color: #40434e;
  color: white;
}
.num2 {
  background-color: #44cf6c;
  color: white;
}
.num3 {
  background-color: #ef233c;
  color: white;
}

.num4 {
  background-color: #fffffa;
  color: black;
}
.num5 {
  background-color: #00a5cf;
  color: white;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
}
h4 {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>