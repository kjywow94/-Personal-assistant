<template>
  <v-layout mw-700>
    <v-timeline>
      <v-timeline-item
        :key="i"
        v-for="i in posts.length"
        class="time"
      >
        <v-card class="mx-auto" max-width="700">
          <Post
            :date="posts[i - 1].created_at"
            :title="posts[i - 1].title"
            :body="posts[i - 1].body"
            :id="posts[i - 1].id"
            :uid="posts[i - 1].uid"
          />
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-layout>
</template>

<script>
import Post from "@/components/Post";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 }
  },
  data() {
    return {
      posts: []
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    }
  }
};

$(window).resize(function() {
   if($(window).width() <=700) {
     $( '.time' ).addClass( 'v-timeline-item--left' );
   };
   if($(window).width() >700) {
     $( '.time' ).removeClass( 'v-timeline-item--left' );
   }
  }
);


</script>


<style>
.time{
  width : 700px;
}
@media screen and (max-width: 1200px) {
  .time {
    max-width: 800px;
  }
}
@media screen and (max-width: 900px) {
  .time {
    max-width: 700px;
  }
}
@media screen and (max-width: 450px) {
  .time {
    max-width: 700px;
  }
}
@media screen and (max-width: 400px) {
  .time {
    max-width: 650px;
  }
}
@media screen and (max-width: 360px) {
  .time {
    max-width: 600px;
  }
}
@media screen and (max-width: 320px) {
  .time {
    max-width: 500px;
  }
}
</style>
