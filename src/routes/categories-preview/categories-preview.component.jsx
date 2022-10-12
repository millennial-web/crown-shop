import {Fragment} from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <Fragment>
      {categoriesMap && (
          Object.keys(categoriesMap).map(catTitle => {
            const products = categoriesMap[catTitle];
            return (
              <CategoryPreview key={catTitle} title={catTitle} products={products}/>
            );
          })
        )
      }
    </Fragment>
      
  )
}

export default CategoriesPreview;