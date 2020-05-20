import Vue from "vue";
import { findParent } from "../utils";

export default {
  name: "ATableColumn",
  props: {
    prop: String,
    label: String,
    width: String,
    className: String,
    type: {
      type: String,
      default: "normal",
    },
  },

  created() {
    const parent = findParent(this, "a-table");
    parent && parent.columns.push(this);
  },

  methods: {
    renderCell(h, data) {
      return (
        <div class="cell">
          {this.$scopedSlots.default ? (
            this.$scopedSlots.default(data)
          ) : (
            <div>{data[this.prop]}</div>
          )}
        </div>
      );
    },
  },

  render(h) {
    return h("div", this.$slots.default);
  },
};
