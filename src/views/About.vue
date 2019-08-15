<template>
    <v-layout class="background-imgurl">
    <v-carousel hide-delimiters fill-height light class="margin-top">
      <v-carousel-item v-for="(item, i) in aboutmes" :key="i">
        <v-card class="mx-auto" :width="600" :height="400">
          <v-list class="mx-auto" blue align-center justify-end>
            <v-list-tile class="mx-auto">
              <v-list-tile-avatar size="130px" class="mx-auto avatar">
                <img :src="getImgUrl(item.imgadr)" />
              </v-list-tile-avatar>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="text-style text-title">- {{ item.name }} -</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="text-style text-text">{{ item.contents }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile class="icon-style">
              <v-layout>
                <v-icon color="blue" large class="icon-margin" >fab fa-facebook</v-icon>
                <v-icon color="green" large class="icon-margin">email</v-icon>
                <v-icon color="pink" large class="icon-margin">fab fa-instagram</v-icon>
                <v-icon color="orange" large class="icon-margin">fab fa-gitlab</v-icon>
              </v-layout>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      aboutmes: [
        {
          imgadr: "profile2.jpg",
          contents: "거인의 발이 되어 세상을 뛰어다니고 싶은",
          name: "JunSeok Wi",
          Subtitle: "Hello World"
        },
        {
          imgadr: "profile.jpg",
          contents: "거인의 어깨 위에서 개발을 하고 싶은",
          name: "TaeJune Joung",
          Subtitle: "안녕하세요"
        },
        {
          imgadr: "profile3.jpg",
          contents: "거인의 등이 되어 사람들을 엎고 다닐 수 있는",
          name: "ByeongYong Jo",
          Subtitle: "Well Come To"
        },
        {
          imgadr: "profile4.jpg",
          contents: "거인의 눈이 되어 세상을 한번에 알아보는",
          name: "JunYoung Kim",
          Subtitle: "Oh My Genius"
        },
        {
          imgadr: "profile5.jpg",
          contents: "거인의 손으로 세상을 주무르고 싶은",
          name: "DongSik Moon",
          Subtitle: "HA HA HA HA HA HA"
        }
      ]
    };
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Libre+Caslon+Text:700&display=swap");
@import url("https://fonts.googleapis.com/css?family=Nanum+Myeongjo&display=swap");

.background-imgurl {
  background-image: url(https://c.wallhere.com/photos/4d/27/photography_nature_landscape_mountains_lake_trees_shrubs_snowy_peak-44804.jpg!d);
}
.margin-top {
  margin-top: 200px;
  margin-bottom: 100px;
}
.avatar {
  margin-top: 130px;
}
.text-style {
  margin-top: 240px;
  text-align: center;
}
.text-title {
  font-size: 20px;
  font-family: "Libre Caslon Text", serif;
}
.text-text {
  font-family: "Nanum Myeongjo", serif;
}
.icon-style {
  width: 230px;
  margin: 150px auto 0 auto;
}
.icon-margin {
  margin: 0 10px 0 10px;
}
</style>
