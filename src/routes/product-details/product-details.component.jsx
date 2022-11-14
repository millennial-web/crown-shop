import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Button } from '../../components/button/button.component'
import { useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCategoriesMap } from '../../store/categories/category.selector'
import { toTitleCase, getTitleURL } from '../../utils/misc/strings.utils'
import { setIsModalOpen, setJustAddedItems } from '../../store/modal/modal.action'
import FormSelect from '../../components/form-select/form-select.component'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Footer from '../../components/footer/footer.component'

import './product-details.styles.scss'

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId, category} = useParams();

  const cartItems = useSelector(selectCartItems);
  const categoriesMap = useSelector(selectCategoriesMap);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  //used to display options like size, color etc. 
  const [itemExtenstions, setItemExtensions] = useState([]);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const addProductToCart = () => {
    product['extensions'] = {
      color: color,
      size: size,
    }
    product['quantity'] = quantity;
    dispatch ( addItemToCart(cartItems, product, quantity) )
    dispatch ( setJustAddedItems([product]) )
    dispatch ( setIsModalOpen(true) )
  };

  useEffect(() => {
    const productData = categoriesMap[category].find(item => getTitleURL(item.name) === productId);
    setProduct(productData);
  }, [categoriesMap, category, productId]);

  useEffect(() => {
    setItemExtensions([
      {group:"Color", options: [
        {value:"Blue", label:"Blue"}, 
        {value:"Red", label:"Red"},
        {value:"Brown", label:"Brown"},
        {value:"Green", label:"Green"},
        {value:"Black", label:"Black"},
        {value:"White", label:"White"},
      ]},
      {group:"Size", options: [
        {value:"XS", label:"Extra Small"}, 
        {value:"S", label:"Small"},
        {value:"M", label:"Medium"},
        {value:"L", label:"Large"},
        {value:"XL", label:"Extra Large"},
      ]},
    ])
  }, [])

  const decrimentQty = () => {
    if(quantity -1 > 0){
      setQuantity(quantity -1);
    }
  }

  const incrementQty = () => {
    setQuantity(quantity +1);
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }
  
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  }

  return (
    product ? (
      <>
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
              <ul>
                <li>Lorem ipsum dolor sit amet consectetur.</li> 
                <li>Assumenda rem in porro harum</li>
                <li>libero, ex magni quam reiciendis nemo magnam</li>
                <li>a cum recusandae voluptatum sapiente maiores</li>
              </ul>
            </div>
          </div>

          <div className="action-form">
            <div className="quantity-wrapper">
              <span className="quantity-label">
                Quantity: 
              </span>
              <button className='quantity-btn' onClick={decrimentQty}>
                -
              </button>
              <span className="quanity-value">
                {quantity}
              </span>
              <button className='quantity-btn' onClick={incrementQty}>
                +
              </button>
            </div>

            <FormSelect 
              label="Color:" 
              optionsArr={itemExtenstions && itemExtenstions.length? itemExtenstions[0]['options'] : []} 
              onChangeHandler={handleColorChange} 
              selectedValue={color}
              value={color}
            />

            <FormSelect 
              label="Size:" 
              optionsArr={itemExtenstions &&  itemExtenstions.length > 1 ? itemExtenstions[1]['options'] : []} 
              onChangeHandler={handleSizeChange} 
              selectedValue={size}
              value={size}
            />

            <Button className="inverted" onClick={addProductToCart}>Add to Cart</Button>
          </div>
        </div>
        <Footer/>
      </>
       ) : <h1>Loading</h1>
  )
}

export default ProductDetails;