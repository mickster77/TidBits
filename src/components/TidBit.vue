<template>
  <v-card>
    <v-card-title primary-title>
      <span class="headline mb-0">{{ tidBit.title }}</span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-img v-if="tidBit.imgSrc" :src="tidBit.imgSrc" aspect-ratio="2.75"></v-img>

    <v-card-media contain height="auto">
      <!-- <iframe
        width="300"
        height="200"
        src="https://www.youtube.com/embed/paNuap1mw3A"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>-->
      <iframe
        v-if="tidBit.youtubeSrc"
        width="300"
        height="200"
        :src="tidBit.youtubeSrc"
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
</template>

<script>
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
  }
};
</script>

<style>
</style>