import { createSelector } from 'reselect';

//get a slice of our reducer data
const selectCategoryReducer = (state) => {
  // console.log('selector 1 fired'); 
  return state.categories;
}

//makes selectCategoryReducer a memoized selector (cached slice) * will only run (reselect) if categoriesSlice has changed! 
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    // console.log('selector 2 fired');
    return categoriesSlice.categories
  }
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    // console.log('selector 3 fired');
    //this will only run when categories has changed 
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  }
    
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.isLoading
)