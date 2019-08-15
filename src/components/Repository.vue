<template>
  <div class="py-3">
    <v-layout>
      <v-flex xs8>
        <h2 class="repo-title font-weight-regular">
          {{ repos.path_with_namespace }}
        </h2>
        <p class="repo-name subheading mb-1 grey--text text--darken-1 font-weight-light">
          {{ repos.namespace.name }}
        </p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GitlabService from "@/services/GitlabService";

export default {
  name: "Repository",
  props: {
    repos: { type: null }
  },
  data() {
    return {
      stats: {}
    };
  },
  mounted() {
    this.drawStatGraph();
  },
  methods: {
    async drawStatGraph() {
      this.commits = await GitlabService.getCommits(this.repos.id);
    }
  }
};
</script>

<style>
@media screen and (max-width: 1024px) {
  .repo-title {
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  .repo-name {
    font-size: 0.8em !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
}
@media screen and (min-width: 1025px) {
  .repo-title {
    font-size: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  .repo-name {
    font-size: 1.2em !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
}
</style>
