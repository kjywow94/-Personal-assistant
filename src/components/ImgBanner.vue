<template>
  <div>
    <v-img
      :src="imgSrc"
      aspect-ratio="1.7"
      onmouseover="document.getElementById('imgbutton').style.display = 'none';"
      onmouseout="document.getElementById('imgbutton').style.display = 'none';"
    >
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text_shadow display-2 font-weight-light">
            <slot name="text" />
          </span>
          <v-layout row justify-center style="margin-top: 300px;">
            <v-dialog v-model="dialog" scrollable max-width="1000px">
              <template v-slot:activator="{ on }">
                <v-btn
                  id="imgbutton"
                  color="indigo"
                  dark
                  v-on:click="pull_imgur"
                  v-on="on"
                >
                  Select Change
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Select Image</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 500px;">
                  <v-img
                    onmouseover="this.style.filter='alpha(opacity=50)';this.style.opacity='0.4';"
                    onmouseout="this.style.filter='alpha(opacity=50)';this.style.opacity='50';"
                    v-for="(image, index) in images"
                    v-on:click.capture="change(index)"
                    flat
                    v-on:click="change_img"
                    :key="image.id"
                    :value="image.link"
                    :label="image.link"
                    :src="image.link"
                  >
                  </v-img>
                </v-card-text>
                <v-card-actions />
              </v-card>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ImgBanner",
  props: {
    text: { type: String }
  },
  data() {
    return {
      dialogm1: "",
      dialog: false,
      images: [],
      img: "",
      imgSrc:
        "https://c.wallhere.com/photos/4e/13/lake_water_starry_night_night-1192337.jpg!d"
    };
  },
  methods: {
    pull_imgur() {
      axios({
        method: "get",
        url: "https://api.imgur.com/3/album/LwATxBf/images",
        headers: { authorization: "Client-ID " + "d17f695250f6ff3" }
      }).then(response => {
        if (response.data != null) {
          this.images = response.data.data;
        } else {
          alert("파일이 존재하지 않습니다!!");
        }
      });
    },
    change_img() {
      if (this.img != "") {
        this.imgSrc = this.img;
      } else {
        alert("파일 주소가 없습니다.!!");
      }
    },
    change(val) {
      this.img = this.images[val].link;
    }
  }
};
</script>

<style>
.bottomright {
  position: absolute;
  bottom: 8px;
  right: 16px;
  font-size: 18px;
}
</style>
