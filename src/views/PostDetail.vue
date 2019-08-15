<template>
  <div>
    <ImgBanner imgSrc="https://picsum.photos/500/300">
      <div style="line-height:1.2em;font-size:1.2em;" slot="text" class="main-title">
        포스트 상세페이지
      </div>
    </ImgBanner>
    <br />
    <v-layout row justify-center>
      <v-card class="mx-auto post_detail">
        <v-card-text>
          <v-layout align-center mb-4>
            <v-avatar class="mr-4">
              <img :src="uImg">
            </v-avatar>
            <strong class="title">{{ uid }}</strong>
            <span v-if="this.$store.state.auth == 'manager' || this.$store.state.auth == 'members'">
              <v-dialog v-model="dialog" persistent max-width="800">
                <template v-slot:activator="{ on }">
                  <v-tooltip bottom>
                    <v-icon large slot="activator" color="green" dark="dark" v-on="on">create</v-icon>
                    <span>수정</span>
                  </v-tooltip>
                </template>
                <v-card>
                  <v-card-text>
                    <form class="w3-container" method="POST" enctype="multipart/form-data">
                      <div class="title-cancle-space-between">
                        <label for="portfolio-title" class="write-title-label">
                          <span class="create-title">Post 수정</span>
                        </label>
                        <span>
                          <i class="fas fa-times-circle modal-cancle-btn" @click="dialog = false"></i>
                        </span>
                      </div>
                      <input type="text" v-model="title" class="write-title" placeholder='"제목을 입력해주세요"' required="required" />
                      <markdown-editor v-model="body" ref="markdownEditor" />
                    </form>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-tooltip bottom>
                <v-icon large slot="activator" color="red" @click.native.stop="candialog = true" text-lg-right dark>delete</v-icon>
                <span>삭제</span>
              </v-tooltip>
              <v-dialog v-model="candialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">게시글을 삭제할까요?</v-card-title>
                  <v-card-text>다시 데이터를 되돌릴수가 없습니다. 신중하게 생각해서 삭제하시기 바랍니다.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="candialog = false">취소하기</v-btn>
                    <v-btn color="red darken-1" flat="flat" @click="deletePost">삭제하기</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </span>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-layout>
          <v-divider></v-divider>
          <strong class="title">{{ title }}</strong>
          <br>
          <p>
            {{ body }}
          </p>
            <Comment class="comment_card" :p_title="this.title"></Comment>
        </v-card-text>
      </v-card>

    </v-layout>
    <br />
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import markdownEditor from "vue-simplemde/src/markdown-editor";
import FirebaseService from "@/services/FirebaseService.js";
import Push from "@/services/Push";
import Comment from "@/components/Comment";

export default {
  name: "PostDetail",
  data() {
    return {
      body: "",
      title: "",
      uid: "",
      dialog: false,
      candialog: false,
      snackbar: false,
      alert_alarm: "",
      uImg: ""
    };
  },
  components: {
    ImgBanner,
    markdownEditor,
    Comment
  },
  mounted() {
    this.getPostById();
  },
  methods: {
    async getPostById() {
      this.post = await FirebaseService.getPostById(this.$route.query.id);
      this.body = this.post.body;
      this.title = this.post.title;
      this.uid = this.post.uid;
      FirebaseService.getUserImg(this.uid).then(res=>{
         this.uImg = res;
       });
    },
    async deletePost() {
      await FirebaseService.deletePost(this.$route.query.id);
      history.go(-1);
    },
    updatePost: function() {
      if (this.title.length && this.body.length) {
        FirebaseService.updatePost(this.$route.query.id,this.title, this.body, this.uid)
          .then(function() {
            location.reload();
          });
      } else if (this.title.length) {
        this.alert_alarm = "내용을 적어주세요.";
        this.snackbar = true;
      } else if (this.body.length) {
        this.alert_alarm = "제목을 적어주세요.";
        this.snackbar = true;
      } else {
        this.alert_alarm = "작성을 해주세요.";
        this.snackbar = true;
      }
      Push.newPostPush("https://fcm.googleapis.com/fcm/send");
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
.comment_card {
  float: right;
  width: 300px;
  padding: 0px;
}

.post_detail {
  width: 900px;
}
@media screen and (max-width: 1200px) {
  .post_detail {
    max-width: 800px;
  }
  .comment_card {
    float: right;
    width: 250px;
  }
}
@media screen and (max-width: 900px) {
  .time {
    max-width: 700px;
  }
}
@media screen and (max-width: 450px) {
  .post_detail {
    max-width: 430px;
  }
  .comment_card {
    width: 100%;
  }
}
@media screen and (max-width: 400px) {
  .post_detail {
    max-width: 380px;
  }
  .comment_card {
    width: 100%;
  }
}
@media screen and (max-width: 360px) {
  .post_detail {
    max-width: 360px;
  }
  .comment_card {
    width: 100%;
  }
}
@media screen and (max-width: 320px) {
  .post_detail {
    max-width: 340px;
  }
  .comment_card {
    width: 100%;
  }
}
</style>
