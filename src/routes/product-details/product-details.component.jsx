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

import Carousel from '../../components/carousel/carousel.component'
import ColorSelector from '../../components/color-selector/color-selector.component'
import SizeSelector from '../../components/size-selector/size-selector.component'
import Footer from '../../components/footer/footer.component'

import './product-details.styles.scss'

const colorOptions = [
  {name:"Chalk White", hexval: "#fff"},
  {name:"Carbon Grey", hexval: "#696969"},
  {name:"Space Black", hexval: "#030303"},
  {name:"Fire Red", hexval: "#ed0e0e"},
  {name:"Lava Red", hexval: "#9c0d0d"},
  {name:"Earth Brown", hexval: "#845008"},
  {name:"Star Orange", hexval: "#f19706"},
  {name:"Sun Yellow", hexval: "#dde419"},
  {name:"Lime Green", hexval: "#96f21d"},
  {name:"Forest Green", hexval: "#1d7901"},
  {name:"Jade Green", hexval: "#1b9f80"},
  {name:"Deep Blue", hexval: "#043db9"},
  {name:"Sweet Pink", hexval: "#950a6b"},
  {name:"Strong Purple", hexval: "#521292"},
  {name:"Soft Purple", hexval: "#755d86"}
];

const sizeOptions = [
  {name:"XS", longName: "Extra Small"},
  {name:"S", longName: "Small"},
  {name:"M", longName: "Medium"},
  {name:"L", longName: "Large"},
  {name:"XL", longName: "Extra Large"},
  {name:"XXL", longName: "Extra Extra Large"},
];


const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId, category} = useParams();

  const cartItems = useSelector(selectCartItems);
  const categoriesMap = useSelector(selectCategoriesMap);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [addErrors, setAddErrors] = useState([]);

  //used to display options like size, color etc. 
  const [itemExtenstions, setItemExtensions] = useState([]);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const colorClickHandler = (e) => {
    const item = e.target.dataset;
    setColor(item.label);
  }

  const sizeClickHandler = (e) => {
    const item = e.target.dataset;
    setSize(item.value);
  }

  const addProductToCart = () => {
    let newErrors = [];
    //validation
    if(color === ''){
      newErrors.push('Please select a color');
    }
    if(size === ''){
      newErrors.push('Please select a size');
    }
    if(quantity <= 0){
      newErrors.push('Quantity must be a positive number');
    }
    setAddErrors(newErrors);
    if(newErrors.length){
      return;
    }

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

  const getProductThumbs = () =>{
    const mainImage = {
      thumbUrl: product.imageUrl,
      alt: product.name + ' main image'
    };

    if('thumbs' in product && product.thumbs.length){
      return [
        mainImage,
        ...product.thumbs
      ];
    }else{
      return [
        mainImage
      ];
    }
  }

  return (
    product ? (
      <>
        <div className='product-details-container'>
          <div className="carousel-column">
            <Carousel
              productName={product.name}
              items={getProductThumbs()}
            />

            {addErrors.length > 0 && 
              addErrors.map((txt) => (
                <p className="add-error">{txt}</p>
              ))
            }
            

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

              <ColorSelector 
                options={itemExtenstions && itemExtenstions.length > 0 ? colorOptions : null}
                callback={colorClickHandler}
                selectedColor={color}
              />

              <SizeSelector 
                options={itemExtenstions && itemExtenstions.length > 1 ? sizeOptions : null}
                callback={sizeClickHandler}
                selectedSize={size}
              />

              <Button className="inverted" onClick={addProductToCart}>Add to Cart</Button>
            </div>
          </div>
          
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
        </div>
        <Footer/>
      </>
       ) : <h1>Loading</h1>
  )
}

export default ProductDetails;