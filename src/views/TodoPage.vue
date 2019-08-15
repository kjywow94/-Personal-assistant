<template>
  <div>
    <ImgBanner imgSrc="https://picsum.photos/1400/600">
      <div
        style="line-height:1.2em;font-size:1.2em;"
        slot="text"
        class="main-title"
      >
        Todo List
      </div>
    </ImgBanner>
    <div class="container">
      <div class="todo_row">
        <div
          :id="`${todo_type}`"
          :class="`todo_item ${todo_type}`"
          :key="todo_type"
          @drop="drop"
          @dragover="allowDrop"
          v-for="todo_type in todo_type_list"
        >
          <div class="todo_item_type">{{ todo_type }}</div>
          <div
            :id="`${todo.id}`"
            class="todo_item_card"
            :key="todo"
            draggable="true"
            @dragstart="drag"
            v-for="todo in todos"
            v-if="todo.type === `${todo_type}` && todo.uid === uid"
          >
            <TodoDetail
              :id="todo.id"
              :title="todo.title"
              :content="todo.content"
              :date="todo.due_at"
            />
          </div>
          <TodoWriter />
        </div>
      </div>
      <div style="text-align: right; margin-top: 10px">
       <img class="trash_test" @drop="deleteDrop" @dragover="allowDrop" width="70px">
      </div>
    </div>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import TodoWriter from "../components/TodoWriter";
import TodoDetail from "./TodoDetail";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "TodoPage",
  components: {
    ImgBanner,
    TodoWriter,
    TodoDetail
  },
  data() {
    return {
      todo_type_list: [],
      todos: [],
      uid: this.$store.state.user.email,
      todo_id: "",
      dialog: false,
      id: ""
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      this.todo_type_list = ["todo", "doing", "finish"];
      this.todos = await FirebaseService.getTodos();
    },
    allowDrop: function(event) {
      event.preventDefault();
    },
    drag: function(event) {
      event.dataTransfer.setData("text", event.target.id);
      this.todo_id = event.target.id;
    },
    drop: function(event) {
      event.preventDefault();
      let data = event.dataTransfer.getData("text");
      let target = event.target;
      if (this.todo_type_list.includes(target.id)) {
        target.childNodes[target.childNodes.length-1].before(document.getElementById(data));
        FirebaseService.updateTodosType(this.todo_id, target.id);
      } else if (target.className == "todo_item_title") {
        if (event.layerY < 15) {
          target.parentNode.parentNode.before(document.getElementById(data));
        } else {
          target.parentNode.parentNode.after(document.getElementById(data));
        }
        FirebaseService.updateTodosType(this.todo_id, target.parentNode.parentNode.parentNode.id);
      } else if (target.className == "todo_item_type") {
        target.after(document.getElementById(data));
        FirebaseService.updateTodosType(this.todo_id, target.parentNode.id);
      } else if (target.className == "todo_create") {
        target.parentNode.before(document.getElementById(data));
        FirebaseService.updateTodosType(this.todo_id, target.parentNode.parentNode.id);
      } else if (target.className == "todo_container") {
        target.parentNode.before(document.getElementById(data));
        FirebaseService.updateTodosType(this.todo_id, target.parentNode.parentNode.id);
      } else {
        target.before(document.getElementById(data));
        FirebaseService.updateTodosType(this.todo_id, target.parentNode.id);
      }
    },
    deleteDrop: function(event) {
      event.preventDefault();
      let data = event.dataTransfer.getData("text");
      document.getElementById(data).remove();
      event.target.classList.add("full");
      FirebaseService.deleteTodos(data);
    }
  }
};
</script>

<style>
.todo_row {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 7px;
}
.todo_item {
  width: 24vw;
  padding: 5px 10px;
  background-color: #dfe1e6;
  border-radius: 3px;
}
.todo_item_type {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.todo_item_card {
  text-align: left;
  font-size: 14px;
  background-color: #fff;
  border-radius: 3px;
  padding-left: 5px;
  margin: 5px 0;
  cursor: pointer;
}
.todo_item_title {
  text-align: left;
  font-size: 18px;
  background-color: #fff;
  border-radius: 3px;
  padding: 2px 0 0 5px;
  margin: 5px 0;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.trash_test {
  content: url("../assets/trash_empty.png");
}
.trash_test.full {
  content: url("../assets/trash_full.png");
}
</style>
