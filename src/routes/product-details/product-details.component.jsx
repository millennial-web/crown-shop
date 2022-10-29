
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Button, BUTTON_TYPE_CLASSES} from '../../components/button/button.component'
import { useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCategoriesMap } from '../../store/categories/category.selector'
import { toTitleCase, getTitleURL } from '../../utils/misc/strings.utils'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './product-details.styles.scss'

const ProductDetails = () => {
  const { key, category} = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch (addItemToCart(cartItems, product) );
  const [product, setProduct] = useState({});
  const categoriesMap = useSelector(selectCategoriesMap);

  useEffect(() => {
    const productData = categoriesMap[category].find(item => getTitleURL(item.name) === key);
    setProduct(productData);
  }, [categoriesMap, category, key]);
  
  return (
    product ? (
      <div className='product-details-container'>
        <Carousel
          autoPlay={true}
          emulateTouch={true}
          infiniteLoop={true}
          interval='3500'
          showStatus={false}
          stopOnHover={true}
        >
          <div>
            <img src={product.imageUrl} alt={product.name+' 1'}/>
            {/* <p className="legend">Legend 1</p> */}
          </div>
          <div>
            <img src={product.imageUrl} alt={product.name+' 2'}/>
            {/* <p className="legend">Legend 2</p> */}
          </div>
          <div>
            <img src={product.imageUrl} alt={product.name+' 3'}/>
            {/* <p className="legend">Legend 3</p> */}
          </div>
        </Carousel>

        <div className='product-copy'>
          <h1 className='name'>
            <Link as='span' className='category-link' to={'/'+category}> {toTitleCase(category)} </Link> 
            - {product.name}
          </h1>
          <h2 className='price'>Price: ${product.price}</h2>
          <div className='description'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda rem in porro harum, libero, ex magni quam reiciendis nemo magnam, a cum recusandae voluptatum sapiente maiores fuga quae impedit architecto!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda rem in porro harum, libero, ex magni quam reiciendis nemo magnam, a cum recusandae voluptatum sapiente maiores fuga quae impedit architecto!
            </p>
          </div>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </div>
    </div> ) : <h1>Loading</h1>
  )
}

export default ProductDetails;