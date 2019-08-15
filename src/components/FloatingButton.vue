<template>
  <v-btn fab dark color="black" class="floating_btn" onclick="topFunction()">
    Top
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      direction: "top",
      fab: false,
      transition: "scale-transition",
      chatbot: false,
      transdialog: false
    };
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    }
  }
};
</script>

<style>
.floating_btn {
  margin-right: 55px;
  margin-bottom: 15px;
}
</style>
