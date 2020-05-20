<template>
  <div class="a-tabs">
    <div
      class="a-tab-item"
      :class="value === item.value ? 'a-tab-item__active' : ''"
      :key="item.value"
      v-for="item in options"
      @click="pickItem(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "a-tabs",
  props: {
    value: Number,
    options: Array,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    pickItem(item) {
      this.$emit("input", item.value);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.a-tabs {
  display: flex;
  align-items: center;
  border-right: 1px solid #e4e7ed;
  .a-tab-item {
    flex: 1;
    text-align: center;
    border: 1px solid #e4e7ed;
    border-right-width: 0;
    line-height: 36px;
    font-size: 15px;
    cursor: pointer;
    &.a-tab-item__active {
      color: var(--active-color);
      border-bottom-color: transparent;
    }
  }
}
</style>
