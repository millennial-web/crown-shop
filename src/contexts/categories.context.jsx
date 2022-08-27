import { createContext, useState, useEffect } from 'react'




// //ONLY RUN ONCE TO POPULATE DATABASE
// import SHOP_DATA from '../shop-data.js'
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

//actual value to access (context with default values)
export const CategoriesContext = createContext({
  categoriesMap: {},
});

//mount the wrapper for sharing categories context state data 
export const CategoriesProvider = ({children}) =>{
  const [categoriesMap, setCategoriesMap] = useState({});
  
  
  // //ONLY RUN ONCE TO POPULATE DATABASE
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, [])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, [])
  const value = {categoriesMap};
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};