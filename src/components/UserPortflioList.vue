<template>
  <v-layout mt-5 wrap>
    <v-flex
      :key="i"
      v-for="i in lists.length > limits ? limits : lists.length"
      xs12
      sm6
      md6
      lg4
      xl3
    >
      <UserPortfolio
        class="ma-3"
        :date="lists[i - 1].created_at"
        :title="lists[i - 1].title"
        :body="lists[i - 1].body"
        :imgSrc="lists[i - 1].img"
        :id="lists[i - 1].id"
        :uid="lists[i - 1].uid"
      >
      </UserPortfolio>
    </v-flex>
  </v-layout>
</template>

<script>
import UserPortfolio from "@/components/UserPortfolio";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "UserPortfoliosList",
  props: {
    limits: { type: Number },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      portfolios: [],
      user_portfolios: [],
      userImg: "",
      count: 0,
      lists: [],
      user_email: this.$store.state.user.email
    };
  },
  components: {
    UserPortfolio
  },
  mounted() {
    this.getPortfolios();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
      for (var i = 0; i < this.portfolios.length; i++) {
        if (this.portfolios[i].uid == this.$store.state.user.email) {
          this.lists.push(this.portfolios[i]);
        }
      }
    }
  }
};
</script>

<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
