export const findParent = (vm, name) => {
  if (vm.$options.name === name) return vm;
  while ((vm = vm.$parent)) {
    if (vm.$options.name === name) return vm;
  }
  return null;
};
