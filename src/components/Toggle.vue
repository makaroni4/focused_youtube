<!-- Heavily inspired by  -->
<!-- https://github.com/niels-bosman/vue-toggle-component/blob/main/src/components/VueToggle.vue -->

<template>
  <section
    class="toggle"
    :class="{'toggle--active': toggleState}">
    <label
      :id="`${id}-label`"
      :for="id"
      class="toggle__label"
    >
      {{ title }}
    </label>

    <input
      :id="id"
      v-model="toggleState"
      :name="name"
      class="toggle__input"
      type="checkbox"
    />

    <div class="toggle__wrapper">
      <span
        :aria-checked="toggleState"
        :aria-labelledby="`${id}-label`"
        class="toggle__content"
        role="checkbox"
        @click="toggle"
      >
        <div class="toggle__knob"></div>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Toggle",

  props: {
    name:        { type: String, required: true },
    title:       { type: String, required: true },
    toggled:     { type: Boolean, default: false },
  },

  emits: ["toggle"],

  data() {
    return { toggleState: this.toggled }
  },

  computed: {
    id() {
      return this.name.replace(/ /g, "").toLowerCase()
    },
  },

  methods: {
    toggle() {
      this.toggleState = !this.toggleState

      this.$emit("toggle", this.toggleState)
    }
  },
}
</script>

<style lang="scss" scoped>
.toggle {
  $self: &;
  $toggle-spacing: 2px;
  align-items: center;
  display: flex;
  margin: 0 -5px;
  display: flex;
  justify-content: space-between;

  > * {
    cursor: pointer;
    margin: 0 5px;
  }

  &__label {
    user-select: none;
    font-size: 16px;
    color: #282828;
  }

  &__input {
    display: none;
  }

  &__content {
    background: #B5B9BE;
    border-radius: 8px;
    box-sizing: border-box;
    outline: 0;
    overflow: hidden;
    padding: $toggle-spacing;
    transition: background-color .4s ease;
    will-change: background-color;
    width: 100%;
    height: 12px;
  }

  &__wrapper {
    display: flex;
    position: relative;
    width: 32px;
  }

  &__knob {
    background-color: #B5B9BE;
    height: 100%;

    &:after {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      transition: all .2s ease;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: white;
      content: "";
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .4);
    }
  }

  &--active {
    #{$self}__knob {
      background-color: #8AB4F0;

      &:after {
        left: 100%;
        transform: translateX(-100%) translateY(-50%);
        background-color: #166AE2;
      }
    }

    #{$self}__content {
      background-color: #8AB4F0;
    }
  }
}
</style>
