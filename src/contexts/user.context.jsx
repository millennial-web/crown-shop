import { useEffect } from 'react';
import { useState, createContext } from 'react'
import { 
  onAuthStateChangedListener, 
  createUserDocumentFromAuth
} from '../utils/firebase/firebase.utils';

//actual value to access (context with default values)
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//mount the wrapper for sharing user context state data 
export const UserProvider = ({children}) =>{
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if(user){
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    //unsubscribe on unmount to avoid memory leaks
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};