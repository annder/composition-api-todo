<template>
  <ul class="nav nav-tabs">
    <li
      class="nav-item cursor"
      v-for="(item, index) in tabs"
      :key="index"
      @click.stop="onTabs(index, tabs)"
    >
      <a :class="item.active ? 'active' : ''" class="nav-link">{{
        item.text
      }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'options-nav-bar',
  props: {
    tabs: Array,
  },
  methods: {
    onTabs(index, tabs) {
      this.$emit('onTab', index, tabs);
    },
  },
};
</script>

<style></style>
