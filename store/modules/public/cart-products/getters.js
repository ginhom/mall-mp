export default {
  checkedItems (state) {
    return state.items.filter(item => item.checked)
  },
  filteredItems (state) {
    return state.items = state.items
      .filter(product => product.number || product.specifications.find(specification => specification.number))
  }
}
