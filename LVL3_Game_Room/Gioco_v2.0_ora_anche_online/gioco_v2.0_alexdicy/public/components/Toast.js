export default Vue.component("toast", {
  props: {
    title: String,
    text: String,
    time: {type: Number, default: 5},
    hideCallback: Function
  },
  data() {
    return {
      show: false
    }
  },
  template: `
    <div class="toast toast-dark fade" :class="{'show': show}">
    <div class="toast-header">
      <strong class="toast-title">{{ title }}</strong>
      <button @click="hide" type="button" class="btn-close"></button>
    </div>
    <div class="toast-body">
      {{ text }}
    </div>
    </div>`,
  methods: {
    hide() {
      this.show = false;
      setTimeout(() => {
        this.$emit("hidden");
      }, 200);
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 100);
    setTimeout(() => {
      this.hide();
    }, this.time * 1000 - 200);
  }
});
