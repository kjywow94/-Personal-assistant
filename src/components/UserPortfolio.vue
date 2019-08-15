<template>
  <v-card class="mx-auto img padding_user" max-width="600px" @click="sendPortfolioData">
    <v-img class="scale" :src="imgSrc" height="280px">
      <v-card-text class="text-air">
        <p class="css_title">{{ title }}</p>
        <p class="title_text_check">{{ formatedDate }}</p>
        <div class="line_check"></div>
      </v-card-text>
      <v-card-actions class="icon_layout">
        <v-icon class="mr-1" size="15px" color="red">favorite</v-icon>
        <span class="icon_text">{{ likes.length }}</span>
        <span>.</span>
        <v-icon class="mr-1" size="15px" color="blue">chat</v-icon>
        <span class="icon_text">{{ comments.length }}</span>
      </v-card-actions>
    </v-img>
  </v-card>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  name: "UserPortfolio",
  props: {
    date: { type: Date },
    title: { type: String },
    body: { type: String },
    imgSrc: { type: String },
    id: { type: String },
    uid: { type: String }
  },
  data() {
    return {
      uImg: "",
      time: 0,
      likes: "",
      comments: ""
    };
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}. ${this.date.getMonth()} Month ${this.date.getDate()}`;
    }
  },
  mounted() {
    this.getUserImg();
    this.getLikes();
    this.getComments();
  },
  methods: {
    sendPortfolioData: function() {
      this.$router.push("/portfoliodetail?id=" + this.id);
    },
    async getUserImg() {
      this.uImg = await FirebaseService.getUserImg(this.uid);
    },
    async getLikes() {
      this.likes = await FirebaseService.getLike(this.id, "portfolios");
    },
    async getComments() {
      this.comments = await FirebaseService.getComment(this.id, "portfolios");
    }
  }
};
</script>
