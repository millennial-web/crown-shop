import ProductCard from '../../components/product-card/product-card.component';

import {
  StCategoryPreview,
  StCategoryPreviewTitle,
  StCategoryPreviewProducts,
} from './category-preview.styles'

const CategoryPreview = ({ title, products }) => {
  return (
    <StCategoryPreview>
      <h2>
        <StCategoryPreviewTitle to={title}>
          <span className='title'>{title.toUpperCase()}</span>
        </StCategoryPreviewTitle>
      </h2>
      <StCategoryPreviewProducts>
        {
          products
            .filter((_, index) => index < 4)
            .map( (product) => (
              <ProductCard key={product.id} product={product}/>
             )
            )
        }
      </StCategoryPreviewProducts>
    </StCategoryPreview>
  )
}

export default CategoryPreview;