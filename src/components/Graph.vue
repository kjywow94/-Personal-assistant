<template>
  <v-container text-xs-center>
    <div id="gitGraph"></div>
  </v-container>
</template>

<script>
import GitlabService from "@/services/GitlabService";
import { createGitgraph } from "@gitgraph/js";

export default {
  data: () => ({
    commits: [],
    events: "",
    me: "",
    merges: ""
  }),
  mounted() {
    this.go();
    this.init();
  },
  methods: {
    go() {
      const projectID = "6083";
      const event_3 = GitlabService.getBranches(projectID, 3);
      this.commits.push(event_3);
      const event_2 = GitlabService.getBranches(projectID, 2);
      this.commits.push(event_2);
      const event_1 = GitlabService.getBranches(projectID, 1);
      this.commits.push(event_1);
      const response2 = GitlabService.getMerges(projectID);
      this.merges = response2;
    },
    init() {
      let branches = [];
      const graphContainer = document.getElementById("gitGraph");
      const gitgraph = createGitgraph(graphContainer, {
        orientation: "vertical-reverse"
      });
      const master = gitgraph.branch({
        name: "master",
        author: "dev"
      });
      master.commit({
        subject: "Start project",
        author: "Dev.J"
      });
      const commits = this.commits;
      branches.push(master);
      for (let k = 0; k < commits.length; k++) {
        commits[k].then(r => {
          for (let i = r.data.length - 1; i >= 0; i--) {
            if (r.data[i].action_name == "pushed new") {
              var b = gitgraph.branch(r.data[i].push_data.ref);
              b.commit({
                subject: r.data[i].push_data.commit_title,
                author: r.data[i].author.username,
                onClick(commit) {
                  window.open(`https://lab.ssafy.com/Dev.J/webmobile-sub2/commit/${r.data[i].push_data.commit_to}`);
                },
                onMessageClick(commit) {
                  window.open(`https://lab.ssafy.com/Dev.J/webmobile-sub2/commit/${r.data[i].push_data.commit_to}`);
                }
              });
              branches.push(b);
            } else if (r.data[i].action_name == "accepted") {
              branches.forEach(e => {
                const merges = this.merges;
                merges.then(m => {
                  for (let j = m.data.length - 1; j >= 0; j--) {
                    if (m.data[j].state == "merged") {
                      if (r.data[i].target_title == m.data[j].title) {
                        if (e.name == m.data[j].source_branch) {
                          e.checkout();
                          master.merge({
                            branch: e,
                            commitOptions: {
                              subject: r.data[i].target_title,
                              author: r.data[i].author.username
                            },
                            onClick(commit) {
                              window.open(`https://lab.ssafy.com/Dev.J/webmobile-sub2/commit/${r.data[i].push_data.commit_to}`);
                            },
                            onMessageClick(commit) {
                              window.open(`https://lab.ssafy.com/Dev.J/webmobile-sub2/commit/${r.data[i].push_data.commit_to}`);
                            }
                          });
                        }
                      }
                    }
                  }
                });
              });
            } else if (r.data[i].action_name == "pushed to") {
              branches.forEach(e => {
                if (e.name == r.data[i].push_data.ref) {
                  if (r.data[i].push_data.commit_title.substr(0,5) != "Merge") {
                    e.commit({
                      subject: r.data[i].push_data.commit_title,
                      author: r.data[i].author.username,
                      onClick(commit) {
                        window.open(`https://lab.ssafy.com/Dev.J/webmobile-sub2/commit/${r.data[i].push_data.commit_to}`);
                      },
                      onMessageClick(commit) {
                        window.open(`https://lab.ssafy.com/Dev.J/webmobile-sub2/commit/${r.data[i].push_data.commit_to}`);
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  }
};
</script>

<style>
path {
  stroke-width: 7 !important;
}
</style>
