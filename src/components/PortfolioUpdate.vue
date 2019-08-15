<template>
  <div>
    <div>
      <img :v-model="imageData" :src="imageData" width="230vw" />
    </div>
    <input
      id="write-select-img"
      type="file"
      name="file"
      ref="file"
      color="green darken-1"
      v-on:change="handleFileUpload"
    />
    <div class="portfolio-agree">
      <v-btn
        class="portfolio-agree"
        color="green darken-1"
        flat
        v-on:click="onSubmit()"
      >
        Agree
      </v-btn>
    </div>
    <v-snackbar v-model="snackbar" :timeout="2000" :top="true">
      {{ alert_alarm }}
      <v-btn color="blue" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import FirebaseService from "@/services/FirebaseService";

export default {
  data() {
    return {
      file: "",
      imgLink: "",
      imageData: "",
      imgurUrl: "https://api.imgur.com/3/",
      snackbar: false,
      alert_alarm: ""
    };
  },
  methods: {
    async updatePortfolio(title, body, img_value) {
      await FirebaseService.updatePortfolio(this.$route.query.id, title, body, img_value,this.$store.state.user.email);
    },
    handleFileUpload: function(event) {
      this.file = this.$refs.file.files[0];
      let previewImg = event.target;
      let reader = new FileReader();
      reader.onload = e => {
        this.imageData = e.target.result;
      };
      reader.readAsDataURL(previewImg.files[0]);
    },
    onSubmit() {
      let formData = new FormData();
      const clientId = "d17f695250f6ff3";
      formData.append("image", this.file);
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
        this.writePortfolio();
      });
    },
    writePortfolio() {
      let Id = this.$route.query.id;
      let title = document.getElementById("portfolio-title").value;
      let body = document.getElementsByClassName("CodeMirror-code")[0].innerText;
      let img = document.getElementById("write-select-img");
      let img_value = "";
      if (title.length && body.length) {
        if (img.files.length) {
          let reader = new FileReader();
          reader.readAsDataURL(img.files[0]);
          reader.onload = () => {
            img_value = this.imgLink;
            FirebaseService.updatePortfolio(Id, title, body, img_value, this.$store.state.user.email)
              .then(function() {
                location.reload();
              });
          };
        } else {
          img_value = "https://source.unsplash.com/random";
          FirebaseService.updatePortfolio(Id, title, body, img_value, this.$store.state.user.email)
            .then(function() {
              location.reload();
            });
        }
      } else if (title.length) {
        this.alert_alarm = "내용을 적어주세요.";
        this.snackbar = true;
      } else if (body.length) {
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
.portfolio-agree {
  margin-left: 65%;
}
</style>
