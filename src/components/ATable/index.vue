<template>
  <div class="a-table" :style="{ width }">
    <div class="hidden-slots"><slot></slot></div>

    <table cellspacing="0" cellpadding="0" border="0">
      <thead>
        <tr>
          <th v-if="selection" class="selection-cell">
            <div class="cell">
              <div
                class="check"
                :class="pickedItem.length === list.length ? 'checked' : ''"
                @click="pickAll"
              ></div>
            </div>
          </th>
          <th
            v-for="label in labels"
            :key="label.prop"
            :style="{ width: label.width }"
          >
            <slot name="th">
              <div class="cell">
                <span>{{ label.label }}</span>
              </div>
            </slot>
          </th>
        </tr>
      </thead>
    </table>

    <TableBody
      :style="{ height }"
      :list="list"
      :columns="displayColumns"
      :selection="selection"
    />
  </div>
</template>

<script>
import TableBody from "./TableBody";
export default {
  name: "a-table",
  props: {
    list: Array,
    width: [Number, String],
    height: [Number, String],
  },
  provide() {
    return {
      pickItem: this.pickItem,
      getItemCls: this.getItemCls,
    };
  },
  components: { TableBody },
  data() {
    return {
      pickedItem: [],
      columns: [],
    };
  },
  computed: {
    pickedKeys() {
      return this.pickedItem.map((it) => it.key);
    },
    labels() {
      return this.displayColumns.map((it) => ({ ...it.$props }));
    },
    selection() {
      return this.columns.findIndex((it) => it.type === "selection") > -1;
    },

    displayColumns() {
      return this.columns.filter((it) => it.type === "normal");
    },
  },
  methods: {
    pickItem(item) {
      if (this.pickedKeys.includes(item.key)) {
        this.pickedItem = this.pickedItem.filter((it) => it.key !== item.key);
      } else {
        this.pickedItem.push(item);
      }

      this.$emit("selection", item, this.pickedItem, this.pickedKeys);
    },
    pickAll() {
      if (this.pickedItem.length === this.list.length) {
        this.pickedItem = [];
      } else {
        this.pickedItem = [...this.list];
      }

      this.$emit("selection", null, this.pickedItem, this.pickedKeys);
    },
    getItemCls(item) {
      let cls = "check";
      if (this.pickedKeys.includes(item.key)) cls += " checked";
      return cls;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.a-table {
  position: relative;

  .hidden-slots {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }

  .a-table__body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  table {
    table-layout: fixed;
    border-collapse: separate;

    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #606266;
  }

  thead {
    color: #909399;
    font-weight: 500;
  }

  tbody {
    tr {
      &:hover {
        background-color: #ecf5ff;
      }
    }
  }

  td {
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }

  th {
    .cell {
      position: relative;
      word-wrap: normal;
      text-overflow: ellipsis;
      vertical-align: middle;
      width: 100%;
    }
  }

  td,
  th {
    padding: 12px 0;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  .cell {
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;

    text-overflow: ellipsis;
    padding: 0 10px;
    overflow: hidden;
  }

  .selection-cell {
    width: 50px;
  }

  .check {
    font-size: 14px;
    border-radius: 0.1em;
    border: 1px solid var(--active-color);
    height: 1em;
    width: 1em;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;

    &.checked {
      background-color: var(--active-color);
      &:before {
        border-bottom-color: #fff;
        border-right-color: #fff;
      }
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 0.5em;
      width: 0.2em;
      border: 1px solid transparent;
      transform: translate(0.3em) rotate(45deg);
    }
  }
}
</style>
