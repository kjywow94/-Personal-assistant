<template>
  <v-layout column px-4>
    <v-flex>
      <h1>{{ repositories.name }}</h1>
      <v-divider></v-divider>
      <br />
      <h3
        :key="i"
        v-for="i in commits.length > limits ? limits : commits.length"
      >
        {{ commits[i].author_name }}
        : {{ commits[i].message }}
      </h3>
    </v-flex>
  </v-layout>
</template>

<script>
import Repository from "@/components/Repository";
import GitlabService from "@/services/GitlabService";
import store from "../store";

export default {
  name: "RepositoryList",
  store,
  props: {
    limits: { type: Number, default: 7 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      repositories: [],
      commits: [],
      branches: []
    };
  },
  components: {
    Repository
  },
  mounted() {
    const projectID = "7549";
    this.getGitlabRepos(projectID);
    this.getGitlabCommit(projectID);
    this.getGitlabBranches(projectID);
  },
  methods: {
    async getGitlabRepos(projectID) {
      const response = await GitlabService.getRepos(projectID);
      if (response.status !== 200) {
        return;
      }
      this.repositories = response.data;
    },
    async getGitlabCommit(projectID) {
      const response = await GitlabService.getCommits(projectID);
      if (response.status !== 200) {
        return;
      }
      this.commits = response.data;
      store.state.commits = this.commits;
    },
    async getGitlabBranches(projectID) {
      const response = await GitlabService.getBranches(projectID);
      if (response.status !== 200) {
        return;
      }
      store.state.branches = response.data;
    }
  }
};
</script>
