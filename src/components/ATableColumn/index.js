import Column from "../ATable/TableColumn";

Column.install = (Vue) => {
  Vue.component(Column.name, Column);
};

export default Column;
