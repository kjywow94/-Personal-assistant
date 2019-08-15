<template>
  <v-card class="mx-auto img" @click="sendPortfolioData">
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
  name: "Portfolio",
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
    this.getLikes();
    this.getComments();
  },
  methods: {
    sendPortfolioData: function() {
      this.$router.push("/portfoliodetail?id=" + this.id);
    },
    updateLike: function() {
      if(this.$store.state.user!=''){
        FirebaseService.updateLike(this.id,"portfolios",this.$store.state.user.email)
        .then(() => {
          this.getLikes();
          this.getLikeFlag();
        });
    }else{
        alert("로그인을 하세요")
      }
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
<style>
.line_check {
  content: "";
  display: block;
  width: 105px;
  border-top: 4px solid #c25b6c;
}
.scale {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.3s ease-in-out;
}
.scale:hover {
  transform: scale(1.2);
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
}
.scale:hover .icon_layout {
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 50px;
  right: 0;
  opacity: 1;
  transition: all.3s linear;
}
.img {
  width: 490px;
  overflow: hidden;
}
.css_title {
  padding-top: 20px;
  color: #ffffff;
  font-size: 1.35rem;
}
.icon_text {
  color: #ffffff;
  font-size: 1rem;
  margin: 0 20px 0 20px;
}
.icon_layout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
}
.title-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.body-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
.user-email {
  font-size: 15px;
}
.text-air {
  position: absolute;
  font-weight: bold;
  top: 65%;
  left: 10%;
  font-family: "Lato", sans-serif;
}
.title_text_check {
  color: #ffffff;
  font-size: 0.9rem;
  height: 10px;
}
@media screen and (max-width: 764px) {
  .img {
    max-width: 400px;
  }
}
@media screen and (max-width: 450px) {
  .img {
    max-width: 380px;
  }
}
@media screen and (max-width: 400px) {
  .img {
    max-width: 350px;
  }
}
@media screen and (max-width: 360px) {
  .img {
    max-width: 330px;
  }
}
@media screen and (max-width: 320px) {
  .img {
    max-width: 300px;
  }
}
</style>
