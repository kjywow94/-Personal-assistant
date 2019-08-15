<template>
  <div>
    <ImgBanner imgSrc="https://picsum.photos/1400/600">
      <div
        style="line-height:1.2em;font-size:1.2em;"
        slot="text"
        class="main-title"
      >
        Project
      </div>
    </ImgBanner>
    <v-container>
      <ProjectMember />
    </v-container>
    <Graph class="profile_hidden" />
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import Graph from "../components/Graph";
import ProjectMember from "../components/ProjectMember";

export default {
  name: "ProjectPage",
  components: {
    ImgBanner,
    Graph,
    ProjectMember
  }
};
</script>
