<template>
  <v-layout justify-left>
    <v-dialog v-model="dialog" persistent max-width="700">
      <template v-slot:activator="{ on }">
        <div class="todo_create" v-on="on" @click="typeCheck">
          + Add another card
        </div>
      </template>
      <v-card>
        <v-container>
          <v-text-field label="Title" outline v-model="title"></v-text-field>
          <v-textarea outline label="Content" v-model="content" />
          <v-card-actions>
            <v-flex offset-sm8 sm4 style="padding: 0 16px">
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="25"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  label="Due Date"
                  v-model="due_at"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="due_at" no-title scrollable actions>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dueDateCancle">
                      Cancel
                    </v-btn>
                    <v-btn flat color="primary" @click="menu = false">OK</v-btn>
                  </v-card-actions>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-flex offset-sm8 sm4>
            <v-btn outline color="grey darken-1" text @click="dialog = false">
              Cancle
            </v-btn>
            <v-btn outline color="green darken-1" text @click="todosWriter">
              Create
            </v-btn>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "TodoWriter",
  data() {
    return {
      dialog: false,
      type: "",
      uid: this.$store.state.user.email,
      title: "",
      content: "",
      due_at: null,
      menu: false,
      modal: false
    };
  },
  methods: {
    typeCheck: function(event) {
      this.type = event.target.parentNode.parentNode.id;
    },
    todosWriter: function() {
      FirebaseService.postTodos(this.type, this.uid, this.title, this.content, this.due_at)
        .then(() => {
          location.reload();
        });
    },
    dueDateCancle: function() {
      this.due_at = null;
      this.menu = false;
    }
  }
};
</script>

<style>
.todo_create {
  color: #6b778c;
  cursor: pointer;
}
</style>
