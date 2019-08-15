<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm7 md5 lg5 text-xs-center>
      <v-layout align-center justify-center row fill-height elevation-5 style="min-height:500px;" white pa-4>
        <v-flex xs12 text-xs-center>
          <v-btn
            round
            color="#df4a31"
            dark
            v-on:click="loginWithGoogle"
            style="width:100%;"
            class="LoginFont"
          >
            <v-icon size="25" class="mr-2">fab fa-google</v-icon>
            Google 로그인
          </v-btn>
          <v-btn round color="#0014F7" dark v-on:click="loginWithFacebook" style="width:100%;" class="LoginFont">
            <v-icon size="25" class="mr-2">fab fa-facebook</v-icon>
            Facebook 로그인
          </v-btn>
          <v-dialog v-model="LoginDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn round color="#00D600" dark v-on="on" style="width:100%;" class="LoginFont">
                <v-icon size="25" class="mr-2">email</v-icon>
                로그인
              </v-btn>
            </template>
            <v-card class="mx-auto" max-width="500">
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>Login</span>
              </v-card-title>
              <v-card-text>
                <v-text-field label="email" type="email" v-model="email"></v-text-field>
                <v-text-field label="password" type="password" v-model="password" v-on:keyup.enter="signIn(email, password)"></v-text-field>
              </v-card-text>
              <v-btn color="info" v-on:click="signIn(email, password)">로그인</v-btn>
              <v-divider></v-divider>
            </v-card>
          </v-dialog>
          <v-dialog v-model="SignUpDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn round color="#FFE500" dark v-on="on" style="width:100%;" class="LoginFont">
                <v-icon size="25" class="mr-2">email</v-icon>
                회원가입
              </v-btn>
            </template>
            <v-card class="mx-auto" max-width="500">
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>{{ currentTitle }}</span>
              </v-card-title>

              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-card-text>
                    <v-text-field label="Email" value="example@naver.com" v-model="email"></v-text-field>
                    <v-text-field label="이름" value="이름" v-model="userName"></v-text-field>
                    <span class="caption grey--text text--darken-1">
                      이메일을 입력하세요
                    </span>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="2">
                  <v-card-text>
                    <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                    <v-text-field label="Confirm Password" type="password"></v-text-field>
                    <span class="caption grey--text text--darken-1">
                      비밀번호를 입력하세요
                    </span>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="3">
                  <div class="pa-3 text-xs-center">
                    <v-img class="mb-3" contain height="128" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYufqyTuqj3qtNY-0OeAbRl6wvq2RqG3DqHyfZjm6vQW3tBW-H"></v-img>
                    <h3 class="title font-weight-light mb-2">Welcome to 거인의 巨鳥</h3>
                    <v-btn
                      color="info"
                      v-on:click="signUp(email, password, userName)"
                    >
                      가입하기
                    </v-btn>
                  </div>
                </v-window-item>
              </v-window>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="text-center">
                  <v-pagination
                    v-model="step"
                    :length="3"
                    circle
                    color="primary lighten-2"
                    :total-visible="4"
                  >
                  </v-pagination>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  name: "LoginPage",
  data() {
    return {
      step: 1,
      email: "",
      password: "",
      userName: "",
      portfolio_count: 0,
      post_count: 0,
      LoginDialog: false,
      SignUpDialog: false
    };
  },
  components: {},
  methods: {
    async loginWithGoogle() {
      FirebaseService.loginWithGoogle();
      this.$router.push("/");
    },
    async loginWithFacebook() {
      FirebaseService.loginWithFacebook();
      this.$router.push("/");
    },
    async signUp(email, password, userName) {
      FirebaseService.signUp(
        email,
        password,
        userName,
        this.portfolio_count,
        this.post_count
      );
      this.$router.push("/");
    },
    async signIn(email, password) {
      FirebaseService.loginWithEmail(email, password);
      this.$router.push("/");
    }
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "회원가입";
        case 2:
          return "비밀번호";
        default:
          return "환영합니다.";
      }
    }
  }
};
</script>

<style>
.LoginFont {
  font-size: 1vw;
}
.text-center {
  margin: 0 auto;
}
</style>
