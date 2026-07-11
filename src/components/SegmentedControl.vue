<template>
  <section class="segmented">
    <span :id="`${id}-label`" class="segmented__label">{{ name }}</span>

    <div
      class="segmented__options"
      role="radiogroup"
      :aria-labelledby="`${id}-label`">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        role="radio"
        class="segmented__option"
        :class="{ 'segmented__option--active': option.value === value }"
        :aria-checked="option.value === value"
        @click="$emit('select', option.value)">
        {{ option.label }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "SegmentedControl",

  props: {
    name:    { type: String, required: true },
    value:   { type: String, default: "" },
    options: { type: Array, required: true },
  },

  emits: ["select"],

  computed: {
    id() {
      return this.name.replace(/ /g, "").toLowerCase()
    },
  },
}
</script>

<style lang="scss" scoped>
.segmented {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    user-select: none;
    font-size: 16px;
    color: #282828;
  }

  &__options {
    display: flex;
    padding: 2px;

    border-radius: 8px;

    background: #B5B9BE;
  }

  &__option {
    flex: 1;
    padding: 6px 4px;

    border: 0;
    border-radius: 6px;
    outline: 0;

    background: transparent;

    font-size: 13px;
    color: #FFF;

    cursor: pointer;
    transition: background-color .2s ease, color .2s ease;

    &--active {
      background: #166AE2;
    }

    &:not(&--active):hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
