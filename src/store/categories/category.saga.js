import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try{
    //yield is like await and call turns a function into an effect
    const categoriesArray = yield call( getCategoriesAndDocuments, 'categories' );
    //use put in order to dispatch inside saga generator functions
    yield put( fetchCategoriesSuccess(categoriesArray) );
  
  } catch (error) {
    yield put( fetchCategoriesFailed(error) );
  }
}

//triggers when we call fetchCategoriesStart action
export function* onFetchCategories(){
  //takeLatest will listen for the last action type fired and call our fetchCategoriesAsync function
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga(){
  yield all([call(onFetchCategories)]);
}