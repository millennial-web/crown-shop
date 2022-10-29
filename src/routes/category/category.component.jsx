
import { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectCategoriesMap } from '../../store/categories/category.selector'
import { toTitleCase } from '../../utils/misc/strings.utils'
import ProductCard from '../../components/product-card/product-card.component'
import './category.styles.scss'

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  },[category, categoriesMap])
  return (
    <Fragment>
      <div className='category-title'>
        {toTitleCase(category)}
      </div>
      <div className='category-container'>
        { products && 
          products.map((product) => {
            if(product){
              return (<ProductCard key={product.id} category={category} product={product} />)
            }
            return null;
          })
        }
      </div>
    </Fragment>
  )
}

export default Category;