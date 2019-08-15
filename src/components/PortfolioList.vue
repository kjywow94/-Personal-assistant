<template>
  <v-layout wrap>
    <v-flex
      :key="i"
      v-for="i in portfolios.length > limits ? limits : portfolios.length"
      xs12
      sm6
      md6
      lg4
      xl3
    >
      <Portfolio
        class="ma-3"
        :date="portfolios[i - 1].created_at"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgSrc="portfolios[i - 1].img"
        :id="portfolios[i - 1].id"
        :uid="portfolios[i - 1].uid"
      >
      </Portfolio>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <PortfolioWriter
      v-if="
      this.$store.state.auth == 'manager' ||
      this.$store.state.auth == 'Team-members'
      "
      />
      <v-btn v-on:click="loadMorePortfolios">
        더 보기
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Portfolio from "@/components/Portfolio";
import PortfolioWriter from "../components/PortfolioWriter";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PortfoliosList",
  props: {
    limits: { type: Number, default: 12 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      portfolios: [],
      userImg: ""
    };
  },
  components: {
    Portfolio,
    PortfolioWriter
  },
  mounted() {
    this.getPortfolios();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
    },
    loadMorePortfolios() {
      this.limits += 6;
    }
  }
};
</script>

<style>
.buttonColor {
  background-image: linear-gradient(to right, #c7d5f9 30%, #fbb4b8 100%);
}
.mw-700 {
  max-width: 700px;
}
</style>
