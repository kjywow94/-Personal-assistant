<template>
  <div>
    <v-layout class="backcolor-portfolios list_hidden " style="height:100px;"></v-layout>
    <v-layout>
      <v-flex xs4 class="backcolor-portfolios list_hidden"></v-flex>
      <v-flex xs4 class="list_hidden">
        <v-card class="padding-size">
          <v-img aspect-ratio="1.7" :src="imgSrc"> </v-img>
          <v-layout>
            <v-dialog v-model="dialog" persistent max-width="800px">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout>
                      <v-flex xs12 sm8 md4>
                        <v-img
                          class="img_size list_hidden"
                          :src="imgSrc"
                          max-height="400px"
                        ></v-img>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field
                          v-model="this.$store.state.user.displayName"
                          label="Name"
                          outlined
                        ></v-text-field>
                        <v-text-field
                          v-model="this.$store.state.user.email"
                          label="Email"
                          outlined
                        ></v-text-field>
                        <v-text-field
                          v-model="this.length"
                          label="Write"
                          outlined
                        ></v-text-field>
                      </v-flex>
                      <input
                        id="ImgFile"
                        type="file"
                        name="file"
                        ref="file"
                        color="green darken-1"
                        v-on:change="handleFileUpload"
                      />
                    </v-layout>
                  </v-container>
                  <small class="write_line">*You can change the image.</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="darken-1" text @click="dialog = false">
                    Secession
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex sm xs4 class="backcolor-portfolios list_hidden"></v-flex>
    </v-layout>
    <v-layout class="backcolor-portfolios">
      <v-flex my-5 xs12>
        <UserPortflioList />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import UserPortflioList from "@/components/UserPortflioList";
import axios from "axios";

export default {
  name: "UserProFile",
  data() {
    return {
      imgSrc: this.$store.state.imgur,
      imgurUrl: "https://api.imgur.com/3/",
      userName: "",
      lists: [],
      length: 0,
      dialog: false
    };
  },
  components: {
    UserPortflioList
  },
  mounted() {
    this.getPosts();
    this.getUsers();
    this.getPortfolios();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
      for (var i = 0; i < this.portfolios.length; i++) {
        if (this.portfolios[i].uid == this.$store.state.user.email) {
          this.length += 1;
        }
      }
    },
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
      for (var i = 0; i < this.posts.length; i++) {
        if (this.posts[i].uid == this.$store.state.user.email) {
          this.length += 1;
        }
      }
    },
    async getUsers() {
      this.users = await FirebaseService.getUsers();
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].email == this.$store.state.user.email) {
          this.imgSrc = this.users[i].imgur;
        }
      }
    },
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
      this.getImgurLink();
    },
    getImgurLink() {
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
        this.imgSrc = response.data.data.link;
        this.ImgupdateDB();
      });
    },
    async ImgupdateDB() {
      await FirebaseService.updateDB(
        this.$store.state.user.email,
        this.$store.state.user.displayName,
        this.$store.state.auth,
        this.imgSrc,
        this.$store.state.portfolio_count,
        this.$store.state.post_count
      );
    }
  }
};
</script>

<style>
.img_size {
  padding-top: 20px;
}
.write_line {
  padding-left: 22px;
}
.padding-size {
  padding: 5px;
}
.profile_bottom {
  padding-bottom: 30px;
}
.middle-size {
  position: absolute;
  top: 8%;
  left: 45%;
}
</style>
