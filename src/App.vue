<template>
  <v-app>
    <v-content>
      <HeaderWeb class="nav_web"></HeaderWeb>
      <HeaderMobile class="nav_mobile"></HeaderMobile>
      <router-view />
      <Footer />
      <FloatingButton id="floating_btn"></FloatingButton>
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        :bottom="true"
        :right="true"
        color="info"
      >
        {{ alert_alarm }}<br />
        {{ alert_alarm_greeting }}
        <v-btn dark flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import store from "./store";
import HeaderWeb from "./components/HeaderWeb.vue";
import HeaderMobile from "./components/HeaderMobile.vue";
import Footer from "./components/Footer.vue";
import FloatingButton from "./components/FloatingButton.vue";
import firebase from "firebase/app";
import FirebaseService from "@/services/FirebaseService";


export default {
  name: "App",
  store,
  data() {
    return {
      alert_alarm: "",
      alert_alarm_greeting: "",
      snackbar: false
    };
  },
  components: {
    HeaderWeb,
    HeaderMobile,
    Footer,
    FloatingButton
  },
  created() {
    FirebaseService.session();
  },
  mounted() {
    this.chormeFix();
  },
  methods: {
    chormeFix() {
      let agent = navigator.userAgent.toLowerCase();
      if (agent.indexOf("chrome") > -1) {
        this.alert_alarm = "크롬으로 접속하셨습니다.";
        this.alert_alarm_greeting = "즐거운 시간 되세요.";
        this.snackbar = true;
      } else {
        this.alert_alarm = "해당 사이트는 크롬에 ";
        this.alert_alarm_greeting = "최적화 되어 있습니다.";
        this.snackbar = true;
      }
    }
  }
};
</script>

<style>
@media screen and (min-width: 1024px) {
  .nav_web {
    display: block;
  }
  .nav_mobile {
    display: none;
  }
  #floating_btn {
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 16px;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
  }
}
@media screen and (max-width: 1024px) {
  .nav_web {
    display: none;
  }
  .nav_mobile {
    display: block;
  }
  #floating_btn {
    position: fixed;
    bottom: 20px;
    right: 10px;
    z-index: 99;
    font-size: 14px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
  }
}
</style>
