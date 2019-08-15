<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="1000">
      <template v-slot:activator="{ on }">
        <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        @click="writeRole"
        >
          Upload
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <form class="w3-container" method="POST" enctype="multipart/form-data">
            <div class="title-cancle-space-between">
              <label for="portfolio-title" class="write-title-label">
                <span class="create-title">Create Portfolio</span>
              </label>
              <span>
                <i
                  class="fas fa-times-circle modal-cancle-btn"
                  @click="dialog = false"
                ></i>
              </span>
            </div>
            <input type="text" v-model="portfolio_title" class="write-title" placeholder='"제목을 입력해주세요"' required/>
            <markdown-editor v-model="portfolio_body" ref="markdownEditor" />
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <table>
          <td>
            <tr>
            <input type="file" :v-model="imgFile" name="file" accept="image/*" v-on:change="preViewImg" />
            </tr>
            <tr>
            <img id="preview_img" :v-model="imageData" :src="imageData" width="230vw" />
            </tr>
            <tr>
              <v-btn id="write_portfolio_submit" color="green darken-1" flat="flat" @click="writePortfolio()" :disabled="this.isSubmit === false">SUBMIT</v-btn>
            </tr>
          </td>
          </table>
          <v-snackbar v-model="snackbar" :timeout="2000" :top="true">
            {{ alert_alarm }}
            <v-btn color="blue" flat @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import axios from "axios";
import FirebaseService from "@/services/FirebaseService";
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
      portfolio_title: "",
      portfolio_body: "",
      isSubmit: true,
      imgFile: "",
      imgLink: "",
      imageData: "",
      imgurUrl: "https://api.imgur.com/3/",
      snackbar: false,
      alert_alarm: "",
    };
  },
  methods: {
    writeRole: function() {
      if (this.$store.state.auth == "guest" || this.$store.state.user == "") {
        alert("권한이 없습니다.");
      } else {
        this.dialog = true;
      }
    },
    preViewImg: function(event) {
      let inputImg = event.target.files;
      if (inputImg.length) {
        this.submit = false;
        let submitBtn = document.getElementById("write_portfolio_submit");
        submitBtn.innerText = "LOADING...";
        submitBtn.classList.replace("green--text", "secondary--text");
        let uploadTask = FirebaseService.postImageStorage(inputImg[0]);
        uploadTask.on("state_changed", function(snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            setTimeout(() => {
              this.submit = true;
              submitBtn.innerText = "SUBMIT";
              submitBtn.classList.replace("secondary--text", "green--text");
            }, 1000);
          }
        });
        this.imgFile = inputImg[0];
        let reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(inputImg[0]);
      } else {
        this.imgFile = "";
        this.imageData = "";
        this.isSubmit = true;
      }
    },
    onSubmit() {
      let formData = new FormData();
      const clientId = "d17f695250f6ff3";
      formData.append("image", this.imgFile);
      axios({
        method: "POST",
        url: this.imgurUrl + "image",
        data: formData,
        headers: {
          Authorization: "Client-ID " + clientId
        },
        mimeType: "multipart/form-data"
      }).then(response => {
        this.imgLink = response.data.data.link;
        this.idhash = response.data.data.deletehash;
        this.albumSave();
      });
    },
    writePortfolio: function() {
      if (this.imgFile.size) {
        FirebaseService.getImageStorage()
          .then(url => {
            this.imgLink = url;
            this.checkPortfolio(this.imgLink);
          });
      } else {
        this.imgLink = "https://source.unsplash.com/random";
        this.checkPortfolio(this.imgLink);
      }
    },
    checkPortfolio(imgLink) {
      if (this.portfolio_title.length && this.portfolio_body.length) {
        FirebaseService.postPortfolio(this.portfolio_title, this.portfolio_body, imgLink, this.$store.state.user.email)
            .then(function() {
              location.reload();
              if(store.state.pushToken){
                Push.subscribeTokenToTopic(store.state.pushToken, "portfolio");
                Push.newPortfolioPush("https://fcm.googleapis.com/fcm/send");
              }
            })
            .catch(function() {
              alert("죄송합니다. 에러가 생겼습니다. 불편을 드려 죄송합니다. 문의 부탁드립니다.");
            })
      } else if (this.portfolio_title.length) {
        this.alert_alarm = "내용을 적어주세요.";
        this.snackbar = true;
      } else if (this.portfolio_body.length) {
        this.alert_alarm = "제목을 적어주세요.";
        this.snackbar = true;
      } else {
        this.alert_alarm = "작성을 해주세요.";
        this.snackbar = true;
      }
    },
    albumSave() {
      let formData = new FormData();
      const clientId = "d17f695250f6ff3";
      formData.append("deletehashes[]", this.idhash);
      axios({
        method: "POST",
        url: this.imgurUrl + "album/EZFAo5igmzmhYyc/add",
        data: formData,
        timeout: 0,
        headers: {
          Authorization: "Client-ID " + clientId
        },
        mimeType: "multipart/form-data",
        processData: false,
        contentType: false
      });
    }
  }
};
</script>

<style>
.title-cancle-space-between {
  display: flex;
  justify-content: space-between;
}
.write-title-label {
  background: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3vw;
  font-weight: bold;
}
.write-title-label:hover {
  color: #000 !important;
  background: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 100%);
}
.write-title-label:hover span {
  background: none;
  color: #fff;
  -webkit-text-fill-color: #fff;
}
.write-title {
  width: 100%;
  height: 5vw;
  font-size: 2vw;
}
.write-file {
  display: none;
}
.modal-cancle-btn {
  font-size: 30px;
  cursor: pointer;
}
#write_portfolio_submit {
  float: right;
}
#preview_img {
  float: center;
}
</style>
