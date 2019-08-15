<template>
  <div>
    <ImgBanner imgSrc="https://picsum.photos/1400/600">
      <div
        style="line-height:1.2em;font-size:1.2em;"
        slot="text"
        class="main-title"
      >
        Post
      </div>
    </ImgBanner>
    <v-container>
      <v-flex xs12>
        <PostWriter class="create-which" />
      </v-flex>
      <v-layout>
        <v-flex xs12>
          <PostList :limits="6" :load-more="true" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PostList from "../components/PostList";
import PostWriter from "../components/PostWriter";

export default {
  name: "PostPage",
  components: {
    ImgBanner,
    PostList,
    PostWriter
  }
};
</script>
