
import { useState, useEffect } from 'react';
// import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
// import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component.styles';

import {CategoryContainer,CategoryTitle} from  './category.styles'

import SHOP_DATA from '../../shop-data-test.json';

const Category = () => {
  const { category } = useParams();
  // const categoriesMap = useSelector(selectCategoriesMap);
  // const isLoading = useSelector(selectCategoriesIsLoading);
  // const [products, setProducts] = useState([categoriesMap[category]]);
  
  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap])

  const isLoading = false;
  const products = SHOP_DATA;

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading ? (
            <Spinner/>
        ) : (
          <CategoryContainer>
            { products && 
              products.map((product) => {
                if(product){
                  return (<ProductCard key={product.id} product={product} />)
                }
                return null;
              })
            }
          </CategoryContainer>
        )
      }
    </>
  )
}

export default Category;