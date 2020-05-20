export default {
  inject: ["pickItem", "getItemCls"],
  props: {
    selection: Boolean,
    list: Array,
    columns: Array,
  },

  methods: {},

  render() {
    return (
      <div class="a-table__body">
        <table cellspacing="0" cellpadding="0" border="0">
          <tbody>
            {this.list.map((item) => (
              <tr key={item.key}>
                {this.selection && (
                  <td class="selection-cell">
                    <div class="cell">
                      <div
                        class={this.getItemCls(item)}
                        onClick={() => this.pickItem(item)}
                      />
                    </div>
                  </td>
                )}
                {this.columns.map((column) => (
                  <td
                    key={column.prop}
                    class={column.className}
                    style={{ width: column.width }}
                  >
                    {column.renderCell.call(
                      this._renderProxy,
                      this.$createElement,
                      item
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
