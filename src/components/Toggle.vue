<!-- Heavily inspired by  -->
<!-- https://github.com/niels-bosman/vue-toggle-component/blob/main/src/components/VueToggle.vue -->

<template>
  <section class="m-toggle">
    <label
      :id="`${id}-label`"
      :for="id"
      class="m-toggle__label"
    >
      {{ title }}
    </label>

    <input
      :id="id"
      v-model="toggleState"
      :name="name"
      class="m-toggle__input"
      type="checkbox"
    />
    <span
      :aria-checked="toggleState"
      :aria-labelledby="`${id}-label`"
      class="m-toggle__content"
      :class="{'m-toggle__content--active': toggleState}"
      role="checkbox"
      @click="toggle"
    />
  </section>
</template>

<script>
export default {
  name: 'Toggle',

  props: {
    name:        { type: String, required: true },
    title:       { type: String, required: true },
    toggled:     { type: Boolean, default: false },
  },

  data() {
    return { toggleState: this.toggled };
  },

  methods: {
    toggle() {
      this.toggleState = !this.toggleState;
      this.$emit('toggle', this.toggleState);
    }
  },

  computed: {
    id() {
      return this.name.replace(/ /g, '').toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.m-toggle {
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

    &:checked {
      & + #{$self}__content {
        &:after {
          left: calc(50% + #{$toggle-spacing});

          background: #166AE2;
        }
      }
    }
  }

  &__content {
    background: #B5B9BE;
    border-radius: 2em;
    box-sizing: border-box;
    height: 2em;
    outline: 0;
    overflow: hidden;
    padding: $toggle-spacing;
    transition: background-color .4s ease;
    width: 4em;
    will-change: background-color;

    &--active {
      background-color: #8AB4F0;
    }

    &:after {
      background: white;
      border-radius: 50%;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .4);
      display: block;
      height: 100%;
      left: 0;
      position: relative;
      transition: left .2s ease;
      width: calc(50% - #{$toggle-spacing});
      will-change: left;
      content: "";
    }
  }
}
</style>
