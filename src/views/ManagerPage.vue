<template>
  <div>
    <ImgBanner></ImgBanner>
    <v-container fluid grid-list-md style="background-color: white;">
      <v-card>
        <v-card-text style="text-align: center; font-weight: bold;">
          Manager
        </v-card-text>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
        hide-actions
      >
        <v-progress-linear
          v-slot:progress
          color="black"
          indeterminate
        ></v-progress-linear>
        <template v-slot:items="props">
          <td class="text-xs-center" v-if="props.item.auth === 'manager'">{{ props.item.name }}</td>
          <td class="text-xs-center list_hidden " v-if="props.item.auth === 'manager'">{{ props.item.auth }}</td>
          <td class="text-xs-center" v-if="props.item.auth === 'manager'">
            <UserSelect :user="props.item" v-on:update="getUsers"></UserSelect>
          </td>
        </template>
      </v-data-table>
      <br />
      <v-card>
        <v-card-text style="text-align: center; font-weight: bold;">
          Members
        </v-card-text>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
        hide-actions
      >
        <v-progress-linear
          v-slot:progress
          color="black"
          indeterminate
        ></v-progress-linear>
        <template v-slot:items="props">
          <td class="text-xs-center" v-if="props.item.auth === 'members'">{{ props.item.name }}</td>
          <td class="text-xs-center list_hidden " v-if="props.item.auth === 'members'">{{ props.item.auth }}</td>
          <td class="text-xs-center" v-if="props.item.auth === 'members'">
            <UserSelect :user="props.item" v-on:update="getUsers"></UserSelect>
          </td>
        </template>
      </v-data-table>
      <br />
      <v-card>
        <v-card-text style="text-align: center; font-weight: bold;">
          Guest
        </v-card-text>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
        hide-actions
      >
        <v-progress-linear
          v-slot:progress
          color="black"
          indeterminate
        ></v-progress-linear>
        <template v-slot:items="props">
          <td class="text-xs-center" v-if="props.item.auth === 'guest'">{{ props.item.name }}</td>
          <td class="text-xs-center list_hidden " v-if="props.item.auth === 'guest'">{{ props.item.auth }}</td>
          <td class="text-xs-center" v-if="props.item.auth === 'guest'">
            <UserSelect :user="props.item" v-on:update="getUsers"></UserSelect>
          </td>
        </template>
      </v-data-table>

      <br />

      <v-layout>
        <v-flex>
          <v-card class="Users_View">
            <v-card-title>Users</v-card-title>
            <v-card-text id="chart-1-container"></v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex sm md6>
          <v-card class="Page_View">
            <v-card-title>PageView</v-card-title>
            <v-card-text id="chart-2-container"></v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm md6>
          <v-card class="Session_View">
            <v-card-title>Session</v-card-title>
            <v-card-text id="chart-3-container"></v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import ImgBanner from "../components/ImgBanner";
import UserSelect from "../components/UserSelect";

export default {
  name: "Count",
  props: {},
  data() {
    return {
      auth_dialog: false,
      headers: [
        {
          text: "Name",
          align: "center",
          sortable: true,
          value: "name"
        },
        {
          text: "Auth",
          value: "auth",
          class: "list_hidden",
          align: "center",
          sortable: true
        },
        {
          text: "Authority",
          value: "authority",
          align: "center",
          sortable: false
        }
      ],
      users: [],
      dialog: false
    };
  },
  components: {
    ImgBanner,
    UserSelect
  },
  mounted() {
    this.getPortfolios();
    this.getPosts();
    this.getUsers();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
    },
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    },
    async getUsers() {
      this.users = await FirebaseService.getUsers();
    },
    async deleteDB(userdelete) {
      FirebaseService.deleteDB(userdelete);
    }
  }
};
</script>

<style>
@media screen and (max-width: 1400px) {
  .list_hidden {
    display: none;
  }
}
@media screen and (max-width: 1400px) {
  .Session_View {
    display: none;
  }
  .Page_View {
    display: none;
  }
  .Users_View {
    display: none;
  }
}
@media screen and (max-width: 376px) {
  .list_hidden_delete {
    display: none;
  }
}
.border_letf {
  width: auto;
  height: auto;
}
.data_base {
  width: auto;
  height: auto;
}
#ImgFile {
  position: absolute;
  bottom: 10px;
}
.mx-auto v-card v-sheet theme--light {
  margin: 0;
}
</style>
