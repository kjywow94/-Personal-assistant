<template>
<v-layout class="background-imgurl" style="width: 100%; height: 100%;">
  <v-carousel fill-height class="margin-top">
    <v-card class="mx-auto" :width="800" :height="380">
      <Kakaomap></Kakaomap>
    </v-card>
  </v-carousel>
</v-layout>
</template>

<script>
import Kakaomap from "../components/Kakaomap";
export default {
  name: "Kakaomapapi",
  data() {
    return {};
  },
  components: {
    Kakaomap
  }

};
</script>

<style>
.background-imgurl {
  background-image: url(https://c.wallhere.com/photos/4d/27/photography_nature_landscape_mountains_lake_trees_shrubs_snowy_peak-44804.jpg!d);
}
</style>
