import ProductCard from '../../components/product-card/product-card.component';

import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='cat-preview-container'>
      <h2>
        <Link className='cat-preview-title' to={title.toLowerCase()}>
          <span className='title'>{title.toUpperCase()}</span>
        </Link> 
      </h2>
      <div className='cat-preview-products'>
        {
          products.filter((_, index) => index < 5)
            .map( (product) => (
                <ProductCard key={product.id} category={title} product={product}/>
              )
            )
        }
      </div>
    </div>
  )
}

export default CategoryPreview;