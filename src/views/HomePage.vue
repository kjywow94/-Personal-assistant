<template>
  <div>
    <ImgBanner id="imgSrc" class="slider0">
      <div class="main-title-after-ko" slot="text">
        우리 모두가 잘되는 그날까지
      </div>
    </ImgBanner>

    <div id="demo" style="display:none;">
      <v-btn fab dark large color="#ffc107" v-on:click="show = !show">
        <v-icon dark>home</v-icon>
      </v-btn>
      <transition name="fade">
        <Kakaomap v-if="show"></Kakaomap>
      </transition>
    </div>

    <!-- Portfolio -->
    <v-layout class="backcolor-portfolios">
      <v-flex>
        <PortfolioList />
      </v-flex>
    </v-layout>

    <!-- Post -->
    <v-layout style="display:none;">
      <v-flex xs12 my-5>
        <h2 class="headline my-5 text-xs-center">
          <router-link to="/post" class="a-custom">
            Post
          </router-link>
        </h2>
        <PostList :column="2"></PostList>
      </v-flex>
    </v-layout>

    <!-- Github -->
    <v-layout style="display:none;">
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center">
          <router-link to="/project" class="a-custom">
            Repository
          </router-link>
        </h2>
        <RepositoryList></RepositoryList>
      </v-flex>
    </v-layout>

    <!-- Google -->
    <v-layout>
      <div style="display:none;" id="chart-1-container"></div>
      <div style="display:none;" id="chart-2-container"></div>
      <div style="display:none;" id="chart-3-container"></div>
    </v-layout>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import RepositoryList from "../components/RepositoryList";
import Kakaomap from "../components/Kakaomap";

export default {
  name: "HomePage",
  data() {
    return {
      dialog: false,
      show: false
    };
  },
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    Kakaomap
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    }
  }
};
</script>

<style>
.backcolor {
  background-image: linear-gradient(
    to bottom,
    #ffffff 30%,
    #ffffff 50%,
    #ffffff 75%
  );
}
.backcolor-portfolios {
  background-image: linear-gradient(
    to bottom,
    #000000 0%,
    #141740 50%,
    #000000 75%
  );
}
.backcolor-user {
  background-image: linear-gradient(
    to bottom,
    #4d4d4d 30%,
    #4d4d4d 50%,
    #4d4d4d 75%
  );
}
.slider_padiing {
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 60px;
}
.goog-te-banner-frame {
  display: none;
}
#imgurup {
  display: none;
  position: absolute;
}
@media screen and (max-width: 1024px) {
  .profile_hidden {
    display: none;
  }
  .about-center {
    text-align: center;
  }
}
.about-center {
  margin-top: 2rem;
}
.a-custom {
  color: #000;
  text-decoration: none;
}
.a-custom:hover {
  color: #fff;
  background: #5c6bc0;
}
.main-title {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%) rotateZ(0deg);
  font-size: 9vw;
  font-weight: 700;
  color: rgb(255, 255, 255);
  text-shadow: rgb(98, 106, 114) 1px 1px, rgb(98, 106, 114) 2px 2px,
    rgb(98, 106, 114) 3px 3px, rgb(98, 106, 114) 4px 4px,
    rgb(98, 106, 114) 5px 5px, rgb(98, 106, 114) 6px 6px,
    rgb(98, 106, 114) 7px 7px, rgb(98, 106, 114) 8px 8px,
    rgb(99, 106, 114) 9px 9px, rgb(99, 106, 114) 10px 10px,
    rgb(100, 107, 114) 11px 11px, rgb(101, 107, 114) 12px 12px,
    rgb(101, 107, 114) 13px 13px, rgb(101, 108, 114) 14px 14px,
    rgb(101, 108, 114) 15px 15px, rgb(102, 108, 115) 16px 16px,
    rgb(103, 108, 115) 17px 17px, rgb(104, 108, 115) 18px 18px,
    rgb(104, 109, 115) 19px 19px, rgb(104, 110, 116) 20px 20px,
    rgb(105, 110, 116) 21px 21px, rgb(106, 110, 116) 22px 22px;
}
.main-title-after {
  position: absolute;
  left: 65%;
  top: 60%;
  font: 600 3vw/1.5 "Work Sans", sans-serif;
  color: rgb(255, 255, 255);
  text-shadow: #626a72 1px 1px, #626a72 2px 2px, #626a72 3px 3px,
    #626a72 4px 4px, #626a72 5px 5px, #626a72 6px 6px;
}
.main-title-after-ko {
  position: absolute;
  left: 65%;
  top: 68%;
  font: 600 0.8vw/1.5 "Work Sans", sans-serif;
  color: rgb(255, 255, 255);
  text-shadow: #626a72 1px 1px, #626a72 2px 2px, #626a72 3px 3px,
    #626a72 4px 4px, #626a72 5px 5px, #626a72 6px 6px;
}
.fade-enter-active .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter .fade-leave-to {
  opacity: 0;
}
</style>
