<template>
  <v-container>
    <v-layout column justify-center>
      <v-subheader>4조</v-subheader>
      <v-expansion-panel popout>
        <v-expansion-panel-content
          v-for="(member, i) in members"
          :key="i"
          hide-actions
        >
          <template v-slot:header>
            <v-layout align-center row spacer>
              <v-flex xs4 sm2 md1>
                <v-avatar size="36px">
                  <img v-bind:src="member.avatar_url" />
                </v-avatar>
              </v-flex>
              <v-flex no-wrap xs5 sm3>
                <strong v-html="member.name"></strong>
              </v-flex>
              <v-flex
                v-if="member.web_url"
                class="grey--text"
                ellipsis
                hidden-sm-and-down
              >
                &mdash;
                {{ member.web_url }}
              </v-flex>
            </v-layout>
          </template>
          <v-card>
            <v-divider></v-divider>
            <v-card-text v-text="intro[i]"></v-card-text>
            <v-subheader>commit log</v-subheader>
            <div v-for="commit in commits" :key="commit">
              <v-card-text v-if="commit_auth[i] == commit.author_name">
                <ul>
                  <li>
                    {{ commit.committed_date.substring(0, 10) }}
                    : {{ commit.message }}
                  </li>
                </ul>
              </v-card-text>
            </div>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>
</template>

<script>
import GitlabService from "@/services/GitlabService";

export default {
  props: {
    limits: { type: Number, default: 7 }
  },
  data: () => ({
    members: [],
    commit_auth: [
      "Joung TaeJune",
      "dongsik93",
      "kjy_wow",
      "wijunseoks",
      "Jo Byeongyong"
    ],
    intro: [
      "페이지 웹로그 세팅, 웹 UI/UX변경",
      "Gitlap Repository",
      "한/영 자동 번역 기능 구현,날시정보 제공 구현",
      "사진첨부기능 구현, 이미지 업로더 컴포넌트 구현",
      "로그인기능 구현, 회원가입기능 구현"
    ],
    commits: []
  }),

  mounted() {
    const projectID = "6083";
    this.getGitlabMembers(projectID);
    this.getGitlabCommits(projectID);
  },
  methods: {
    async getGitlabMembers(projectID) {
      const response = await GitlabService.getMember(projectID);
      if (response.status !== 200) {
        return;
      }
      this.members = response.data;
    },
    async getGitlabCommits(projectID) {
      const response = await GitlabService.getCommits(projectID);
      if (response.status !== 200) {
        return;
      }
      this.commits = response.data;
    }
  }
};
</script>
