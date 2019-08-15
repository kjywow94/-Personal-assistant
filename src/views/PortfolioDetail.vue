<template>
<div>
  <ImgBanner imgSrc="https://picsum.photos/500/300">
    <div style="line-height:1.2em;font-size:1.2em;" slot="text" class="main-title">
      포토폴리오 상세페이지
    </div>
  </ImgBanner>
  <br />
  <v-layout row justify-center>
    <v-card flat width="990" class="mx-auto">
      <v-card-text>
        <hr class=".my-hr3">
        <v-layout align-center mb-4>
          <div style="font-size=30px">
            <v-card-actions>
              <v-list-tile class="grow">
                <v-list-tile-avatar>
                  <v-icon medium color="grey" dark="dark">event_note</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <strong class="title textsize">{{ title }}</strong>
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-layout align-center justify-end> </v-layout>
              </v-list-tile>
            </v-card-actions>
          </div>
          <v-spacer></v-spacer>
        </v-layout>
        <v-divider></v-divider>
        <p class="text textimg" style="margin: 5px; font-size: 20px;">
          {{ body }}
        </p>
        <div>
          <div class="main_common">
            <v-img :src="img" class="textimg" />
          </div>
          <div class="main_common1 clear_both">
            <div>
              <v-card outlined>
                <v-card-actions>
                  <v-list-tile class="grow">
                    <v-list-tile-avatar size="30px" color="grey darken-3" class="main_tile">
                      <v-img class="elevation-3 list-tile" :src="uImg"></v-img>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <p class="title_uid id_text">
                          {{ uid }}
                        </p>
                      </v-list-tile-title>
                    </v-list-tile-content>

                    <v-dialog v-model="merudialog" persistent max-width="290">
                      <template v-slot:activator="{ on }">
                      <v-icon color="black"  v-on="on">more_horiz</v-icon>
                    </template>
                      <v-card>
                        <v-card-actions>
                          <v-dialog v-model="dialog" persistent max-width="800">
                            <template v-slot:activator="{ on }">
                                  <v-btn class="btnwidth" slot="activator" flat color="green darken-1" text v-on="on">수정</v-btn>
                            </template>
                            <v-card>
                              <v-card-text>
                                <form class="w3-container" method="POST" enctype="multipart/form-data">
                                  <div class="title-cancle-space-between">
                                    <label for="portfolio-title" class="write-title-label">
                                      <span class="create-title">Portfolio 수정</span>
                                    </label>
                                    <span>
                                      <i class="fas fa-times-circle modal-cancle-btn" @click="dialog = false"></i>
                                    </span>
                                  </div>
                                  <input type="text" id="portfolio-title" class="write-title" placeholder='"제목을 입력해주세요"' v-model="title" required />
                                  <markdown-editor v-model="body" ref="markdownEditor" />
                                </form>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <PortfolioUpdate flat />
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-card-actions>
                        <v-divider></v-divider>
                        <v-card-actions>

                          <v-dialog v-model="totaldellog" persistent max-width="290">
                            <template v-slot:activator="{ on }">
                            <v-btn class="btnwidth" flat color="red darken-1" text @click="totaldellog = false">삭제</v-btn>
                          </template>
                            <v-card>
                              <v-card-title class="headline">게시글을 삭제할까요?</v-card-title>
                              <v-card-text>다시 데이터를 되돌릴수가 없습니다. 신중하게 생각해서 삭제하시기 바랍니다.</v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="totaldellog = false">취소하기</v-btn>
                                <v-btn color="red darken-1" flat="flat" @click="deletePortfolio">삭제하기</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-card-actions>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn class="btnwidth" flat color="gray darken-1" text @click="merudialog = false">취소</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-layout align-center justify-end> </v-layout>
                  </v-list-tile>
                </v-card-actions>
              </v-card>
            </div>
            <Comment class="title_card" :bodys="this.body" :time="this.time"></Comment>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-layout>
  <br />
</div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import markdownEditor from "vue-simplemde/src/markdown-editor";
import PortfolioUpdate from "@/components/PortfolioUpdate";
import FirebaseService from "@/services/FirebaseService.js";
import Comment from "@/components/Comment";

export default {
  name: "PortfolioDetail",
  data() {
    return {
      body: "",
      title: "",
      img: "",
      uid: "",
      uImg: "",
      time: "",
      dialog: false,
      candialog: false,
      merudialog: false,
      totaldellog: false
    };
  },
  components: {
    ImgBanner,
    markdownEditor,
    PortfolioUpdate,
    Comment
  },
  mounted() {
    this.getPortfolioById();
    this.getUserImg();
  },
  methods: {
    async getPortfolioById() {
      this.portfolio = await FirebaseService.getPortfolioById(this.$route.query.id);
      this.body = this.portfolio.body;
      this.title = this.portfolio.title;
      this.img = this.portfolio.img;
      this.uid = this.portfolio.uid;
      this.created_at = new Date(this.portfolio.created_at.seconds * 1000);
      this.time = this.created_at.getFullYear() + '.' + this.created_at.getMonth() + "." + this.created_at.getDate();
    },
    async deletePortfolio() {
      await FirebaseService.deletePortfolio(this.$route.query.id);
      history.go(-1);
    },
    async getUserImg() {
      this.portfolio = await FirebaseService.getPortfolioById(this.$route.query.id);
      this.uImg = await FirebaseService.getUserImg(this.portfolio.uid);
    }
  }
};
</script>

<style>
.my-hr3 {
  border: 0;
  height: 3px;
  background: #ffffff;
}

.textsize {
  font-size: 15px;
}

.textimg {
  max-width: 100%;
  height: 100%;
}

.texttitle {
  margin: 20px;
  margin-left: 20px;
}

.main_common {
  display: inline-block;
  float: left;
  width: 600px;
  height: 600px;
}

.main_common1 {
  display: inline-block;
  width: 330px;
  height: 100px;
}

.title_card {
  width: 330px;
  height: auto;
  padding: 0px;
}

.title_uid {
  font-size: 12px;
}

.title_text {
  width: 300px;
  height: 300px;
}

.btnwidth {
  width: 100%;
}

.id_text {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 12px;
}

.main_tile {
  min-width: 40px;
}

.clear_both {
  clear: both;
}
</style>
