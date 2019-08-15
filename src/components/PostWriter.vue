<template>
  <v-layout row="row" justify-center="justify-center">
    <v-dialog v-model="dialog" persistent="persistent" max-width="1000">
      <template v-if="this.$store.state.auth == 'manager' || this.$store.state.auth == 'Team-members'" v-slot:activator="{ on }">
        <v-btn color="primary" dark="dark" v-on="on">글쓰기</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <form class="w3-container" method="POST" enctype="multipart/form-data">
            <div class="title-cancle-space-between">
              <label for="post-title" class="write-title-label">
                <span class="create-title">Create Post</span>
              </label>
              <span>
                <i class="fas fa-times-circle modal-cancle-btn" @click="dialog = false"></i>
              </span>
            </div>
            <input type="text" v-model="post_title" class="write-title" placeholder='"제목을 입력해주세요"' required="required" />
            <markdown-editor v-model="post_body" ref="markdownEditor" />
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-snackbar v-model="snackbar" :timeout="2000" :top="true">
            {{ alert_alarm }}
            <v-btn color="blue" flat="flat" @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>
          <v-btn color="green darken-1" flat="flat" @click="writePost()">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import markdownEditor from "vue-simplemde/src/markdown-editor";
import Push from "@/services/Push";
import store from "../store";

export default {
  store,
  components: {
    markdownEditor
  },
  data() {
    return {
      dialog: false,
      post_title: "",
      post_body: "",
      post_uid: this.$store.state.user.email,
      snackbar: false,
      alert_alarm: ""
    };
  },
  methods: {
    writePost: function() {
      if (this.post_title.length && this.post_body.length) {
        FirebaseService.postPost(
          this.post_title,
          this.post_body,
          this.post_uid)
        .then(function() {
          location.reload();
          if(store.state.pushToken){
            Push.subscribeTokenToTopic(store.state.pushToken, "post");
            Push.newPostPush("https://fcm.googleapis.com/fcm/send");
          }
        });
      } else if (this.post_title.length) {
        this.alert_alarm = "내용을 적어주세요.";
        this.snackbar = true;
      } else if (this.post_body.length) {
        this.alert_alarm = "제목을 적어주세요.";
        this.snackbar = true;
      } else {
        this.alert_alarm = "작성을 해주세요.";
        this.snackbar = true;
      }
    }
  }
};
</script>

<style>
.v-snack--top {
  top: 50%;
}
.create-title {
  font-size: 5vw;
}
</style>
