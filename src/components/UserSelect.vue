<template>
  <v-dialog v-model="auth_dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn class="ma-2" flat color="green" v-on="on">
        Click
      </v-btn>
    </template>

    <v-card>
      <v-img class="white--text" aspect-ratio="1.7" :src="imgSrc"></v-img>
      <v-card-text>
        <p>Email : {{ user.email }}</p>
        <p>Auth : {{ user.auth }}</p>
        <p>
          <v-select
            v-model="select"
            :hint="`${select.state}, ${select.abbr}`"
            :items="items"
            item-text="state"
            item-value="abbr"
            label="Select"
            persistent-hint
            return-object
            single-line
            @change="check_user(user.name), check_auth(select.state)"
          ></v-select>
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          flat
          color="green"
          text
          @click="updateDB(), (auth_dialog = false)"
        >
          I accept
        </v-btn>
        <v-btn
          flat
          color="#EF3B36"
          class="list_hidden_delete_up"
          @click="deleteDB(user.email), (auth_dialog = false)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "userselect",
  props: {
    user: { type: null }
  },
  data() {
    return {
      user_name: "",
      user_email: "",
      user_auth: "",
      portfolio_count: 0,
      post_count: 0,
      imgSrc: this.user.imgur,
      auth_dialog: false,
      select: { state: "guest", abbr: "게스트" },
      items: [
        { state: "guest", abbr: "게스트" },
        { state: "members", abbr: "팀원" },
        { state: "manager", abbr: "매니저" },
        { state: "master" }
      ]
    };
  },
  mounted() {
    this.getUsers();
    this.getPortfolios();
    this.getPosts();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
      for (var i = 0; i < this.portfolios.length; i++) {
        if (this.portfolios[i].uid == this.user.email) {
          this.user.portfolio_count += 1;
        }
      }
    },
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
      for (var i = 0; i < this.posts.length; i++) {
        if (this.posts[i].uid == this.user.email) this.user.post_count += 1;
      }
    },
    check_user: function(name) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].name == name) {
          this.user_name = this.users[i].name;
          this.user_email = this.users[i].email;
        }
      }
    },
    check_auth: function(auth) {
      this.user_auth = auth;
    },
    async getUsers() {
      this.users = await FirebaseService.getUsers();
    },
    async updateDB() {
      await FirebaseService.updateDB(
        this.user_email,
        this.user_name,
        this.user_auth,
        this.imgSrc,
        this.portfolio_count,
        this.post_count
      );
      this.$emit("update");
    },
    async deleteDB(userdelete) {
      await FirebaseService.deleteDB(userdelete);
      this.$emit("update");
    }
  }
};
</script>
