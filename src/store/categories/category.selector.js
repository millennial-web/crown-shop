import { createSelector } from 'reselect';

const selectCategoriesSlice = (state) => state.categories;

//create a memoized selector, creatSelector takes two inputs, 
//an array of input selectors and and output selector function 
//(can receive one or more arguments from input array)
export const selectCategories = createSelector(
  [selectCategoriesSlice], 
  (categoriesSlice) => categoriesSlice.categories //this output selector will only run when categoresSlice has changed
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  //transforms the array of categories and their items into an object with category titles as keys
  (categories) => categories.reduce((accumulator,category) => {
    const { title, items } = category;
    accumulator[ title.toLowerCase() ] = items;
    return accumulator;
  }, {})
)