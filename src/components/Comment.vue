<template>
  <v-container style="padding:0px, margin-left:25px;">
    <v-card>
      <div class="form_size">
        <div style="width: auto; height: 15px;"></div>
        <ul
          class="selector"
          outlined
          v-for="(comment, idx) in comments"
          :key="(comment, idx)"
        >
          <div>
            <div class="li_div_img">
              <v-list-tile-avatar
                size="30px"
                color="grey darken-3"
                class="list_title"
              >
                <v-img class="elevation-6" :src="comment.my_img"></v-img>
              </v-list-tile-avatar>
            </div>
            <div class="li_text">
              <div>
                <li class="id_text">
                  {{ comment.uid }} : {{ comment.content }}
                  <br />
                  {{ time }}
                  <v-btn
                    color="gray"
                    flat
                    @click="reply(comment.uid, idx)"
                    style="font-size:12px"
                  >
                    답글 달기
                  </v-btn>
                  <v-dialog v-model="deldialog" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-icon color="black" v-on="on">more_horiz</v-icon>
                    </template>
                    <v-card>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          class="btnwidth"
                          flat
                          color="red darken-1"
                          text
                          @click="delComment(idx), getComment()"
                        >
                          삭제
                        </v-btn>
                      </v-card-actions>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          class="btnwidth"
                          flat
                          color="gray darken-1"
                          text
                          @click="deldialog = false"
                        >
                          취소
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </li>
              </div>
              <div v-for="r in r_length" :key="r">
                <v-btn
                  v-if="r[0] == idx && r[1]"
                  @click="comment.reply_state = !comment.reply_state"
                >
                  {{ comment.reply_state ? "답글숨기기" : "답글보기" }}
                </v-btn>
              </div>
            </div>
          </div>
          <div v-for="replyComment in reply_comments" :key="replyComment">
            <div v-if="replyComment[1] && replyComment[0] == idx">
              <p v-show="comment.reply_state" style="margin-bottom: 0px">
                <v-list-tile-avatar
                  size="30px"
                  color="grey darken-3"
                  class="list_title"
                >
                  <v-img :src="replyComment[3]"></v-img>
                </v-list-tile-avatar>
                {{ replyComment[1] }} : {{ replyComment[2] }}

                <template>
                  <v-tooltip bottom>
                    <v-icon
                      large
                      slot="activator"
                      color="red"
                      @click="detdeldialog = true"
                      dark
                      medium
                      >delete</v-icon
                    >
                    <span>삭제</span>
                  </v-tooltip>
                </template>
                <v-dialog v-model="detdeldialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">
                      게시글을 삭제할까요?
                    </v-card-title>
                    <v-card-text>
                      다시 데이터를 되돌릴수가 없습니다. 신중하게 생각해서 삭제하시기 바랍니다.
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="red darken-1"
                        flat="flat"
                        @click="deleteCommentReply(idx, replyComment[2])"
                      >
                        삭제하기
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </p>
            </div>
          </div>
          <v-btn flat color="white darken-1" disabled style="height: 0px" />
        </ul>
      </div>
    </v-card>
    <v-card>
      <v-form>
        <v-container fluid grid-list-md>
          <v-flex>
            <v-icon
              medium
              class="mr-1"
              color="red"
              @click="updateLike"
              v-if="flag"
            >
              favorite
            </v-icon>
            <v-icon medium class="mr-1" @click="updateLike" v-else>
              favorite_border
            </v-icon>
            <span>
              <v-icon medium class="mr-1">sms</v-icon>
            </span>
            <span>
              <v-icon medium class="mr-1">device_hub</v-icon>
            </span>
            <span style="float: right">
              <v-icon
                medium
                class="mr-1"
                color="yellow"
                @click="changeIcon"
                v-if="star"
              >
                star
              </v-icon>
              <v-icon medium class="mr-1" @click="changeIcon" v-else>
                star_border
              </v-icon>
            </span>
          </v-flex>
          <v-flex>
            <span>좋아요 {{ likes.length }} 개</span>
          </v-flex>
          <v-flex>
            <v-textarea
              class="mx-2"
              label="댓글달기.."
              rows="1"
              prepend-icon="comment"
              v-on:keyup.enter="select()"
              v-model="content"
            ></v-textarea>
          </v-flex>
        </v-container>
        <v-btn @click="select()">submit</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import store from "../store";
import Push from "../services/Push";
import { log } from "util";

export default {
  store,
  data() {
    return {
      r_length: [],
      reply_comments: [],
      comment_replys: [],
      comments: [],
      content: "",
      reply_id: 0,
      comment_reply_id: 0,
      uid: this.$store.state.user.email,
      state: false,
      reply_state: "",
      bundle_ids: "",
      reply_ids: "",
      idx: "",
      deldialog: false,
      img: "",
      likes: "",
      flag: "",
      star: ""
    };
  },
  props: {
    bodys: { type: String },
    time: { type: String },
    p_title: { type: String }
  },
  mounted() {
    this.getComment();
    this.getCommentReply();
    this.getLikes();
    this.getLikeFlag();
  },
  methods: {
    select() {
      if (this.content[0] == "@") {
        this.writeCommentReply();
        this.getCommentReply();
      } else {
        this.writeComment(this.bodys, this.p_title);
      }
    },
    writeComment(bodys, p_title) {
      const board_id = this.$route.query.id;
      const content = this.content;
      let uid = this.uid;
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      if (!store.state.auth) {
        alert("로그인해주세요");
        return false;
      } else if (!content) {
        alert("글을 작성해주세요");
        return false;
      }
      let my_img = FirebaseService.getUsers();
      my_img.then(res => {
        for (let i = 0; i < res.length; i++) {
          if (uid == res[i].email) {
            var c_img = res[i].imgur;
            uid = uid.split("@");
            FirebaseService.writeComment(board_id, content, uid[0], c_name, c_img)
              .then(() => {
                if (store.state.auth == "manager") {
                  Push.subscribeTokenToTopic(store.state.pushToken, "manager");
                  if (c_name == "portfolios") {
                    Push.newCommentPush("https://fcm.googleapis.com/fcm/send", bodys);
                  } else {
                    Push.newCommentPush("https://fcm.googleapis.com/fcm/send", p_title);
                  }
              }
              this.getComment();
            });
          }
        }
      });
      this.content = "";
    },
    async getComment() {
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      const board_id = this.$route.query.id;
      this.comments = await FirebaseService.getComment(board_id, c_name);
    },
    delComment(idx) {
      this.idx = idx;
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      const board_id = this.$route.query.id;
      let get_comment_ids = FirebaseService.getCommentID(board_id, c_name);
      var reply_id;
      get_comment_ids.then(res => {
        reply_id = res[this.idx];
        FirebaseService.delComment(board_id, reply_id, c_name);
        this.getComment();
      });
    },
    reply(uid, idx) {
      this.state = true;
      this.idx = idx;
      this.content = "@" + uid + ":";
    },
    writeCommentReply() {
      var content = this.content.split(":");
      const board_id = this.$route.query.id;
      const uid = this.uid;
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      if (!store.state.auth) {
        alert("로그인해주세요");
        return false;
      } else if (!content[1]) {
        alert("글을 작성해주세요");
        return false;
      }
      let get_comment_ids = FirebaseService.getCommentID(board_id, c_name);
      var reply_id;
      get_comment_ids.then(res => {
        reply_id = res[this.idx];
        let my_img = FirebaseService.getUsers();
        my_img.then(res => {
          for (let i = 0; i < res.length; i++) {
            if (uid == res[i].email) {
              var c_img = res[i].imgur;
              FirebaseService.writeCommentReply(board_id, c_name, reply_id, content[1], uid, c_img)
                .then(() => {
                  this.state = false;
                  this.content = "";
                  location.reload();
                });
              break;
            }
          }
        });
      });
    },
    async getCommentReply() {
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      const board_id = this.$route.query.id;
      let get_comment_ids = FirebaseService.getCommentID(board_id, c_name);
      var reply_id = [];
      get_comment_ids.then(r => {
        for (let i = 0; i < this.comments.length; i++) {
          reply_id.push(r[i]);
        }
        let get_comment_replys;
        let reply_comments = this.reply_comments;
        let r_length = this.r_length;
        reply_id.forEach(function(currentValue, idx) {
          get_comment_replys = FirebaseService.getCommentReply(c_name, board_id, currentValue);
          get_comment_replys.then(res => {
            r_length.push([idx, res.length]);
            for (let i = 0; i < res.length; i++) {
              if (res[i]) {
                var uids = res[i].uid;
                uids = uids.split("@");
                reply_comments.push([
                  idx,
                  uids[0],
                  res[i].content,
                  res[i].u_img
                ]);
              }
            }
          });
        });
        this.reply_comments = reply_comments;
        this.r_length = r_length;
      });
    },
    deleteCommentReply(idx, content) {
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      const board_id = this.$route.query.id;
      let get_comment_ids = FirebaseService.getCommentID(board_id, c_name);
      var reply_id;
      get_comment_ids.then(id_res => {
        reply_id = id_res[idx];
        let get_comment_reply_ids = FirebaseService.getCommentReplyID(board_id, c_name, reply_id);
        get_comment_reply_ids.then(rid_res => {
          let get_comment_replys = FirebaseService.getCommentReply(c_name, board_id, reply_id);
          get_comment_replys.then(r_res => {
            for (var i = 0; i < r_res.length; i++) {
              if (r_res[i].content == content) {
                FirebaseService.deleteCommentReply(board_id, c_name, reply_id, rid_res[i]);
                location.reload();
                break;
              }
            }
          });
        });
      });
    },
    async getLikes() {
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      const board_id = this.$route.query.id;
      this.likes = await FirebaseService.getLike(board_id, c_name);
    },
    getLikeFlag() {
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      const board_id = this.$route.query.id;
      FirebaseService.userLikeCheck(this.$store.state.user.email, board_id, c_name)
        .then(res => {
          this.flag = res;
        });
      this.email = this.$store.state.user.email;
    },
    updateLike: function() {
      let c_name = "";
      if (this.$route.name[2] == "r") {
        c_name = "portfolios";
      } else {
        c_name = "posts";
      }
      const board_id = this.$route.query.id;
      if (this.$store.state.user != "") {
        FirebaseService.updateLike(board_id, c_name, this.$store.state.user.email)
          .then(() => {
            this.getLikes();
            this.getLikeFlag();
          });
      } else {
        alert("로그인을 하세요");
      }
    },
    changeIcon() {
      if (this.star == true) {
        this.star = false;
      } else {
        this.star = true;
      }
    }
  }
};
</script>

<style>
.form_size {
  width: 300px;
  height: 335px;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
}
::-webkit-scrollbar {
  display: none;
}
.textfieid {
  width: 150px;
  height: 150px;
}
.box {
  width: 230px;
  height: auto;
}
.id_text {
  margin-bottom: 0;
  font-weight: 600;
  font-size: 12px;
  margin-right: 25px;
  word-break: break-all;
  width: 200px;
  float: right;
}
.selector {
  word-break: break-all;
}
.list_title {
  display: inline-block;
  min-width: 40px;
}
.li_text {
  width: 300px;
  height: auto;
  word-break: break-all;
  display: contents;
}
.li_div_img {
  width: 40px;
  height: 30px;
  float: left;
}
</style>
