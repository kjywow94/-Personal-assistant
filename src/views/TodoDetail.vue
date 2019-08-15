<template>
  <div class="todo_container" style="height: 30px">
    <v-dialog v-model="dialog" persistent max-width="700">
      <template v-slot:activator="{ on }">
        <div class="todo_item_title" v-on="on">{{ title }}</div>
      </template>
      <v-card>
        <v-container>
          <v-text-field
            label="Title"
            outline
            :value="title"
            v-model="todo_title"
          ></v-text-field>
          <v-textarea
            outline
            label="Content"
            v-model="todo_content"
            :value="content"
          />
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
                  prepend-icon="event"
                  readonly
                  v-model="todo_due_at"
                  :value="todo_due_at"
                >
                </v-text-field>
                <v-date-picker
                  v-model="todo_due_at"
                  :value="todo_due_at"
                  no-title
                  scrollable
                  actions
                >
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
            <v-btn outline color="green darken-1" text @click="todosUpdate">
              Update
            </v-btn>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "TodoWriter",
  props: {
    id: { type: String },
    title: { type: String },
    content: { type: String },
    date: { type: Date }
  },
  data() {
    return {
      dialog: false,
      type: "",
      todo_id: this.id,
      todo_title: this.title,
      todo_content: this.content,
      todo_due_at: this.date,
      uid: this.$store.state.user.email,
      menu: false,
      modal: false
    };
  },
  methods: {
    todosUpdate: function() {
      FirebaseService.updateTodos(this.todo_id, this.todo_title, this.todo_content, this.todo_due_at)
        .then(() => {
          location.reload();
        });
    },
    dueDateCancle: function() {
      this.todo_due_at = null;
      this.menu = false;
    }
  }
};
</script>
