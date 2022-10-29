import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { 
  onAuthStateChangedListener, 
  createUserDocumentFromAuth
} from './utils/firebase/firebase.utils.js'

import Navigation from './routes/navigation/navigation.component.jsx'
import Home from './routes/home/home.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx'
import Checkout from './routes/checkout/checkout.component.jsx'
import ProductDetails from './routes/product-details/product-details.component.jsx'
import Category from './routes/category/category.component.jsx'
import { setCurrentUser } from './store/user/user.action'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='auth' element={<Authentication/>}/>
        <Route path=':category' element={<Category/>}/>
        <Route path='product/:category/:key' element={<ProductDetails/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
