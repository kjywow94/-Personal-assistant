<template>
  <v-list>
    <v-list-tile @click="sendPostData" class = "postInfo">
      <v-list-tile-content class = "font">
        <v-list-tile-title>{{ title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ body }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile class = "userInfo">
    <v-list-tile-avatar>
      <img :src="uImg">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ uid }}</v-list-tile-title>
    </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
    </v-list-tile>
    <v-list-tile>
        <v-layout
        align-center
        justify-end
        >
          <v-icon class="mr-1" color="red" @click = "updateLike" v-if="flag">favorite</v-icon>
          <v-icon class="mr-1" @click = "updateLike"  v-else>favorite_border</v-icon>
          <span class="subheading mr-2" >{{ likes.length }}</span>
          <v-icon class="mr-1" color="blue">chat</v-icon>
          <span class="subheading">{{ comments.length }}</span>
      </v-layout>
    </v-list-tile>
  </v-list>
</template>
<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  name: "Post",
  props: {
    date: { type: Date },
    title: { type: String },
    body: { type: String },
    id: { type: String },
    uid: { type: String }
  },
  data() {
    return {
      uImg: "",
      likes: [],
      flag: "",
      comments: []
    };
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`;
    }
  },
  mounted() {
    this.getUserImg();
    this.getLikes();
    this.getLikeFlag();
    this.getComments();
  },
  methods: {
    sendPostData: function() {
      this.$router.push("/postdetail?id=" + this.id);
    },
    updateLike: function() {
      if(this.$store.state.user!=''){
        FirebaseService.updateLike(this.id,"posts",this.$store.state.user.email)
        .then(() => {
          this.getLikes();
          this.getLikeFlag();
        });
      } else {
        alert("로그인을 하세요");
      }
    },
    async getLikes() {
      this.likes = await FirebaseService.getLike(this.id,"posts");
    },
    async getComments() {
      this.comments = await FirebaseService.getComment(this.id, "posts");
    },
    getLikeFlag() {
      FirebaseService.userLikeCheck(this.$store.state.user.email, this.id, "posts").then(res => {
        this.flag = res;
      });
    },
    getUserImg() {
      FirebaseService.getUserImg(this.uid).then(res=>{
        this.uImg = res;
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon|Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Rajdhani&display=swap');

.color-666 {
  color: #666;
}
.color-333 {
  color: #333;
}
.h-100 {
  height: 100%;
}
.userInfo{
  float: right;
  font-family: 'Rajdhani', sans-serif;
}
.list-margin {
  margin: 3px 0;
}
.font{
  font-family: 'Do Hyeon', sans-serif;
  font-size: 25px;
}
.postInfo{
  height: 100px;
}
</style>
