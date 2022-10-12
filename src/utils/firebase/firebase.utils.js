import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';
// import { categoriesReducer } from '../../store/categories/category.reducer';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8tdrH7Ex7N8f-MPVuNroJK-tGbYZjzuk",
  authDomain: "crwn-clothing-db-13fdf.firebaseapp.com",
  projectId: "crwn-clothing-db-13fdf",
  storageBucket: "crwn-clothing-db-13fdf.appspot.com",
  messagingSenderId: "998797398884",
  appId: "1:998797398884:web:e2ca5299b62c3fbc01e071",
  measurementId: "G-5K2MTQ3V13"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

//setup authentication provider
googleProvider.setCustomParameters({
  prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
  //create a document reference to /users/[uid]
  const userDocRef = doc(db,'users', userAuth.uid);
  //try to get the document
  const userSnapshot = await getDoc(userDocRef);
  //if document does not exist, try to create it
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      //use setDoc to create the new data object at the document ref
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    }catch(error){
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        //close the listener to avoid memory leak
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  });
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  // console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

