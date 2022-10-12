
export const selectCategoriesMap = (state) => {
  const categoriesMap = state.categories.categories.reduce((accumulator,category) => {
    const { title, items } = category;
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});
  return categoriesMap;
}
