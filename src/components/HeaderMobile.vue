<template>
<div>
  <v-toolbar-side-icon @click="siderMenuDisplay" class="sider_toggle" fixed right>
  </v-toolbar-side-icon>
  <v-navigation-drawer :class="this.sider_display" id="sider-bar" fixed right stateless value="true" z-index="70">
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <img src="../assets/flamingo.svg" width=20 style="margin-right:0.3rem">
        </v-list-tile-action>
        <v-list-tile-title>
          <router-link to="/" class="mobile-title">
            진격의 巨鳥
          </router-link>
        </v-list-tile-title>
      </v-list-tile>

      <v-list-group prepend-icon="account_circle" value="true">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>
              <div v-if="$store.state.user == ''">
                Blog
              </div>
              <div v-else>
                <strong>{{ $store.state.user.displayName }}님</strong>
              </div>
            </v-list-tile-title>
          </v-list-tile>
        </template>

        <div class="w-100" style="margin:15px 0 15px 0">
          <router-link to="/managerpage" class="mobile-nav-item" v-if="this.$store.state.auth === 'manager'">
            <v-icon class="mobile-item-icon">chat</v-icon>
            Adminpage
          </router-link>
        </div>

        <div class="w-100" style="margin:15px 0 15px 0">
          <router-link to="/mypage" class="mobile-nav-item" v-if="this.$store.state.auth == 'manager'">
            <v-icon class="mobile-item-icon">chat</v-icon>
            Mypage
          </router-link>
        </div>

        <div class="w-100" style="margin:15px 0 15px 0">
          <router-link to="/todos" class="mobile-nav-item" v-if="this.$store.state.auth != ''">
            <v-icon class="mobile-item-icon">chat</v-icon>
            Todo
          </router-link>
        </div>

        <div class="w-100" style="margin:15px 0 15px 0">
          <router-link to="/post" class="mobile-nav-item">
            <v-icon class="mobile-item-icon">chat</v-icon>
            Post
          </router-link>
        </div>

        <div class="w-100" style="margin:15px 0 15px 0">
          <router-link to="/portfolio" class="mobile-nav-item">
            <v-icon class="mobile-item-icon">business</v-icon>
            Portfolio
          </router-link>
        </div>

        <div class="w-100" style="margin:15px 0 15px 0" v-if="this.$store.state.user == ''">
          <router-link to="/login" class="mobile-nav-item">
            <v-icon class="mobile-item-icon">person</v-icon>
            Login
          </router-link>
        </div>

        <div class="w-100" style="margin:15px 0 15px 0" v-else>
          <span class="mobile-nav-item" v-on:click="logout()">
            <v-icon class="mobile-item-icon">exit_to_app</v-icon>
            Logout
          </span>
        </div>

        <v-card>
          <v-card-title class="headline">
            Translations
          </v-card-title>
          <div id="google_translate_element" class="text-xs-center"></div>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>

        <div class="w-100" style="margin:15px 0 15px 0 background-color: aqua">
          <v-card class="gradient-back white--text text-xs-center" width="100%" flat tile>
            <div class="weatherbox">
              <div class="leftweather">
                <img :src="iconUrl(weathericon)" />
              </div>
              <div class="rightweather" style="color: black;">
                <span class="title">{{ overcast }}</span>
                <p class="title">{{ city }}</p>
                <p class="title">현재 온도 : {{ currentTemp }}°</p>
              </div>
            </div>
          </v-card>
        </div>

      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import store from "../store";
import axios from "axios";

export default {
  store,
  data() {
    return {
      currentTemp: "",
      minTemp: "",
      maxTemp: "",
      sunrise: "",
      sunset: "",
      pressure: "",
      humidity: "",
      wind: "",
      windDir: "",
      overcast: "",
      city: "Gwangju",
      city_country: "KR",
      date: "",
      error: "",
      weathericon: "",
      sider_display: "sider_not_active",
      is_active: false
    };
  },
  props: {
    weathers: Array
  },
  beforeMount() {
    this.getWeather();
  },
  methods: {
    siderMenuDisplay: function() {
      this.is_active = !this.is_active;
      this.sider_display = this.is_active ? "sider_active" : "sider_not_active";
    },
    async logout() {
      FirebaseService.logout();
      store.commit("session", "");
      location.href = "/";
    },
    iconUrl(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    },
    getWindDirection(deg) {
      if (deg >= 0 && deg < 30) {
        return "  West";
      } else if (deg >= 30 && deg < 60) {
        return "  NorthWest";
      } else if (deg >= 60 && deg < 120) {
        return "  North";
      } else if (deg >= 120 && deg < 150) {
        return "  NorthEast";
      } else if (deg >= 150 && deg < 210) {
        return "  East";
      } else if (deg >= 210 && deg < 240) {
        return "  SouthEast";
      } else if (deg >= 240 && deg < 300) {
        return "  South";
      } else if (deg >= 300 && deg < 330) {
        return "  SouthWest";
      } else {
        return "  West";
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getWeather() {
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: this.city + "," + this.city_country,
            units: "metric",
            APPID: "49142a5e64bb0f938a3d7606304f920f"
          }
        })
        .then(response => {
          this.currentTemp = parseInt(response.data.main.temp);
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + "%";
          this.wind = response.data.wind.speed + "m/s";
          this.windDir = this.getWindDirection(response.data.wind.deg);
          this.overcast = this.capitalizeFirstLetter(
            response.data.weather[0].description
          );
          this.weathericon = response.data.weather[0].icon;

          this.sunrise = new Date(
            response.data.sys.sunrise * 1000
          ).toLocaleTimeString("en-GB");
          this.sunset = new Date(
            response.data.sys.sunset * 1000
          ).toLocaleTimeString("en-GB");
          var currentdate = new Date();
          var minutes = currentdate.getMinutes();
          var textMin = minutes;
          if (minutes < 10) {
            textMin = "0" + minutes;
          }
          var hour = currentdate.getHours();
          var textHour = hour;
          if (hour < 10) {
            textHour = "0" + hour;
          }
          var seconds = currentdate.getSeconds();
          var textSeconds = seconds;
          if (seconds < 10) {
            textSeconds = "0" + seconds;
          }
          this.date = textHour + ":" + textMin + ":" + textSeconds;
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style>
.sider_toggle {
  position: fixed;
  z-index: 99;
  margin-top: 5px;
  margin-right: 5px;
  text-shadow: 1px 1px 1px white;
}
.sider_active {
  display: block;
}
.sider_not_active {
  display: none;
}
.mobile-title {
  text-decoration: none;
  color: #e91e63;
}
.mobile-title:hover {
  text-decoration: none;
  color: #e91e63;
}
.mobile-nav-item {
  font-size: 15px;
  color: #000;
  margin-right: 1%;
  text-decoration: none;
  cursor: pointer;
}
.mobile-nav-item:hover {
  color: #000;
  font-weight: bold;
  margin-right: 1%;
  text-decoration: none;
}
.mobile-item-icon {
  margin: 0 16px 0 20px;
}
.leftweather {
  display: inline-block;
}
.rightweather {
  display: inline-block;
}
.v-card__text {
  float: left;
}
.weatherbox {
  width: 100%;
  text-align: center;
}
</style>
