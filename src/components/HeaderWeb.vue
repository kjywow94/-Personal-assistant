<template>
  <div style="position: relative;">
    <v-toolbar
      id="headerweb_id"
      fixed
      flat
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      style="background-color: #fff0"
    >
      <router-link to="/" class="nav-web-title">
        <v-toolbar-title>
          <img src="../assets/flamingo.svg" width=20 style="margin-right:0.3rem"/>진격의 巨鳥
        </v-toolbar-title>
      </router-link>
      <span class="user-greeting" v-if="this.$store.state.user != ''">
        <strong>{{ this.$store.state.user.displayName }}님</strong>, 환영합니다
        <strong>{{ this.$store.state.auth }}</strong>
      </span>
      <v-spacer></v-spacer>

      <span @click="favor" class="nav-fav">
        <i id="fav-star" class="far fa-star"></i>
      </span>
      <router-link to="/about" class="nav-item">
        About
      </router-link>
      <router-link to="/kakao" class="nav-item">
        Map
      </router-link>
      <router-link to="/managerpage" class="nav-item" v-if="this.$store.state.auth === 'manager'">
        Adminpage
      </router-link>
      <router-link to="/mypage" class="nav-item" v-if="this.$store.state.user !=''">
        Mypage
      </router-link>
      <router-link to="/todos" class="nav-item" v-if="this.$store.state.user !=''">
        Todo
      </router-link>
      <router-link to="/post" class="nav-item">
        Post
      </router-link>

      <router-link to="/portfolio" class="nav-item">
        Portfolio
      </router-link>

      <router-link
        to="/login"
        class="nav-item"
        v-if="this.$store.state.user == ''"
      >
        Login
      </router-link>
      <span class="nav-item" v-on:click="logout()" v-else>
        Logout
      </span>
    </v-toolbar>
  </div>
</template>
<script>
import FirebaseService from "@/services/FirebaseService";
import store from "../store";

export default {
  name: "Header",
  store,
  data() {
    return {
      isFav: false
    };
  },
  methods: {
    async logout() {
      FirebaseService.logout();
      store.commit("session", "");
      location.href = "/";
    },
    favor: function() {
      if (this.isFav === false) {
        alert("즐겨찾기 하기 위해서는 `Ctrl + D`를 눌러주세요");
        document.getElementById("fav-star").classList.replace("far", "fas");
        this.isFav = true;
      } else {
        alert("즐겨찾기 하기 위해서는 `Ctrl + D`를 눌러주세요");
        document.getElementById("fav-star").classList.replace("fas", "far");
        this.isFav = false;
      }
    }
  }
};
</script>

<style>
/* .gradient-back {
  background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 100%);
} */
.transparency-navbar {
  background-color: #fff0;
}
.nav-web-title {
  color: #fff;
  text-decoration: none;
  margin-left: 0.3rem;
  text-shadow: 2px 2px 2px black;
}
.nav-web-title:hover {
  color: #fff;
  text-decoration: none;
  margin-left: 0.3rem;
}
.nav-item {
  color: #fff;
  margin-right: 1%;
  text-decoration: none;
  text-shadow: 2px 2px 2px black;
  cursor: pointer;
}
.nav-item:hover {
  color: #fff;
  margin-right: 1%;
  text-decoration: none;
}
.nav-fav {
  color: #ffc107;
  margin-right: 1%;
  text-decoration: none;
  text-shadow: 2px 2px 2px black;
}
.nav-fav:hover {
  color: #ffc107;
  margin-right: 1%;
  text-decoration: none;
}
.user-greeting {
  margin-left: 15px;
  margin-top: 5px;
  color: #fff;
  text-shadow: 2px 2px 2px black;
}
</style>
