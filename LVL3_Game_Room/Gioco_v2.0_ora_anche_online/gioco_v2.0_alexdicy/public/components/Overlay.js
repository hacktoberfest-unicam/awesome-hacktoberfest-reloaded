// noinspection EqualityComparisonWithCoercionJS

export default Vue.component("overlay", {
  props: {
    overlay: Object
  },
  template: `
    <div class="overlay">
      <div class="overlay-title">{{ overlay.title }}</div>
      <div class="overlay-content">
        {{ overlay.content }}
        <div class="flex" v-if="overlay.showInput">
          <div class="input-group">
            <input type="text" :placeholder="overlay.input.placeholder" id="overlay-input" ref="overlayInput"
                   :minlength="overlay.input.minLength" :required="overlay.input.required" autocomplete="off"
                   @keyup.enter="overlay.input.onSend" v-model="overlay.input.value" autofocus/>
            <div class="shadow"></div>
            <label for="overlay-input" class="input-label">{{ overlay.input.label }}</label>
          </div>
          <button @click="overlay.input.onSend" class="button">{{ overlay.input.buttonText }}</button>
        </div>
      </div>
    </div>`,
});
